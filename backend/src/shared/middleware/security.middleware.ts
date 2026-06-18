import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "../../config/env";

export const helmetMiddleware = helmet();

export const corsMiddleware = cors({
  origin: env.FRONTEND_URL,
  credentials: true,
});

export const apiRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

export const expensiveRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

