import { Router } from "express";

import { prisma } from "../../config/prisma";
import { requireAuth } from "../../shared/middleware/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";

export const userRoutes = Router();

userRoutes.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        avatarUrl: true,
        role: true,
        plan: true,
        credits: true,
        stripeCustomerId: true,
        createdAt: true,
      },
    });
    return ok(res, user);
  }),
);

