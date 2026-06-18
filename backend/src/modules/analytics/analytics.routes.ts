import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAdmin, requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const analyticsRoutes = Router();

analyticsRoutes.get(
  "/summary",
  requireAuth,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [users, generations, downloads, payments] = await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.download.count(),
      prisma.payment.findMany({ where: { status: "PAID" }, select: { amountCents: true } }),
    ]);
    return ok(res, {
      users,
      generations,
      downloads,
      revenueCents: payments.reduce((sum, payment) => sum + payment.amountCents, 0),
    });
  }),
);

