import { createFileRoute } from "@tanstack/react-router";
import { Billing } from "@/pages/dashboard/Billing";

export const Route = createFileRoute("/_dash/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — Luminal" }, { name: "description", content: "Plan, invoices, and payment method." }] }),
  component: Billing,
});
