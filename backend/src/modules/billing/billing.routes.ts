import { Router } from "express";

import { requireAuth } from "../../shared/middleware/auth.middleware";
import { validateBody } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ok } from "../../shared/utils/response";
import { checkoutSchema } from "./billing.schema";
import { createBillingPortalSession, createCheckoutSession, handleStripeWebhook } from "./billing.service";

export const billingRoutes = Router();

billingRoutes.post(
  "/checkout",
  requireAuth,
  validateBody(checkoutSchema),
  asyncHandler(async (req, res) => {
    const session = await createCheckoutSession(req.user!.sub, req.body);
    return ok(res, session);
  }),
);

billingRoutes.post(
  "/portal",
  requireAuth,
  asyncHandler(async (req, res) => {
    const session = await createBillingPortalSession(req.user!.sub);
    return ok(res, session);
  }),
);

billingRoutes.post(
  "/webhook",
  asyncHandler(async (req, res) => {
    const result = await handleStripeWebhook(req);
    return ok(res, result);
  }),
);

