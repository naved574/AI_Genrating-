import { CreditReason, GenerationStatus, JobStatus } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { generationQueue } from "../../jobs/generation.queue";
import { AppError, NotFoundError } from "../../shared/errors/app-error";
import { emitToUser } from "../../websockets/socket";

export async function createGeneration(
  userId: string,
  input: {
    prompt: string;
    negativePrompt?: string;
    modelSlug: string;
    aspectRatio: string;
    quantity: number;
  },
) {
  if (!generationQueue) {
    throw new AppError("Generation queue is not configured. Set REDIS_URL.", 503, "QUEUE_NOT_CONFIGURED");
  }

  const model = await prisma.aiModel.findUnique({ where: { slug: input.modelSlug } });
  if (!model || !model.enabled) throw new NotFoundError("AI model not found");
  if (!model.supportedAspectRatios.includes(input.aspectRatio)) {
    throw new AppError("Aspect ratio is not supported by this model", 400, "UNSUPPORTED_ASPECT_RATIO");
  }

  const totalCost = model.costCredits * input.quantity;

  const generation = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("User not found");
    if (user.credits < totalCost) {
      throw new AppError(`Insufficient credits. You need ${totalCost} credits.`, 402, "INSUFFICIENT_CREDITS");
    }

    await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: totalCost } },
    });

    const created = await tx.generation.create({
      data: {
        userId,
        modelId: model.id,
        prompt: input.prompt,
        negativePrompt: input.negativePrompt,
        aspectRatio: input.aspectRatio,
        quantity: input.quantity,
        provider: model.provider,
        status: GenerationStatus.QUEUED,
        creditsCharged: totalCost,
      },
    });

    await tx.generationJob.create({
      data: {
        generationId: created.id,
        status: JobStatus.WAITING,
      },
    });

    await tx.creditTransaction.create({
      data: {
        userId,
        amount: -totalCost,
        reason: CreditReason.GENERATION,
        generationId: created.id,
      },
    });

    await tx.usageLog.create({
      data: {
        userId,
        action: "generation.create",
        tool: model.category,
        credits: totalCost,
      },
    });

    return created;
  });

  const job = await generationQueue.add("generate-image", { generationId: generation.id });
  await prisma.generationJob.update({
    where: { generationId: generation.id },
    data: { bullJobId: job.id },
  });

  emitToUser(userId, "generation:queued", { generationId: generation.id });
  emitToUser(userId, "credits:updated", { amount: -totalCost });

  return generation;
}

export async function listGenerations(userId: string) {
  return prisma.generation.findMany({
    where: { userId },
    include: {
      model: true,
      results: { include: { image: true } },
      job: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function getGeneration(userId: string, id: string) {
  const generation = await prisma.generation.findFirst({
    where: { id, userId },
    include: {
      model: true,
      results: { include: { image: true } },
      job: true,
      logs: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!generation) throw new NotFoundError("Generation not found");
  return generation;
}
