import { createFileRoute } from "@tanstack/react-router";
import { Roadmap } from "@/pages/site/Roadmap";

export const Route = createFileRoute("/_site/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Luminal" }, { name: "description", content: "What we're building next." }] }),
  component: Roadmap,
});
