import { OnboardingStep, OptionCard } from "@/components/sections";

export function OnboardingTheme() {
  return (
    <OnboardingStep
      step={1}
      total={5}
      title="Pick a theme"
      
      next={{ to: "/onboarding/style", label: "Continue" }}
    >
      {[].length === 0 && null}
              <OptionCard title="Dark" description="Precision dark tech (recommended)" />
        <OptionCard title="Light" description="Calm and bright" />
        <OptionCard title="System" description="Match your OS" />
    </OnboardingStep>
  );
}
