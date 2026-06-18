import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ai-generator-backend", timestamp: new Date().toISOString() });
});

