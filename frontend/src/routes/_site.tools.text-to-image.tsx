import { createFileRoute } from "@tanstack/react-router";
import { TextToImage } from "@/pages/site/tools/TextToImage";

export const Route = createFileRoute("/_site/tools/text-to-image")({
  head: () => ({ meta: [{ title: "Text to image — Luminal" }, { name: "description", content: "The text to image tool, powered by Luminal." }] }),
  component: TextToImage,
});
