import { createFileRoute } from "@tanstack/react-router";
import { Fashion } from "@/pages/site/tools/Fashion";

export const Route = createFileRoute("/_site/tools/fashion")({
  head: () => ({ meta: [{ title: "Fashion — Luminal" }, { name: "description", content: "The fashion tool, powered by Luminal." }] }),
  component: Fashion,
});
