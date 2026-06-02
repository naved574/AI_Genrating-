import { createFileRoute } from "@tanstack/react-router";
import { DashCommunity } from "@/pages/dashboard/DashCommunity";

export const Route = createFileRoute("/_dash/dashboard/community")({
  head: () => ({ meta: [{ title: "Community — Luminal" }, { name: "description", content: "Channels, challenges, and people." }] }),
  component: DashCommunity,
});
