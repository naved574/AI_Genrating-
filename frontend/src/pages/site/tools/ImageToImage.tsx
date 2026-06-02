import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function ImageToImage() {
  const tool = mockTools.find((t) => t.slug === "image-to-image")!;
  return <ToolLanding tool={tool} />;
}
