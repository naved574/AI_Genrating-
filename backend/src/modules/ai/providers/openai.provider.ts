import { AiProvider } from "@prisma/client";

import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";
import type { GeneratedProviderImage, GenerateImageInput, ImageProvider } from "./ai-provider";

export class OpenAiImageProvider implements ImageProvider {
  provider = AiProvider.OPENAI;

  async generateImage(input: GenerateImageInput): Promise<GeneratedProviderImage[]> {
    if (!env.OPENAI_API_KEY) throw new AppError("OpenAI is not configured", 503, "OPENAI_NOT_CONFIGURED");

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: input.model,
        prompt: input.prompt,
        n: input.quantity,
        size: mapAspectRatioToSize(input.aspectRatio),
      }),
    });

    if (!response.ok) throw new AppError(await response.text(), 502, "OPENAI_GENERATION_FAILED");

    const data = (await response.json()) as { data?: { url?: string; b64_json?: string }[] };
    return (data.data ?? [])
      .map((image) => {
        if (image.url) return { url: image.url };
        if (image.b64_json) return { url: `data:image/png;base64,${image.b64_json}` };
        return null;
      })
      .filter(Boolean) as GeneratedProviderImage[];
  }
}

function mapAspectRatioToSize(aspectRatio: string) {
  if (aspectRatio === "16:9") return "1536x1024";
  if (aspectRatio === "9:16") return "1024x1536";
  return "1024x1024";
}

