import { createFileRoute } from "@tanstack/react-router";
import { History } from "@/pages/dashboard/History";

export const Route = createFileRoute("/_dash/dashboard/history")({
  head: () => ({ meta: [{ title: "History — Luminal" }, { name: "description", content: "Every generation, in order." }] }),
  component: History,
});
