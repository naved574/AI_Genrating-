import { createFileRoute } from "@tanstack/react-router";
import { OnboardingFirstPrompt } from "@/pages/auth/OnboardingFirstPrompt";

export const Route = createFileRoute("/_auth/onboarding/first-prompt")({
  head: () => ({ meta: [{ title: "Your first prompt — Luminal" }] }),
  component: OnboardingFirstPrompt,
});
