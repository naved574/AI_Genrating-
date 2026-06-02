import { createFileRoute } from "@tanstack/react-router";
import { Register } from "@/pages/auth/Register";

export const Route = createFileRoute("/_auth/register")({
  head: () => ({ meta: [{ title: "Create account — Luminal" }] }),
  component: Register,
});
