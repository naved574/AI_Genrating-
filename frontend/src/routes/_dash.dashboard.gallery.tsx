import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/pages/dashboard/Gallery";

export const Route = createFileRoute("/_dash/dashboard/gallery")({
  head: () => ({ meta: [{ title: "My Gallery — Luminal" }, { name: "description", content: "Everything you've generated." }] }),
  component: Gallery,
});
