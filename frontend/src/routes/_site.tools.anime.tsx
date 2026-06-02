import { createFileRoute } from "@tanstack/react-router";
import { Anime } from "@/pages/site/tools/Anime";

export const Route = createFileRoute("/_site/tools/anime")({
  head: () => ({ meta: [{ title: "Anime — Luminal" }, { name: "description", content: "The anime tool, powered by Luminal." }] }),
  component: Anime,
});
