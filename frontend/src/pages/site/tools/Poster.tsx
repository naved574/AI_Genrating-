import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Poster() {
  const tool = mockTools.find((t) => t.slug === "poster")!;
  return <ToolLanding tool={tool} />;
}
