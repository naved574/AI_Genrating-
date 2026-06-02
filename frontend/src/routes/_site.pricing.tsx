import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@/pages/site/Pricing";

export const Route = createFileRoute("/_site/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Luminal" }, { name: "description", content: "Simple plans built for individuals, teams, and enterprises." }] }),
  component: Pricing,
});
