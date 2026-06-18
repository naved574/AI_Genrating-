import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Stripe from "stripe";

import { getServerConfig } from "../config.server";
import type { AspectRatio, GeneratedAsset, GenerationWithAssets } from "../saas-types";
import { getSupabaseAdmin, getUserFromAccessToken } from "../supabase/server";

const aspectRatioSchema = z.enum(["1:1", "2:3", "3:2", "4:3", "16:9", "9:16"]);

const authSchema = z.object({ accessToken: z.string().min(10) });

const generationInputSchema = authSchema.extend({
  prompt: z.string().min(3).max(2000),
  negativePrompt: z.string().max(1000).optional(),
  modelSlug: z.string().min(1),
  aspectRatio: aspectRatioSchema,
  quantity: z.number().int().min(1).max(5),
  speed: z.enum(["steady", "turbo"]),
});

async function callFal(model: string, input: Record<string, unknown>) {
  const { falApiKey } = getServerConfig();
  if (!falApiKey) throw new Error("FAL_API_KEY is missing.");

  const response = await fetch(`https://fal.run/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${falApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Fal generation failed: ${await response.text()}`);
  return response.json() as Promise<{
    images?: { url: string; width?: number; height?: number }[];
    image?: { url: string };
  }>;
}

async function callReplicate(model: string, input: Record<string, unknown>) {
  const { replicateApiToken } = getServerConfig();
  if (!replicateApiToken) throw new Error("REPLICATE_API_TOKEN is missing.");

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${replicateApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version: model, input }),
  });

  if (!response.ok) throw new Error(`Replicate generation failed: ${await response.text()}`);
  return response.json() as Promise<{ id?: string; output?: string[] }>;
}

function extractImageUrls(
  providerResult: unknown,
): { url: string; width?: number; height?: number }[] {
  const result = providerResult as {
    images?: { url: string; width?: number; height?: number }[];
    image?: { url: string; width?: number; height?: number };
    output?: string[];
  };

  if (Array.isArray(result.images)) return result.images.filter((image) => image.url);
  if (result.image?.url) return [result.image];
  if (Array.isArray(result.output))
    return result.output.map((url) => ({ url })).filter((image) => image.url);
  return [];
}

async function getAuthedProfile(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  const supabase = getSupabaseAdmin();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error || !profile) throw new Error("Profile not found. Complete signup first.");
  return { user, profile, supabase };
}

export const listModels = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("ai_models")
    .select("*")
    .eq("enabled", true)
    .order("cost_credits", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listPlans = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("active", true)
    .order("monthly_price_cents");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listMyGenerations = createServerFn({ method: "POST" })
  .inputValidator(authSchema)
  .handler(async ({ data }) => {
    const { user, supabase } = await getAuthedProfile(data.accessToken);
    const { data: generations, error } = await supabase
      .from("generations")
      .select("*, ai_models(name, slug, cost_credits), generated_assets(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return (generations ?? []) as GenerationWithAssets[];
  });

export const createGeneration = createServerFn({ method: "POST" })
  .inputValidator(generationInputSchema)
  .handler(async ({ data }) => {
    const { user, profile, supabase } = await getAuthedProfile(data.accessToken);
    const { data: model, error: modelError } = await supabase
      .from("ai_models")
      .select("*")
      .eq("slug", data.modelSlug)
      .eq("enabled", true)
      .single();

    if (modelError || !model) throw new Error("Selected AI model is unavailable.");
    if (!model.supported_aspect_ratios.includes(data.aspectRatio))
      throw new Error("Selected aspect ratio is not supported by this model.");

    const totalCost = Number(model.cost_credits) * data.quantity;
    if (profile.credits < totalCost)
      throw new Error(`Insufficient credits. You need ${totalCost} credits.`);

    const { data: generation, error: generationError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        model_id: model.id,
        prompt: data.prompt,
        negative_prompt: data.negativePrompt || null,
        aspect_ratio: data.aspectRatio,
        quantity: data.quantity,
        provider: model.provider,
        status: "processing",
        credits_charged: totalCost,
      })
      .select("*")
      .single();

    if (generationError || !generation)
      throw new Error(generationError?.message ?? "Unable to create generation.");

    await supabase
      .from("profiles")
      .update({ credits: profile.credits - totalCost })
      .eq("id", user.id);
    await supabase.from("credit_ledger").insert({
      user_id: user.id,
      amount: -totalCost,
      reason: "generation",
      generation_id: generation.id,
    });

    try {
      const providerInput = {
        prompt: data.prompt,
        negative_prompt: data.negativePrompt || undefined,
        image_size: data.aspectRatio,
        num_images: data.quantity,
        speed: data.speed,
      };
      const providerResult =
        model.provider === "fal"
          ? await callFal(model.provider_model, providerInput)
          : await callReplicate(model.provider_model, providerInput);
      const images = extractImageUrls(providerResult).slice(0, data.quantity);

      if (!images.length) throw new Error("Provider returned no images.");

      const assets = images.map(
        (image): Omit<GeneratedAsset, "id" | "created_at"> => ({
          generation_id: generation.id,
          user_id: user.id,
          storage_path: null,
          url: image.url,
          width: image.width ?? null,
          height: image.height ?? null,
          seed: Math.floor(Math.random() * 9_999_999),
          is_public: false,
        }),
      );

      await supabase.from("generated_assets").insert(assets);
      await supabase
        .from("generations")
        .update({ status: "succeeded", completed_at: new Date().toISOString() })
        .eq("id", generation.id);

      return { id: generation.id, status: "succeeded" as const };
    } catch (error) {
      await supabase.from("profiles").update({ credits: profile.credits }).eq("id", user.id);
      await supabase.from("credit_ledger").insert({
        user_id: user.id,
        amount: totalCost,
        reason: "generation_refund",
        generation_id: generation.id,
      });
      await supabase
        .from("generations")
        .update({
          status: "failed",
          error: error instanceof Error ? error.message : "Generation failed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", generation.id);
      throw error;
    }
  });

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    authSchema.extend({
      planId: z.string().min(1),
      mode: z.enum(["subscription", "payment"]).default("subscription"),
    }),
  )
  .handler(async ({ data }) => {
    const { user, profile, supabase } = await getAuthedProfile(data.accessToken);
    const config = getServerConfig();
    if (!config.stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is missing.");

    const { data: plan, error } = await supabase
      .from("plans")
      .select("*")
      .eq("id", data.planId)
      .single();
    if (error || !plan?.stripe_price_id)
      throw new Error("Plan is not configured with a Stripe price ID.");

    const stripe = new Stripe(config.stripeSecretKey);
    const customer = profile.stripe_customer_id
      ? profile.stripe_customer_id
      : (await stripe.customers.create({ email: profile.email, metadata: { userId: user.id } })).id;

    if (!profile.stripe_customer_id)
      await supabase.from("profiles").update({ stripe_customer_id: customer }).eq("id", user.id);

    const session = await stripe.checkout.sessions.create({
      mode: data.mode,
      customer,
      line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
      success_url: `${config.appUrl}/dashboard/billing?checkout=success`,
      cancel_url: `${config.appUrl}/pricing?checkout=cancelled`,
      metadata: { userId: user.id, planId: plan.id, credits: String(plan.monthly_credits) },
    });

    await supabase.from("payments").insert({
      user_id: user.id,
      stripe_customer_id: customer,
      stripe_session_id: session.id,
      amount_cents: plan.monthly_price_cents,
      credits: plan.monthly_credits,
      status: "pending",
    });

    return { url: session.url };
  });

export const createBillingPortalSession = createServerFn({ method: "POST" })
  .inputValidator(authSchema)
  .handler(async ({ data }) => {
    const { profile } = await getAuthedProfile(data.accessToken);
    const config = getServerConfig();
    if (!config.stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is missing.");
    if (!profile.stripe_customer_id) throw new Error("No Stripe customer found for this account.");

    const stripe = new Stripe(config.stripeSecretKey);
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${config.appUrl}/dashboard/billing`,
    });

    return { url: session.url };
  });

export const listAdminDashboard = createServerFn({ method: "POST" })
  .inputValidator(authSchema)
  .handler(async ({ data }) => {
    const { profile, supabase } = await getAuthedProfile(data.accessToken);
    if (profile.role !== "admin") throw new Error("Admin access required.");

    const [users, payments, models, reports] = await Promise.all([
      supabase
        .from("profiles")
        .select("id,email,plan,credits,role,created_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase.from("payments").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("ai_models").select("*").order("created_at", { ascending: false }),
      supabase
        .from("reports")
        .select("*, generated_assets(url)")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    return {
      users: users.data ?? [],
      payments: payments.data ?? [],
      models: models.data ?? [],
      reports: reports.data ?? [],
    };
  });
