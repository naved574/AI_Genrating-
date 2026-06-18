import type { AiProvider } from "@prisma/client";

export type GenerateImageInput = {
  prompt: string;
  negativePrompt?: string;
  model: string;
  aspectRatio: string;
  quantity: number;
};

export type GeneratedProviderImage = {
  url: string;
  width?: number;
  height?: number;
  seed?: number;
};

export interface ImageProvider {
  provider: AiProvider;
  generateImage(input: GenerateImageInput): Promise<GeneratedProviderImage[]>;
  removeBackground?(imageUrl: string): Promise<GeneratedProviderImage>;
  upscaleImage?(imageUrl: string): Promise<GeneratedProviderImage>;
}

