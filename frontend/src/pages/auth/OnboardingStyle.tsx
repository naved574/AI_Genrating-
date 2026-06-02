import { OnboardingStep, OptionCard } from "@/components/sections";

export function OnboardingStyle() {
  return (
    <OnboardingStep
      step={2}
      total={5}
      title="Pick a style"
      
      next={{ to: "/onboarding/categories", label: "Continue" }}
    >
      {[].length === 0 && null}
              <OptionCard title="Photoreal" description="Cinematic, editorial, lifelike" />
        <OptionCard title="Illustration" description="Painterly, concept art" />
        <OptionCard title="Anime" description="Manga and anime aesthetics" />
        <OptionCard title="Abstract" description="Generative, experimental" />
    </OnboardingStep>
  );
}
