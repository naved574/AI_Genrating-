import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Sticker() {
  const tool = mockTools.find((t) => t.slug === "sticker")!;
  return <ToolLanding tool={tool} />;
}
