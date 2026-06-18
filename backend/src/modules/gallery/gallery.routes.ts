import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const galleryRoutes = Router();

galleryRoutes.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const images = await prisma.image.findMany({
      where: { userId: req.user!.sub },
      orderBy: { createdAt: "desc" },
      include: { favorites: true, downloads: true },
      take: 100,
    });
    return ok(res, images);
  }),
);

galleryRoutes.get(
  "/public",
  asyncHandler(async (_req, res) => {
    const images = await prisma.image.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok(res, images);
  }),
);

