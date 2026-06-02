import { createFileRoute } from "@tanstack/react-router";
import { AffiliateProgram } from "@/pages/site/AffiliateProgram";

export const Route = createFileRoute("/_site/affiliate-program")({
  head: () => ({ meta: [{ title: "Affiliate Program — Luminal" }, { name: "description", content: "Earn 30% recurring on every referral." }] }),
  component: AffiliateProgram,
});
