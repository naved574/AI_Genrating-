import { createFileRoute } from "@tanstack/react-router";
import { AdminUsers } from "@/pages/admin/AdminUsers";

export const Route = createFileRoute("/_admin/admin/users")({
  head: () => ({ meta: [{ title: "User management — Luminal" }, { name: "description", content: "Search, edit, and act on user accounts." }] }),
  component: AdminUsers,
});
