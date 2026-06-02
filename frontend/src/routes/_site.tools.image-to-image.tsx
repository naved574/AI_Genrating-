import { createFileRoute } from "@tanstack/react-router";
import { ImageToImage } from "@/pages/site/tools/ImageToImage";

export const Route = createFileRoute("/_site/tools/image-to-image")({
  head: () => ({ meta: [{ title: "Image to image — Luminal" }, { name: "description", content: "The image to image tool, powered by Luminal." }] }),
  component: ImageToImage,
});
