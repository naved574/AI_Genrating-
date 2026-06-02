import { createFileRoute } from "@tanstack/react-router";
import { AdminRevenue } from "@/pages/admin/AdminRevenue";

export const Route = createFileRoute("/_admin/admin/revenue")({
  head: () => ({ meta: [{ title: "Revenue — Luminal" }, { name: "description", content: "MRR, ARR, and transactions." }] }),
  component: AdminRevenue,
});
