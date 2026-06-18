import type { Response } from "express";

export function ok<T>(res: Response, data: T, statusCode = 200) {
  return res.status(statusCode).json({ data });
}

export function created<T>(res: Response, data: T) {
  return ok(res, data, 201);
}

