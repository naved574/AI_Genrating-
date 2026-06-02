import { createFileRoute } from "@tanstack/react-router";
import { Referrals } from "@/pages/dashboard/Referrals";

export const Route = createFileRoute("/_dash/dashboard/referrals")({
  head: () => ({ meta: [{ title: "Referrals — Luminal" }, { name: "description", content: "Track invites and credits earned." }] }),
  component: Referrals,
});
