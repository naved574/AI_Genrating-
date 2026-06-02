import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/pages/dashboard/Analytics";

export const Route = createFileRoute("/_dash/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Luminal" }, { name: "description", content: "Your usage, broken down." }] }),
  component: Analytics,
});
