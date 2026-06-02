import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@/pages/dashboard/Canvas";

export const Route = createFileRoute("/_dash/dashboard/canvas")({
  head: () => ({ meta: [{ title: "Canvas — Luminal" }, { name: "description", content: "An infinite scratchpad for visual ideation." }] }),
  component: Canvas,
});
