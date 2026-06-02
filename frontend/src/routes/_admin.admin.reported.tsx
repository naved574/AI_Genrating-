import { createFileRoute } from "@tanstack/react-router";
import { AdminReported } from "@/pages/admin/AdminReported";

export const Route = createFileRoute("/_admin/admin/reported")({
  head: () => ({ meta: [{ title: "Reported content — Luminal" }, { name: "description", content: "User-reported images and posts." }] }),
  component: AdminReported,
});
