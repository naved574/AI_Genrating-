import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Upscaler() {
  const tool = mockTools.find((t) => t.slug === "upscaler")!;
  return <ToolLanding tool={tool} />;
}
