import { z } from "zod";

export const signedUploadSchema = z.object({
  folder: z.string().default("ai-generator/uploads"),
  purpose: z.string().default("input"),
});

