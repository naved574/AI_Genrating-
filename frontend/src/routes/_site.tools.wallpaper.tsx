import { createFileRoute } from "@tanstack/react-router";
import { Wallpaper } from "@/pages/site/tools/Wallpaper";

export const Route = createFileRoute("/_site/tools/wallpaper")({
  head: () => ({ meta: [{ title: "Wallpaper — Luminal" }, { name: "description", content: "The wallpaper tool, powered by Luminal." }] }),
  component: Wallpaper,
});
