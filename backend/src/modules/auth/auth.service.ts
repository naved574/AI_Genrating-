import { CreditReason, PlanKey } from "@prisma/client";
import type { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { AppError, UnauthorizedError } from "../../shared/errors/app-error";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function signAccessToken(user: { id: string; email: string; role: UserRole }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL as jwt.SignOptions["expiresIn"],
  });
}

function signRefreshToken(userId: string, familyId: string) {
  return jwt.sign({ sub: userId, familyId }, env.JWT_REFRESH_SECRET, {
    expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d`,
  });
}

function refreshExpiry() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.REFRESH_TOKEN_TTL_DAYS);
  return expiresAt;
}

export async function registerUser(input: { email: string; password: string; fullName?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        fullName: input.fullName,
        plan: PlanKey.FREE,
        credits: 25,
      },
    });

    await tx.creditTransaction.create({
      data: {
        userId: created.id,
        amount: 25,
        reason: CreditReason.SIGNUP_BONUS,
      },
    });

    return created;
  });

  return createTokenPair(user);
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (!user) throw new UnauthorizedError("Invalid email or password");

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new UnauthorizedError("Invalid email or password");

  return createTokenPair(user);
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
      sub: string;
      familyId: string;
    };
    const tokenHash = hashToken(refreshToken);
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedError("Invalid refresh token");

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return createTokenPair(user, payload.familyId);
  } catch {
    throw new UnauthorizedError("Invalid refresh token");
  }
}

export async function logout(refreshToken: string | undefined) {
  if (!refreshToken) return;
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

async function createTokenPair(
  user: { id: string; email: string; role: UserRole },
  existingFamilyId?: string,
) {
  const familyId = existingFamilyId ?? crypto.randomUUID();
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user.id, familyId);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      familyId,
      expiresAt: refreshExpiry(),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}
