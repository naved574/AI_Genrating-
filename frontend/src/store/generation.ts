import { create } from "zustand";

import { createGeneration, listModels, listMyGenerations } from "@/lib/api/saas.functions";
import type { AiModel, AspectRatio, GenerationWithAssets } from "@/lib/saas-types";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuth } from "./auth";

export type { AspectRatio } from "@/lib/saas-types";
export type Speed = "steady" | "turbo";

export type GeneratedImage = {
  id: string;
  prompt: string;
  negativePrompt?: string;
  model: string;
  modelSlug: string;
  aspectRatio: AspectRatio;
  seed: number;
  step: number;
  cover: string;
  loading?: boolean;
  status?: "queued" | "processing" | "succeeded" | "failed" | "refunded";
};

type State = {
  prompt: string;
  negativePrompt: string;
  negativeEnabled: boolean;
  model: string;
  modelSlug: string;
  models: AiModel[];
  aspectRatio: AspectRatio;
  quantity: number;
  speed: Speed;
  results: GeneratedImage[];
  loading: boolean;
  error: string | null;
  setPrompt: (v: string) => void;
  setNegativePrompt: (v: string) => void;
  toggleNegative: () => void;
  setModel: (name: string, slug?: string) => void;
  setAspect: (v: AspectRatio) => void;
  setQuantity: (v: number) => void;
  setSpeed: (v: Speed) => void;
  loadModels: () => Promise<void>;
  loadHistory: () => Promise<void>;
  generate: () => Promise<void>;
  remove: (id: string) => void;
};

const placeholderCovers = [
  "https://images.unsplash.com/photo-1644088379091-d574d2b4ab43?w=1200&q=70",
  "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=1200&q=70",
  "https://images.unsplash.com/photo-1635776062764-e025521e3df3?w=1200&q=70",
  "https://images.unsplash.com/photo-1620207418302-439b387441b0?w=1200&q=70",
];

const demoModels: AiModel[] = [
  {
    id: "demo-flux-schnell",
    slug: "fal-flux-schnell",
    name: "Flux Schnell",
    provider: "fal",
    provider_model: "fal-ai/flux/schnell",
    category: "text-to-image",
    cost_credits: 4,
    supported_aspect_ratios: ["1:1", "4:3", "16:9", "9:16"],
    enabled: true,
    metadata: {},
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-flux-dev",
    slug: "fal-flux-dev",
    name: "Flux Dev",
    provider: "fal",
    provider_model: "fal-ai/flux/dev",
    category: "text-to-image",
    cost_credits: 8,
    supported_aspect_ratios: ["1:1", "4:3", "16:9", "9:16"],
    enabled: true,
    metadata: {},
    created_at: new Date().toISOString(),
  },
];

function mapGeneration(row: GenerationWithAssets): GeneratedImage {
  const asset = row.generated_assets?.[0];
  return {
    id: row.id,
    prompt: row.prompt,
    negativePrompt: row.negative_prompt ?? undefined,
    model: row.ai_models?.name ?? "AI Model",
    modelSlug: row.ai_models?.slug ?? "",
    aspectRatio: row.aspect_ratio,
    seed: asset?.seed ?? 0,
    step: row.credits_charged,
    cover: asset?.url ?? placeholderCovers[0],
    loading: row.status === "queued" || row.status === "processing",
    status: row.status,
  };
}

export const useGeneration = create<State>((set, get) => ({
  prompt:
    "Atmospheric dense forest at midnight with bioluminescent mushrooms, glowing spores, cinematic lighting --ar 4:3",
  negativePrompt: "blurry, low quality, distorted",
  negativeEnabled: true,
  model: "Flux Schnell",
  modelSlug: "fal-flux-schnell",
  models: demoModels,
  aspectRatio: "4:3",
  quantity: 4,
  speed: "turbo",
  results: [],
  loading: false,
  error: null,
  setPrompt: (v) => set({ prompt: v }),
  setNegativePrompt: (v) => set({ negativePrompt: v }),
  toggleNegative: () => set({ negativeEnabled: !get().negativeEnabled }),
  setModel: (name, slug) =>
    set({
      model: name,
      modelSlug: slug ?? get().models.find((m) => m.name === name)?.slug ?? get().modelSlug,
    }),
  setAspect: (v) => set({ aspectRatio: v }),
  setQuantity: (v) => set({ quantity: v }),
  setSpeed: (v) => set({ speed: v }),
  remove: (id) => set({ results: get().results.filter((r) => r.id !== id) }),
  loadModels: async () => {
    if (!isSupabaseConfigured) return;
    try {
      const models = (await listModels()) as AiModel[];
      if (models.length) {
        set({ models, model: models[0].name, modelSlug: models[0].slug, error: null });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Unable to load models." });
    }
  },
  loadHistory: async () => {
    const accessToken = useAuth.getState().accessToken();
    if (!isSupabaseConfigured || !accessToken) return;
    set({ loading: true, error: null });
    try {
      const generations = (await listMyGenerations({
        data: { accessToken },
      })) as GenerationWithAssets[];
      set({ results: generations.map(mapGeneration), loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unable to load generation history.",
        loading: false,
      });
    }
  },
  generate: async () => {
    const {
      prompt,
      negativePrompt,
      negativeEnabled,
      modelSlug,
      model,
      aspectRatio,
      quantity,
      speed,
    } = get();
    const ids = Array.from({ length: isSupabaseConfigured ? 1 : quantity }).map(
      (_, index) => `g_${Date.now()}_${index}`,
    );
    const loading = ids.map(
      (id): GeneratedImage => ({
        id,
        prompt,
        negativePrompt: negativeEnabled ? negativePrompt : undefined,
        model,
        modelSlug,
        aspectRatio,
        seed: Math.floor(Math.random() * 9_999_999),
        step: 30,
        cover: "",
        loading: true,
        status: "processing",
      }),
    );

    set({ results: [...loading, ...get().results], loading: true, error: null });

    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      set({
        results: get().results.map((r) =>
          ids.includes(r.id)
            ? {
                ...r,
                loading: false,
                status: "succeeded",
                cover: placeholderCovers[Math.floor(Math.random() * placeholderCovers.length)],
              }
            : r,
        ),
        loading: false,
      });
      return;
    }

    const accessToken = useAuth.getState().accessToken();
    if (!accessToken) {
      set({
        results: get().results.filter((r) => !ids.includes(r.id)),
        loading: false,
        error: "Please sign in before generating images.",
      });
      return;
    }

    try {
      await createGeneration({
        data: {
          accessToken,
          prompt,
          negativePrompt: negativeEnabled ? negativePrompt : undefined,
          modelSlug,
          aspectRatio,
          quantity,
          speed,
        },
      });
      await useAuth.getState().refreshProfile();
      await get().loadHistory();
    } catch (error) {
      set({
        results: get().results.filter((r) => !ids.includes(r.id)),
        loading: false,
        error: error instanceof Error ? error.message : "Generation failed.",
      });
    }
  },
}));
