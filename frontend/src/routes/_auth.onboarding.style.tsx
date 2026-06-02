import { createFileRoute } from "@tanstack/react-router";
import { OnboardingStyle } from "@/pages/auth/OnboardingStyle";

export const Route = createFileRoute("/_auth/onboarding/style")({
  head: () => ({ meta: [{ title: "Pick a style — Luminal" }] }),
  component: OnboardingStyle,
});
