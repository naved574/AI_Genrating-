import { Router } from "express";

import { requireAuth } from "../../shared/middleware/auth.middleware";
import { expensiveRateLimit } from "../../shared/middleware/security.middleware";
import { validateBody, validateParams } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { created, ok } from "../../shared/utils/response";
import { createGenerationSchema, generationIdParamsSchema } from "./generations.schema";
import { createGeneration, getGeneration, listGenerations } from "./generations.service";

export const generationRoutes = Router();

generationRoutes.post(
  "/",
  requireAuth,
  expensiveRateLimit,
  validateBody(createGenerationSchema),
  asyncHandler(async (req, res) => {
    const generation = await createGeneration(req.user!.sub, req.body);
    return created(res, generation);
  }),
);

generationRoutes.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const generations = await listGenerations(req.user!.sub);
    return ok(res, generations);
  }),
);

generationRoutes.get(
  "/:id",
  requireAuth,
  validateParams(generationIdParamsSchema),
  asyncHandler(async (req, res) => {
    const generation = await getGeneration(req.user!.sub, String(req.params.id));
    return ok(res, generation);
  }),
);
