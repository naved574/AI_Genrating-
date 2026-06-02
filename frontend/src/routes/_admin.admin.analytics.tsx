import { createFileRoute } from "@tanstack/react-router";
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics";

export const Route = createFileRoute("/_admin/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Luminal" }, { name: "description", content: "Platform-wide usage and growth." }] }),
  component: AdminAnalytics,
});
