import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function ResetPassword() {
  return (
    <AuthForm
      title="Reset password"
      subtitle="Pick a new password."
      footer={<AuthFooterLink prefix="Done?" label="Back to login" to="/login" />}
    >
        <AuthField type="password" placeholder="New password" />
        <AuthField type="password" placeholder="Confirm password" />
      <AuthSubmit>Reset password</AuthSubmit>
    </AuthForm>
  );
}
