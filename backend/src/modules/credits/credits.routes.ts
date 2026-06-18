import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const creditsRoutes = Router();

creditsRoutes.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [user, transactions] = await Promise.all([
      prisma.user.findUnique({ where: { id: req.user!.sub }, select: { credits: true, plan: true } }),
      prisma.creditTransaction.findMany({
        where: { userId: req.user!.sub },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    return ok(res, { balance: user?.credits ?? 0, plan: user?.plan, transactions });
  }),
);

