import { createFileRoute } from "@tanstack/react-router";
import { Recover } from "@/pages/auth/Recover";

export const Route = createFileRoute("/_auth/recover")({
  head: () => ({ meta: [{ title: "Recover account — Luminal" }, { name: "description", content: "Recover access to your account." }] }),
  component: Recover,
});
