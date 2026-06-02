import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/pages/dashboard/Settings";

export const Route = createFileRoute("/_dash/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — Luminal" }, { name: "description", content: "Account preferences." }] }),
  component: Settings,
});
