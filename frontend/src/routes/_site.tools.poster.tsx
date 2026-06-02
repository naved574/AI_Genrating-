import { createFileRoute } from "@tanstack/react-router";
import { Poster } from "@/pages/site/tools/Poster";

export const Route = createFileRoute("/_site/tools/poster")({
  head: () => ({ meta: [{ title: "Poster — Luminal" }, { name: "description", content: "The poster tool, powered by Luminal." }] }),
  component: Poster,
});
