import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function PromptEnhancer() {
  const tool = mockTools.find((t) => t.slug === "prompt-enhancer")!;
  return <ToolLanding tool={tool} />;
}
