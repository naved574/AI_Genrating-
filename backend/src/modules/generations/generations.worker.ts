import { CreditReason, GenerationStatus, JobStatus } from "@prisma/client";

import { cloudinary } from "../../config/cloudinary";
import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { getImageProvider } from "../ai/providers/provider-registry";
import { emitToUser } from "../../websockets/socket";

export async function processGenerationJob(generationId: string, bullJobId?: string) {
  const generation = await prisma.generation.findUnique({
    where: { id: generationId },
    include: { model: true, user: true },
  });
  if (!generation || !generation.model) return;

  await prisma.generation.update({
    where: { id: generationId },
    data: { status: GenerationStatus.PROCESSING },
  });
  await prisma.generationJob.update({
    where: { generationId },
    data: { status: JobStatus.ACTIVE, bullJobId, startedAt: new Date() },
  });
  emitToUser(generation.userId, "generation:progress", { generationId, status: "processing" });

  try {
    const provider = getImageProvider(generation.provider);
    const images = await provider.generateImage({
      prompt: generation.prompt,
      negativePrompt: generation.negativePrompt ?? undefined,
      model: generation.model.providerModel,
      aspectRatio: generation.aspectRatio,
      quantity: generation.quantity,
    });

    for (const image of images) {
      const uploaded = await uploadProviderImage(generation.userId, image.url);
      const savedImage = await prisma.image.create({
        data: {
          userId: generation.userId,
          publicId: uploaded.publicId,
          url: uploaded.url,
          secureUrl: uploaded.secureUrl,
          width: uploaded.width ?? image.width,
          height: uploaded.height ?? image.height,
          format: uploaded.format,
          bytes: uploaded.bytes,
          isPublic: false,
        },
      });

      await prisma.generationResult.create({
        data: {
          generationId,
          imageId: savedImage.id,
          url: savedImage.secureUrl ?? savedImage.url,
          width: savedImage.width,
          height: savedImage.height,
          seed: image.seed,
        },
      });
    }

    await prisma.generation.update({
      where: { id: generationId },
      data: { status: GenerationStatus.SUCCEEDED, completedAt: new Date() },
    });
    await prisma.generationJob.update({
      where: { generationId },
      data: { status: JobStatus.COMPLETED, completedAt: new Date() },
    });
    emitToUser(generation.userId, "generation:completed", { generationId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: generation.userId },
        data: { credits: { increment: generation.creditsCharged } },
      });
      await tx.creditTransaction.create({
        data: {
          userId: generation.userId,
          amount: generation.creditsCharged,
          reason: CreditReason.GENERATION_REFUND,
          generationId,
        },
      });
      await tx.generation.update({
        where: { id: generationId },
        data: { status: GenerationStatus.FAILED, error: message, completedAt: new Date() },
      });
      await tx.generationJob.update({
        where: { generationId },
        data: { status: JobStatus.FAILED, error: message, completedAt: new Date() },
      });
      await tx.generationLog.create({
        data: { generationId, level: "error", message },
      });
    });

    emitToUser(generation.userId, "generation:failed", { generationId, error: message });
    emitToUser(generation.userId, "credits:updated", { amount: generation.creditsCharged });
    throw error;
  }
}

async function uploadProviderImage(userId: string, url: string) {
  if (!env.CLOUDINARY_CLOUD_NAME) {
    return { url, secureUrl: url, publicId: undefined, width: undefined, height: undefined, format: undefined, bytes: undefined };
  }

  const result = await cloudinary.uploader.upload(url, {
    folder: `ai-generator/generations/${userId}`,
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

