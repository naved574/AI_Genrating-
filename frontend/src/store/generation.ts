import { create } from "zustand";

export type AspectRatio = "1:1" | "2:3" | "3:2" | "4:3" | "16:9" | "9:16";
export type Speed = "steady" | "turbo";

export type GeneratedImage = {
  id: string;
  prompt: string;
  negativePrompt?: string;
  model: string;
  aspectRatio: AspectRatio;
  seed: number;
  step: number;
  cover: string;
  loading?: boolean;
};

type State = {
  prompt: string;
  negativePrompt: string;
  negativeEnabled: boolean;
  model: string;
  aspectRatio: AspectRatio;
  quantity: number;
  speed: Speed;
  results: GeneratedImage[];
  setPrompt: (v: string) => void;
  setNegativePrompt: (v: string) => void;
  toggleNegative: () => void;
  setModel: (v: string) => void;
  setAspect: (v: AspectRatio) => void;
  setQuantity: (v: number) => void;
  setSpeed: (v: Speed) => void;
  generate: () => Promise<void>;
  remove: (id: string) => void;
};

const placeholderCovers = [
  "https://images.unsplash.com/photo-1644088379091-d574d2b4ab43?w=1200&q=70",
  "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=1200&q=70",
  "https://images.unsplash.com/photo-1635776062764-e025521e3df3?w=1200&q=70",
  "https://images.unsplash.com/photo-1620207418302-439b387441b0?w=1200&q=70",
  "https://images.unsplash.com/photo-1633101585272-9e0b0c3d9e3f?w=1200&q=70",
  "https://images.unsplash.com/photo-1675553424637-ee257d160ade?w=1200&q=70",
];

export const useGeneration = create<State>((set, get) => ({
  prompt: "Atmospheric dense forest at midnight with bioluminescent mushrooms, glowing spores, cinematic lighting --ar 4:3",
  negativePrompt: "blurry, low quality, distorted",
  negativeEnabled: true,
  model: "Spectral v4.2",
  aspectRatio: "4:3",
  quantity: 4,
  speed: "turbo",
  results: [
    {
      id: "g1",
      prompt: "Atmospheric dense forest at midnight with bioluminescent mushrooms, glowing spores, cinematic lighting --ar 4:3",
      model: "Spectral v4.2",
      aspectRatio: "4:3",
      seed: 8421094,
      step: 30,
      cover: placeholderCovers[0],
    },
    {
      id: "g2",
      prompt: "Minimalist hyper-modern glass sculpture, iridescent surfaces, gallery, soft bounce lighting --ar 1:1",
      model: "Spectral v4.2",
      aspectRatio: "1:1",
      seed: 3391023,
      step: 25,
      cover: placeholderCovers[1],
    },
    {
      id: "g3",
      prompt: "Cyberpunk Tokyo alley at night, neon reflections in puddles, 35mm photography --ar 16:9",
      model: "Spectral v4.2",
      aspectRatio: "16:9",
      seed: 1129004,
      step: 28,
      cover: placeholderCovers[2],
    },
  ],
  setPrompt: (v) => set({ prompt: v }),
  setNegativePrompt: (v) => set({ negativePrompt: v }),
  toggleNegative: () => set({ negativeEnabled: !get().negativeEnabled }),
  setModel: (v) => set({ model: v }),
  setAspect: (v) => set({ aspectRatio: v }),
  setQuantity: (v) => set({ quantity: v }),
  setSpeed: (v) => set({ speed: v }),
  remove: (id) => set({ results: get().results.filter((r) => r.id !== id) }),
  generate: async () => {
    const { prompt, model, aspectRatio, quantity } = get();
    const ids = Array.from({ length: 1 }).map(() => `g_${Date.now()}`);
    const loading: GeneratedImage[] = ids.map((id) => ({
      id,
      prompt,
      model,
      aspectRatio,
      seed: Math.floor(Math.random() * 9_999_999),
      step: 30,
      cover: "",
      loading: true,
    }));
    set({ results: [...loading, ...get().results] });
    await new Promise((r) => setTimeout(r, 1800));
    set({
      results: get().results.map((r) =>
        r.loading && ids.includes(r.id)
          ? { ...r, loading: false, cover: placeholderCovers[Math.floor(Math.random() * placeholderCovers.length)] }
          : r,
      ),
    });
    void quantity;
  },
}));
