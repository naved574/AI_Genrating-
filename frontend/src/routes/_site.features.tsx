import { createFileRoute } from "@tanstack/react-router";
import { Features } from "@/pages/site/Features";

export const Route = createFileRoute("/_site/features")({
  head: () => ({ meta: [{ title: "Features — Luminal" }, { name: "description", content: "Everything you need to ship great visuals, fast." }] }),
  component: Features,
});
