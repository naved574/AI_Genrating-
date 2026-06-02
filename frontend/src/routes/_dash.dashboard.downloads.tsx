import { createFileRoute } from "@tanstack/react-router";
import { Downloads } from "@/pages/dashboard/Downloads";

export const Route = createFileRoute("/_dash/dashboard/downloads")({
  head: () => ({ meta: [{ title: "Downloads — Luminal" }, { name: "description", content: "Files you've exported." }] }),
  component: Downloads,
});
