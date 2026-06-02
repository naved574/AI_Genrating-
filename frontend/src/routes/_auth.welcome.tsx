import { createFileRoute } from "@tanstack/react-router";
import { Welcome } from "@/pages/auth/Welcome";

export const Route = createFileRoute("/_auth/welcome")({
  head: () => ({ meta: [{ title: "Welcome — Luminal" }, { name: "description", content: "Glad you're here." }] }),
  component: Welcome,
});
