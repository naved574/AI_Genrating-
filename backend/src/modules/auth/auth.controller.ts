import type { Request, Response } from "express";

import { created, ok } from "../../shared/utils/response";
import { loginUser, logout, refreshAccessToken, registerUser } from "./auth.service";

export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body);
  return created(res, result);
}

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);
  return ok(res, result);
}

export async function refresh(req: Request, res: Response) {
  const result = await refreshAccessToken(req.body.refreshToken);
  return ok(res, result);
}

export async function logoutUser(req: Request, res: Response) {
  await logout(req.body.refreshToken);
  return ok(res, { success: true });
}

