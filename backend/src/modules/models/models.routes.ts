import { Router } from "express";

import { prisma } from "../../config/prisma";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const modelRoutes = Router();

modelRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const models = await prisma.aiModel.findMany({
      where: { enabled: true },
      orderBy: { costCredits: "asc" },
    });
    return ok(res, models);
  }),
);

