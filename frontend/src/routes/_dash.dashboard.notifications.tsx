import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/pages/dashboard/Notifications";

export const Route = createFileRoute("/_dash/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Luminal" }, { name: "description", content: "Comments, mentions, system updates." }] }),
  component: Notifications,
});
