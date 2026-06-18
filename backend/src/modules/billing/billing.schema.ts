import { z } from "zod";

export const checkoutSchema = z.object({
  planId: z.string().min(1),
  mode: z.enum(["subscription", "payment"]).default("subscription"),
});

