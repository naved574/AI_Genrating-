import { createFileRoute } from "@tanstack/react-router";
import { VerifyOtp } from "@/pages/auth/VerifyOtp";

export const Route = createFileRoute("/_auth/verify-otp")({
  head: () => ({ meta: [{ title: "Verify code — Luminal" }, { name: "description", content: "Enter the 6-digit code we sent." }] }),
  component: VerifyOtp,
});
