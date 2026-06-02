import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function BackgroundRemover() {
  const tool = mockTools.find((t) => t.slug === "background-remover")!;
  return <ToolLanding tool={tool} />;
}
