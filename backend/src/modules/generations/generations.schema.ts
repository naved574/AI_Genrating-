import { z } from "zod";

export const createGenerationSchema = z.object({
  prompt: z.string().min(3).max(2000),
  negativePrompt: z.string().max(1000).optional(),
  modelSlug: z.string().min(1),
  aspectRatio: z.enum(["1:1", "2:3", "3:2", "4:3", "16:9", "9:16"]),
  quantity: z.number().int().min(1).max(5).default(1),
});

export const generationIdParamsSchema = z.object({
  id: z.string().uuid(),
});

