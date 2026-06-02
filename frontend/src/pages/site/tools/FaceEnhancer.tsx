import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function FaceEnhancer() {
  const tool = mockTools.find((t) => t.slug === "face-enhancer")!;
  return <ToolLanding tool={tool} />;
}
