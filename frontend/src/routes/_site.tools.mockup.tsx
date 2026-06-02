import { createFileRoute } from "@tanstack/react-router";
import { Mockup } from "@/pages/site/tools/Mockup";

export const Route = createFileRoute("/_site/tools/mockup")({
  head: () => ({ meta: [{ title: "Mockup generator — Luminal" }, { name: "description", content: "The mockup generator tool, powered by Luminal." }] }),
  component: Mockup,
});
