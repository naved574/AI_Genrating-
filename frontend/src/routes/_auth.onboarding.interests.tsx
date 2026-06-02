import { createFileRoute } from "@tanstack/react-router";
import { OnboardingInterests } from "@/pages/auth/OnboardingInterests";

export const Route = createFileRoute("/_auth/onboarding/interests")({
  head: () => ({ meta: [{ title: "Pick interests — Luminal" }] }),
  component: OnboardingInterests,
});
