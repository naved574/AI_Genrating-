import { createFileRoute } from "@tanstack/react-router";
import { AdminPlans } from "@/pages/admin/AdminPlans";

export const Route = createFileRoute("/_admin/admin/plans")({
  head: () => ({ meta: [{ title: "Subscription plans — Luminal" }, { name: "description", content: "Tiers, pricing, and features." }] }),
  component: AdminPlans,
});
