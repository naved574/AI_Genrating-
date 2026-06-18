import { useEffect, useState } from "react";

import { DashPageHeader, DashTable } from "@/components/sections";
import {
  createBillingPortalSession,
  createCheckoutSession,
  listPlans,
} from "@/lib/api/saas.functions";
import type { Plan } from "@/lib/saas-types";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuth } from "@/store/auth";

const fallbackPlans: Pick<
  Plan,
  "id" | "name" | "monthly_price_cents" | "monthly_credits" | "stripe_price_id"
>[] = [
  { id: "free", name: "Free", monthly_price_cents: 0, monthly_credits: 25, stripe_price_id: null },
  {
    id: "pro",
    name: "Pro",
    monthly_price_cents: 1900,
    monthly_credits: 1200,
    stripe_price_id: null,
  },
  {
    id: "studio",
    name: "Studio",
    monthly_price_cents: 4900,
    monthly_credits: 4000,
    stripe_price_id: null,
  },
];

export function Billing() {
  const accessToken = useAuth((state) => state.accessToken());
  const [plans, setPlans] = useState(fallbackPlans);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    void listPlans()
      .then((data) => setPlans(data as Plan[]))
      .catch((error) => setError(error instanceof Error ? error.message : "Unable to load plans."));
  }, []);

  async function checkout(planId: string) {
    if (!accessToken) return setError("Please sign in first.");
    const session = await createCheckoutSession({
      data: { accessToken, planId, mode: "subscription" },
    });
    if (session.url) window.location.href = session.url;
  }

  async function openPortal() {
    if (!accessToken) return setError("Please sign in first.");
    const session = await createBillingPortalSession({ data: { accessToken } });
    if (session.url) window.location.href = session.url;
  }

  return (
    <>
      <DashPageHeader
        title="Billing"
        description="Stripe checkout, billing portal, and monthly creator credits."
        breadcrumbs={[{ to: "/dashboard", label: "Dashboard" }, { label: "Billing" }]}
        actions={
          <button
            onClick={openPortal}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium"
          >
            Billing portal
          </button>
        }
      />
      {error && <p className="px-6 md:px-8 pt-4 text-xs text-destructive">{error}</p>}
      <DashTable
        columns={[
          { key: "name", label: "Plan" },
          { key: "price", label: "Price" },
          { key: "credits", label: "Credits" },
          {
            key: "action",
            label: "Action",
            render: (row) => (
              <button
                onClick={() => checkout(String(row.id))}
                className="rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
              >
                Choose
              </button>
            ),
          },
        ]}
        rows={plans.map((plan) => ({
          id: plan.id,
          name: plan.name,
          price: `$${(plan.monthly_price_cents / 100).toFixed(0)}/mo`,
          credits: plan.monthly_credits,
          action: "",
        }))}
      />
    </>
  );
}
