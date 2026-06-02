import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/pages/auth/Login";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({ meta: [{ title: "Login — Luminal" }] }),
  component: Login,
});
