import { MarketingHero, FeatureGrid, CTASection } from "@/components/sections";
import { Layers, Sparkles, Zap } from "lucide-react";

export function New() {
  return (
    <>
      <MarketingHero
        badge="Just shipped"
        category="What's new"
        title="New"
        description="What's new this week on Luminal."
        primaryCta={{ to: "/dashboard/generate", label: "Try it" }}
        secondaryCta={{ to: "/pricing", label: "See pricing" }}
      />
      <FeatureGrid
        features={[
          { icon: Sparkles, t: "Polished by default", d: "Everything in New comes pre-tuned for studio-quality output." },
          { icon: Zap, t: "Fast iteration", d: "Under 4 seconds per batch. Iterate at the speed of thought." },
          { icon: Layers, t: "Multi-modal", d: "Mix text, images, and references for granular control." },
        ]}
      />
      <CTASection />
    </>
  );
}
