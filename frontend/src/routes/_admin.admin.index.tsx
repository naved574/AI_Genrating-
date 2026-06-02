import { createFileRoute } from "@tanstack/react-router";
import { AdminOverview } from "@/pages/admin/Overview";

export const Route = createFileRoute("/_admin/admin/")({
  head: () => ({ meta: [{ title: "Admin overview — Luminal" }, { name: "description", content: "Operational dashboard for the Luminal platform." }] }),
  component: AdminOverview,
});
