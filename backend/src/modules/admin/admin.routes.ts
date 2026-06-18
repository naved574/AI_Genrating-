import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAdmin, requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const adminRoutes = Router();

adminRoutes.use(requireAuth, requireAdmin);

adminRoutes.get(
  "/users",
  asyncHandler(async (_req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        plan: true,
        credits: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok(res, users);
  }),
);

adminRoutes.get(
  "/generations",
  asyncHandler(async (_req, res) => {
    const generations = await prisma.generation.findMany({
      include: { user: { select: { email: true } }, model: true, job: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok(res, generations);
  }),
);

adminRoutes.get(
  "/revenue",
  asyncHandler(async (_req, res) => {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    const paidCents = payments
      .filter((payment) => payment.status === "PAID")
      .reduce((total, payment) => total + payment.amountCents, 0);
    return ok(res, { paidCents, payments });
  }),
);

adminRoutes.get(
  "/reports",
  asyncHandler(async (_req, res) => {
    const reports = await prisma.report.findMany({
      include: { image: true, reporter: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok(res, reports);
  }),
);

adminRoutes.get(
  "/models",
  asyncHandler(async (_req, res) => {
    const models = await prisma.aiModel.findMany({ orderBy: { createdAt: "desc" } });
    return ok(res, models);
  }),
);

