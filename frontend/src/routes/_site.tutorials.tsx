import { createFileRoute } from "@tanstack/react-router";
import { Tutorials } from "@/pages/site/Tutorials";

export const Route = createFileRoute("/_site/tutorials")({
  head: () => ({ meta: [{ title: "Tutorials — Luminal" }, { name: "description", content: "Step-by-step guides for every Luminal surface." }] }),
  component: Tutorials,
});
