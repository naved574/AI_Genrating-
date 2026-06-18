import Stripe from "stripe";

import { getServerConfig } from "../config.server";
import { getSupabaseAdmin } from "../supabase/server";

export async function handleStripeWebhook(request: Request) {
  const config = getServerConfig();
  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    return new Response("Stripe webhook is not configured.", { status: 500 });
  }

  const stripe = new Stripe(config.stripeSecretKey);
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing Stripe signature.", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, config.stripeWebhookSecret);
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Invalid webhook signature.", {
      status: 400,
    });
  }

  const supabase = getSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;
    const credits = Number(session.metadata?.credits ?? 0);

    if (userId && credits > 0) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();
      const nextCredits = Number(profile?.credits ?? 0) + credits;

      await supabase
        .from("profiles")
        .update({ credits: nextCredits, plan: planId ?? "pro" })
        .eq("id", userId);
      await supabase.from("credit_ledger").insert({
        user_id: userId,
        amount: credits,
        reason: "stripe_checkout",
        stripe_event_id: event.id,
      });
      await supabase
        .from("payments")
        .update({
          status: "paid",
          stripe_subscription_id:
            typeof session.subscription === "string" ? session.subscription : null,
        })
        .eq("stripe_session_id", session.id);
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const customer = typeof invoice.customer === "string" ? invoice.customer : null;
    if (customer) {
      await supabase.from("payments").insert({
        stripe_customer_id: customer,
        status: "failed",
        amount_cents: invoice.amount_due ?? 0,
      });
    }
  }

  return Response.json({ received: true });
}
