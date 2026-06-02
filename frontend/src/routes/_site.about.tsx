import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/pages/site/About";

export const Route = createFileRoute("/_site/about")({
  head: () => ({ meta: [{ title: "About — Luminal" }, { name: "description", content: "Our mission, team, and story." }] }),
  component: About,
});
