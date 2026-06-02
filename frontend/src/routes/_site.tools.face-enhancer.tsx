import { createFileRoute } from "@tanstack/react-router";
import { FaceEnhancer } from "@/pages/site/tools/FaceEnhancer";

export const Route = createFileRoute("/_site/tools/face-enhancer")({
  head: () => ({ meta: [{ title: "Face enhancer — Luminal" }, { name: "description", content: "The face enhancer tool, powered by Luminal." }] }),
  component: FaceEnhancer,
});
