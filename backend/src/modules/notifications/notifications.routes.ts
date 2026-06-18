import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const notificationRoutes = Router();

notificationRoutes.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.sub },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return ok(res, notifications);
  }),
);

