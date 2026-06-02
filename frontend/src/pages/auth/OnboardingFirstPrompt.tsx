import { OnboardingStep, OptionCard } from "@/components/sections";

export function OnboardingFirstPrompt() {
  return (
    <OnboardingStep
      step={5}
      total={5}
      title="Your first prompt"
      
      next={{ to: "/dashboard", label: "Enter Luminal" }}
    >
      <textarea placeholder="A cinematic cyberpunk city shrouded in neon fog..." rows={4} className="w-full p-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-accent resize-none" />
    </OnboardingStep>
  );
}
