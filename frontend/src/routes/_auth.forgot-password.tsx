import { createFileRoute } from "@tanstack/react-router";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";

export const Route = createFileRoute("/_auth/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — Luminal" }, { name: "description", content: "We'll email you a reset link." }] }),
  component: ForgotPassword,
});
