import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function Register() {
  return (
    <AuthForm
      title="Create account"
      
      footer={<AuthFooterLink prefix="Already have an account?" label="Login" to="/login" />}
    >
        <AuthField type="email" placeholder="Email" />
        <AuthField type="password" placeholder="Password" />
        <AuthField type="password" placeholder="Confirm password" />
      <AuthSubmit>Create account</AuthSubmit>
    </AuthForm>
  );
}
