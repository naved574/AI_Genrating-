import { createFileRoute } from "@tanstack/react-router";
import { Models } from "@/pages/site/Models";

export const Route = createFileRoute("/_site/models")({
  head: () => ({ meta: [{ title: "Models — Luminal" }, { name: "description", content: "A model for every aesthetic." }] }),
  component: Models,
});
