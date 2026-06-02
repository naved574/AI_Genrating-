import { OnboardingStep, OptionCard } from "@/components/sections";

export function OnboardingCategories() {
  return (
    <OnboardingStep
      step={3}
      total={5}
      title="Pick categories"
      
      next={{ to: "/onboarding/interests", label: "Continue" }}
    >
      {[].length === 0 && null}
              <OptionCard title="Marketing creative"  />
        <OptionCard title="Concept art"  />
        <OptionCard title="Product photos"  />
        <OptionCard title="Social content"  />
    </OnboardingStep>
  );
}
