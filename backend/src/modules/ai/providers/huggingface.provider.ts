import { AiProvider } from "@prisma/client";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";
import type { GeneratedProviderImage, GenerateImageInput, ImageProvider } from "./ai-provider";

export class HuggingFaceImageProvider implements ImageProvider {
  provider = AiProvider.HUGGINGFACE;

  async generateImage(input: GenerateImageInput): Promise<GeneratedProviderImage[]> {
    if (!env.HUGGINGFACE_API_KEY) {
      throw new AppError("HuggingFace is not configured", 503, "HUGGINGFACE_NOT_CONFIGURED");
    }

    const images: GeneratedProviderImage[] = [];
    for (let index = 0; index < input.quantity; index += 1) {
      const response = await fetch(`https://api-inference.huggingface.co/models/${input.model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: input.prompt,
          parameters: {
            negative_prompt: input.negativePrompt,
          },
        }),
      });

      if (!response.ok) throw new AppError(await response.text(), 502, "HF_GENERATION_FAILED");
      const blob = await response.arrayBuffer();
      const base64 = Buffer.from(blob).toString("base64");
      images.push({ url: `data:image/png;base64,${base64}` });
    }
    return images;
  }
}

