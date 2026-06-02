import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function Recover() {
  return (
    <AuthForm
      title="Recover account"
      subtitle="Recover access to your account."
      footer={<AuthFooterLink prefix="Need help?" label="Contact support" to="/contact" />}
    >
        <AuthField type="email" placeholder="Email" />
        <AuthField type="text" placeholder="Recovery code" />
      <AuthSubmit>Recover</AuthSubmit>
    </AuthForm>
  );
}
