import { createFileRoute } from "@tanstack/react-router";
import { OnboardingCategories } from "@/pages/auth/OnboardingCategories";

export const Route = createFileRoute("/_auth/onboarding/categories")({
  head: () => ({ meta: [{ title: "Pick categories — Luminal" }] }),
  component: OnboardingCategories,
});
