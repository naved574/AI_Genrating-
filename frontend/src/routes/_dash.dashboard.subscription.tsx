import { createFileRoute } from "@tanstack/react-router";
import { Subscription } from "@/pages/dashboard/Subscription";

export const Route = createFileRoute("/_dash/dashboard/subscription")({
  head: () => ({ meta: [{ title: "Subscription — Luminal" }, { name: "description", content: "Plan and renewal." }] }),
  component: Subscription,
});
