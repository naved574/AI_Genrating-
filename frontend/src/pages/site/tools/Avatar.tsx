import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Avatar() {
  const tool = mockTools.find((t) => t.slug === "avatar")!;
  return <ToolLanding tool={tool} />;
}
