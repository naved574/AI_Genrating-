import { createFileRoute } from "@tanstack/react-router";
import { Documentation } from "@/pages/site/Documentation";

export const Route = createFileRoute("/_site/documentation")({
  head: () => ({ meta: [{ title: "Documentation — Luminal" }, { name: "description", content: "Reference docs for the Luminal platform." }] }),
  component: Documentation,
});
