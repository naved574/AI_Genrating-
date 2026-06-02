import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Anime() {
  const tool = mockTools.find((t) => t.slug === "anime")!;
  return <ToolLanding tool={tool} />;
}
