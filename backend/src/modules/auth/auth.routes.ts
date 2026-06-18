import { Router } from "express";

import { validateBody } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { login, logoutUser, refresh, register } from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema } from "./auth.schema";

export const authRoutes = Router();

authRoutes.post("/register", validateBody(registerSchema), asyncHandler(register));
authRoutes.post("/login", validateBody(loginSchema), asyncHandler(login));
authRoutes.post("/refresh", validateBody(refreshSchema), asyncHandler(refresh));
authRoutes.post("/logout", validateBody(refreshSchema.partial()), asyncHandler(logoutUser));

