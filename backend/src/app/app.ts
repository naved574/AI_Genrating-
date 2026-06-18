import cookieParser from "cookie-parser";
import express from "express";
import pinoHttp from "pino-http";

import { adminRoutes } from "../modules/admin/admin.routes";
import { analyticsRoutes } from "../modules/analytics/analytics.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { billingRoutes } from "../modules/billing/billing.routes";
import { creditsRoutes } from "../modules/credits/credits.routes";
import { galleryRoutes } from "../modules/gallery/gallery.routes";
import { generationRoutes } from "../modules/generations/generations.routes";
import { modelRoutes } from "../modules/models/models.routes";
import { notificationRoutes } from "../modules/notifications/notifications.routes";
import { uploadRoutes } from "../modules/uploads/uploads.routes";
import { userRoutes } from "../modules/users/users.routes";
import { errorMiddleware } from "../shared/middleware/error.middleware";
import { apiRateLimit, corsMiddleware, helmetMiddleware } from "../shared/middleware/security.middleware";
import { logger } from "../shared/logger/logger";
import { healthRoutes } from "./health.routes";

export function createApp() {
  const app = express();

  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(pinoHttp({ logger }));
  app.use(cookieParser());
  app.use("/api/v1/billing/webhook", express.raw({ type: "application/json" }));
  app.use(express.json({ limit: "2mb" }));
  app.use(apiRateLimit);
  app.use(healthRoutes);

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/models", modelRoutes);
  app.use("/api/v1/generations", generationRoutes);
  app.use("/api/v1/uploads", uploadRoutes);
  app.use("/api/v1/gallery", galleryRoutes);
  app.use("/api/v1/credits", creditsRoutes);
  app.use("/api/v1/billing", billingRoutes);
  app.use("/api/v1/analytics", analyticsRoutes);
  app.use("/api/v1/notifications", notificationRoutes);
  app.use("/api/v1/admin", adminRoutes);

  app.use(errorMiddleware);

  return app;
}
