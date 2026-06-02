import { createFileRoute } from "@tanstack/react-router";
import { Collections } from "@/pages/dashboard/Collections";

export const Route = createFileRoute("/_dash/dashboard/collections")({
  head: () => ({ meta: [{ title: "Collections — Luminal" }, { name: "description", content: "Organize your generations into albums." }] }),
  component: Collections,
});
