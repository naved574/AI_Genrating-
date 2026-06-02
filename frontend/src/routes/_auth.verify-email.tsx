import { createFileRoute } from "@tanstack/react-router";
import { VerifyEmail } from "@/pages/auth/VerifyEmail";

export const Route = createFileRoute("/_auth/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — Luminal" }, { name: "description", content: "Check your inbox for a confirmation link." }] }),
  component: VerifyEmail,
});
