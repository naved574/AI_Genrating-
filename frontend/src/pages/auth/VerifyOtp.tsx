import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function VerifyOtp() {
  return (
    <AuthForm
      title="Verify code"
      subtitle="Enter the 6-digit code we sent."
      footer={<AuthFooterLink prefix="Didn't get it?" label="Resend" to="/verify-otp" />}
    >
        <AuthField type="text" placeholder="______" />
      <AuthSubmit>Verify</AuthSubmit>
    </AuthForm>
  );
}
