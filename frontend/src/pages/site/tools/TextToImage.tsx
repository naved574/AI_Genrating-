import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function TextToImage() {
  const tool = mockTools.find((t) => t.slug === "text-to-image")!;
  return <ToolLanding tool={tool} />;
}
