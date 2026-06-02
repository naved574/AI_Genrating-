import { ToolLanding } from "@/components/sections";
import { mockTools } from "@/data/mock";

export function Wallpaper() {
  const tool = mockTools.find((t) => t.slug === "wallpaper")!;
  return <ToolLanding tool={tool} />;
}
