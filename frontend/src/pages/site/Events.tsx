import { MarketingHero, FeatureGrid, CTASection } from "@/components/sections";
import { Layers, Sparkles, Zap } from "lucide-react";

export function Events() {
  return (
    <>
      <MarketingHero
        
        category="Events"
        title="Events"
        description="Workshops, livestreams, and meetups."
        primaryCta={{ to: "/dashboard/generate", label: "Try it" }}
        secondaryCta={{ to: "/pricing", label: "See pricing" }}
      />
      <FeatureGrid
        features={[
          { icon: Sparkles, t: "Polished by default", d: "Everything in Events comes pre-tuned for studio-quality output." },
          { icon: Zap, t: "Fast iteration", d: "Under 4 seconds per batch. Iterate at the speed of thought." },
          { icon: Layers, t: "Multi-modal", d: "Mix text, images, and references for granular control." },
        ]}
      />
      <CTASection />
    </>
  );
}
