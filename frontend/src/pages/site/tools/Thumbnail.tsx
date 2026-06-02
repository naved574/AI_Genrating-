import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Thumbnail() {
  const tool = mockTools.find((t) => t.slug === "thumbnail")!;
  return <ToolLanding tool={tool} />;
}
