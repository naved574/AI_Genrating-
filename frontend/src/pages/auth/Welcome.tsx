import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function Welcome() {
  return (
    <AuthForm
      title="Welcome"
      subtitle="Glad you're here."
      footer={<AuthFooterLink prefix="Wrong account?" label="Back to login" to="/login" />}
    >
        <AuthField type="text" placeholder="Display name" />
      <AuthSubmit>Continue</AuthSubmit>
    </AuthForm>
  );
}
