import { createFileRoute } from "@tanstack/react-router";
import { Interior } from "@/pages/site/tools/Interior";

export const Route = createFileRoute("/_site/tools/interior")({
  head: () => ({ meta: [{ title: "Interior design — Luminal" }, { name: "description", content: "The interior design tool, powered by Luminal." }] }),
  component: Interior,
});
