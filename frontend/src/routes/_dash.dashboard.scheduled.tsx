import { createFileRoute } from "@tanstack/react-router";
import { Scheduled } from "@/pages/dashboard/Scheduled";

export const Route = createFileRoute("/_dash/dashboard/scheduled")({
  head: () => ({ meta: [{ title: "Scheduled — Luminal" }, { name: "description", content: "Batches set to run later." }] }),
  component: Scheduled,
});
