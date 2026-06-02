import { createFileRoute } from "@tanstack/react-router";
import { Following } from "@/pages/dashboard/Following";

export const Route = createFileRoute("/_dash/dashboard/following")({
  head: () => ({ meta: [{ title: "Following — Luminal" }, { name: "description", content: "Creators you follow." }] }),
  component: Following,
});
