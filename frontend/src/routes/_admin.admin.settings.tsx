import { createFileRoute } from "@tanstack/react-router";
import { AdminSettings } from "@/pages/admin/AdminSettings";

export const Route = createFileRoute("/_admin/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Luminal" }, { name: "description", content: "Platform configuration." }] }),
  component: AdminSettings,
});
