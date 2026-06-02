import { createFileRoute } from "@tanstack/react-router";
import { Explore } from "@/pages/site/Explore";

export const Route = createFileRoute("/_site/explore")({
  head: () => ({ meta: [{ title: "Explore — Luminal" }, { name: "description", content: "Browse millions of generations from the Luminal community." }] }),
  component: Explore,
});
