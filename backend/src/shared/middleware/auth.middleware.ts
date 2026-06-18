import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { ForbiddenError, UnauthorizedError } from "../errors/app-error";

export type JwtUser = {
  sub: string;
  email: string;
  role: "CREATOR" | "ADMIN";
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
    if (!token) throw new UnauthorizedError();

    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtUser;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedError();

    req.user = { sub: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    next(error instanceof UnauthorizedError ? error : new UnauthorizedError());
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== "ADMIN") return next(new ForbiddenError("Admin access required"));
  next();
}

