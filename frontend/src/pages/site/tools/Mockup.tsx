import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Mockup() {
  const tool = mockTools.find((t) => t.slug === "mockup")!;
  return <ToolLanding tool={tool} />;
}
