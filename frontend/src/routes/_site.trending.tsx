import { createFileRoute } from "@tanstack/react-router";
import { Trending } from "@/pages/site/Trending";

export const Route = createFileRoute("/_site/trending")({
  head: () => ({ meta: [{ title: "Trending — Luminal" }, { name: "description", content: "What's catching fire on Luminal this week." }] }),
  component: Trending,
});
