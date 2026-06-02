import { createFileRoute } from "@tanstack/react-router";
import { Thumbnail } from "@/pages/site/tools/Thumbnail";

export const Route = createFileRoute("/_site/tools/thumbnail")({
  head: () => ({ meta: [{ title: "Thumbnail — Luminal" }, { name: "description", content: "The thumbnail tool, powered by Luminal." }] }),
  component: Thumbnail,
});
