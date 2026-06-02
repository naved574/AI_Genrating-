import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Interior() {
  const tool = mockTools.find((t) => t.slug === "interior")!;
  return <ToolLanding tool={tool} />;
}
