import { createFileRoute } from "@tanstack/react-router";
import { AdminModeration } from "@/pages/admin/AdminModeration";

export const Route = createFileRoute("/_admin/admin/moderation")({
  head: () => ({ meta: [{ title: "Image moderation — Luminal" }, { name: "description", content: "Queue of items pending review." }] }),
  component: AdminModeration,
});
