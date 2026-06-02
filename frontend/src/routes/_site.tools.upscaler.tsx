import { createFileRoute } from "@tanstack/react-router";
import { Upscaler } from "@/pages/site/tools/Upscaler";

export const Route = createFileRoute("/_site/tools/upscaler")({
  head: () => ({ meta: [{ title: "Upscaler — Luminal" }, { name: "description", content: "The upscaler tool, powered by Luminal." }] }),
  component: Upscaler,
});
