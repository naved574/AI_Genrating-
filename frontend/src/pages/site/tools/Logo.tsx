import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Logo() {
  const tool = mockTools.find((t) => t.slug === "logo")!;
  return <ToolLanding tool={tool} />;
}
