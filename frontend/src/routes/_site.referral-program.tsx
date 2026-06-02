import { createFileRoute } from "@tanstack/react-router";
import { ReferralProgram } from "@/pages/site/ReferralProgram";

export const Route = createFileRoute("/_site/referral-program")({
  head: () => ({ meta: [{ title: "Referral program — Luminal" }, { name: "description", content: "Earn credits when friends join." }] }),
  component: ReferralProgram,
});
