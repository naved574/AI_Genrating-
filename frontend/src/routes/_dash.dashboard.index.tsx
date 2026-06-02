import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/pages/dashboard/Overview";

export const Route = createFileRoute("/_dash/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — Luminal" }, { name: "description", content: "Your generations, credits, and activity at a glance." }] }),
  component: Overview,
});
