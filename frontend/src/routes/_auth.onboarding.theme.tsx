import { createFileRoute } from "@tanstack/react-router";
import { OnboardingTheme } from "@/pages/auth/OnboardingTheme";

export const Route = createFileRoute("/_auth/onboarding/theme")({
  head: () => ({ meta: [{ title: "Pick a theme — Luminal" }] }),
  component: OnboardingTheme,
});
