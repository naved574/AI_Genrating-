import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function VerifyEmail() {
  return (
    <AuthForm
      title="Verify email"
      subtitle="Check your inbox for a confirmation link."
      footer={<AuthFooterLink prefix="Wrong email?" label="Sign up again" to="/register" />}
    >

      <AuthSubmit>Resend email</AuthSubmit>
    </AuthForm>
  );
}
