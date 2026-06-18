import type { AiProvider } from "@prisma/client";

import { AppError } from "../../../shared/errors/app-error";
import type { ImageProvider } from "./ai-provider";
import { HuggingFaceImageProvider } from "./huggingface.provider";
import { OpenAiImageProvider } from "./openai.provider";

const providers: Partial<Record<AiProvider, ImageProvider>> = {
  OPENAI: new OpenAiImageProvider(),
  HUGGINGFACE: new HuggingFaceImageProvider(),
};

export function getImageProvider(provider: AiProvider) {
  const imageProvider = providers[provider];
  if (!imageProvider) {
    throw new AppError(`AI provider ${provider} is not implemented`, 501, "AI_PROVIDER_NOT_IMPLEMENTED");
  }
  return imageProvider;
}

