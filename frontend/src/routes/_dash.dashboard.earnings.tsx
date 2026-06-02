import { createFileRoute } from "@tanstack/react-router";
import { Earnings } from "@/pages/dashboard/Earnings";

export const Route = createFileRoute("/_dash/dashboard/earnings")({
  head: () => ({ meta: [{ title: "Earnings — Luminal" }, { name: "description", content: "Creator Program and referral payouts." }] }),
  component: Earnings,
});
