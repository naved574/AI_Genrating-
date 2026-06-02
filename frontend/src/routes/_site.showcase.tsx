import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/pages/site/Showcase";

export const Route = createFileRoute("/_site/showcase")({
  head: () => ({ meta: [{ title: "Showcase — Luminal" }, { name: "description", content: "Hand-picked work from the community." }] }),
  component: Showcase,
});
