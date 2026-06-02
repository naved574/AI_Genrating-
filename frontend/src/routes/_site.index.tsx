import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/site/Home";

export const Route = createFileRoute("/_site/")({
  head: () => ({ meta: [{ title: "Luminal — Dream in high definition" }, { name: "description", content: "Studio-grade AI image generation." }] }),
  component: Home,
});
