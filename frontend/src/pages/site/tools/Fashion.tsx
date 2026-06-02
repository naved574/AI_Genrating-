import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Fashion() {
  const tool = mockTools.find((t) => t.slug === "fashion")!;
  return <ToolLanding tool={tool} />;
}
