import { Router } from "express";

import { requireAuth } from "../../shared/middleware/auth.middleware";
import { validateBody } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { created } from "../../shared/utils/response";
import { signedUploadSchema } from "./uploads.schema";
import { createSignedUpload } from "./uploads.service";

export const uploadRoutes = Router();

uploadRoutes.post(
  "/",
  requireAuth,
  validateBody(signedUploadSchema),
  asyncHandler(async (req, res) => {
    const result = await createSignedUpload(req.user!.sub, req.body);
    return created(res, result);
  }),
);

