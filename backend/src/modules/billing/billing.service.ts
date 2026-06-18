import { CreditReason, PaymentStatus, PlanKey, SubscriptionStatus } from "@prisma/client";
import type { Request } from "express";

import { env } from "../../config/env";
import { prisma } from "../../config/prisma";
import { stripe } from "../../config/stripe";
import { AppError } from "../../shared/errors/app-error";

export async function createCheckoutSession(userId: string, input: { planId: string; mode: "subscription" | "payment" }) {
  if (!stripe) throw new AppError("Stripe is not configured", 503, "STRIPE_NOT_CONFIGURED");

  const [user, plan] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.plan.findUnique({ where: { id: input.planId } }),
  ]);

  if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");
  if (!plan?.stripePriceId) throw new AppError("Plan has no Stripe price ID", 400, "PLAN_NOT_BILLABLE");

  const customerId =
    user.stripeCustomerId ??
    (
      await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      })
    ).id;

  if (!user.stripeCustomerId) {
    await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
  }

  const session = await stripe.checkout.sessions.create({
    mode: input.mode,
    customer: customerId,
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${env.FRONTEND_URL}/dashboard/billing?checkout=success`,
    cancel_url: `${env.FRONTEND_URL}/pricing?checkout=cancelled`,
    metadata: { userId, planId: plan.id, credits: String(plan.monthlyCredits) },
  });

  await prisma.payment.create({
    data: {
      userId,
      stripeCustomerId: customerId,
      stripeSessionId: session.id,
      amountCents: plan.monthlyPriceCents,
      credits: plan.monthlyCredits,
      status: PaymentStatus.PENDING,
    },
  });

  return { url: session.url };
}

export async function createBillingPortalSession(userId: string) {
  if (!stripe) throw new AppError("Stripe is not configured", 503, "STRIPE_NOT_CONFIGURED");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) throw new AppError("Stripe customer not found", 404, "STRIPE_CUSTOMER_NOT_FOUND");

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.FRONTEND_URL}/dashboard/billing`,
  });

  return { url: session.url };
}

export async function handleStripeWebhook(req: Request) {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    throw new AppError("Stripe webhook is not configured", 503, "STRIPE_WEBHOOK_NOT_CONFIGURED");
  }

  const signature = req.headers["stripe-signature"];
  if (!signature || Array.isArray(signature)) {
    throw new AppError("Missing Stripe signature", 400, "MISSING_STRIPE_SIGNATURE");
  }

  const event = stripe.webhooks.constructEvent(req.body as Buffer, signature, env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;
    const credits = Number(session.metadata?.credits ?? 0);

    if (userId && credits > 0) {
      await prisma.$transaction(async (tx) => {
        await tx.payment.upsert({
          where: { stripeSessionId: session.id },
          create: {
            userId,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
            stripeSessionId: session.id,
            stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
            credits,
            status: PaymentStatus.PAID,
            stripeEventId: event.id,
          },
          update: {
            status: PaymentStatus.PAID,
            stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
            stripeEventId: event.id,
          },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            credits: { increment: credits },
            plan: mapPlanId(planId),
          },
        });

        if (planId) {
          await tx.subscription.upsert({
            where: { stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : `checkout_${session.id}` },
            create: {
              userId,
              planId,
              stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : `checkout_${session.id}`,
              status: SubscriptionStatus.ACTIVE,
            },
            update: {
              planId,
              status: SubscriptionStatus.ACTIVE,
            },
          });
        }

        await tx.creditTransaction.create({
          data: {
            userId,
            amount: credits,
            reason: CreditReason.STRIPE_CHECKOUT,
            stripeEventId: event.id,
          },
        });
      });
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;
    await prisma.payment.create({
      data: {
        stripeCustomerId: typeof invoice.customer === "string" ? invoice.customer : undefined,
        amountCents: invoice.amount_due ?? 0,
        status: PaymentStatus.FAILED,
        stripeEventId: event.id,
      },
    });
  }

  return { received: true };
}

function mapPlanId(planId?: string | null): PlanKey {
  if (planId === "pro") return PlanKey.PRO;
  if (planId === "studio") return PlanKey.STUDIO;
  if (planId === "enterprise") return PlanKey.ENTERPRISE;
  return PlanKey.FREE;
}
