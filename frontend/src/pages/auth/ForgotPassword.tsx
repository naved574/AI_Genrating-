import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function ForgotPassword() {
  return (
    <AuthForm
      title="Forgot password"
      subtitle="We'll email you a reset link."
      footer={<AuthFooterLink prefix="Remembered it?" label="Back to login" to="/login" />}
    >
        <AuthField type="email" placeholder="Email" />
      <AuthSubmit>Send reset link</AuthSubmit>
    </AuthForm>
  );
}
