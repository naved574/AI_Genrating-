import { createFileRoute } from "@tanstack/react-router";
import { ResetPassword } from "@/pages/auth/ResetPassword";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — Luminal" }, { name: "description", content: "Pick a new password." }] }),
  component: ResetPassword,
});
