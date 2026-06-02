import { MarketingHero, FeatureGrid, CTASection } from "@/components/sections";
import { Layers, Sparkles, Zap } from "lucide-react";

export function Pricing() {
  return (
    <>
      <MarketingHero
        
        category="Pricing"
        title="Pricing"
        description="Simple plans built for individuals, teams, and enterprises."
        primaryCta={{ to: "/dashboard/generate", label: "Try it" }}
        secondaryCta={{ to: "/pricing", label: "See pricing" }}
      />
      <FeatureGrid
        features={[
          { icon: Sparkles, t: "Polished by default", d: "Everything in Pricing comes pre-tuned for studio-quality output." },
          { icon: Zap, t: "Fast iteration", d: "Under 4 seconds per batch. Iterate at the speed of thought." },
          { icon: Layers, t: "Multi-modal", d: "Mix text, images, and references for granular control." },
        ]}
      />
      <CTASection />
    </>
  );
}
