import { createFileRoute } from "@tanstack/react-router";
import { AdminFeatureFlags } from "@/pages/admin/AdminFeatureFlags";

export const Route = createFileRoute("/_admin/admin/feature-flags")({
  head: () => ({ meta: [{ title: "Feature flags — Luminal" }, { name: "description", content: "Roll features out by cohort." }] }),
  component: AdminFeatureFlags,
});
