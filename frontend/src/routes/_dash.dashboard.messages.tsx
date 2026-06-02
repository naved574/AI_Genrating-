import { createFileRoute } from "@tanstack/react-router";
import { Messages } from "@/pages/dashboard/Messages";

export const Route = createFileRoute("/_dash/dashboard/messages")({
  head: () => ({ meta: [{ title: "Messages — Luminal" }, { name: "description", content: "Conversations with collaborators." }] }),
  component: Messages,
});
