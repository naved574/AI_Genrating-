import { OnboardingStep, OptionCard } from "@/components/sections";

export function OnboardingInterests() {
  return (
    <OnboardingStep
      step={4}
      total={5}
      title="Pick interests"
      
      next={{ to: "/onboarding/first-prompt", label: "Continue" }}
    >
      {[].length === 0 && null}
              <OptionCard title="Architecture"  />
        <OptionCard title="Portraits"  />
        <OptionCard title="Landscapes"  />
        <OptionCard title="Product"  />
        <OptionCard title="Logos & branding"  />
    </OnboardingStep>
  );
}
