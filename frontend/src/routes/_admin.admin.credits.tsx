import { createFileRoute } from "@tanstack/react-router";
import { AdminCredits } from "@/pages/admin/AdminCredits";

export const Route = createFileRoute("/_admin/admin/credits")({
  head: () => ({ meta: [{ title: "Credits control — Luminal" }, { name: "description", content: "Grant, deduct, and audit credit balances." }] }),
  component: AdminCredits,
});
