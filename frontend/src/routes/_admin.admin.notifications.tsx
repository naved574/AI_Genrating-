import { createFileRoute } from "@tanstack/react-router";
import { AdminNotifications } from "@/pages/admin/AdminNotifications";

export const Route = createFileRoute("/_admin/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Luminal" }, { name: "description", content: "Outbound notifications and templates." }] }),
  component: AdminNotifications,
});
