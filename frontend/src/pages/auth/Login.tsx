import { AuthForm, AuthField, AuthSubmit, AuthFooterLink } from "@/components/sections";

export function Login() {
  return (
    <AuthForm
      title="Login"
      
      footer={<AuthFooterLink prefix="New here?" label="Create account" to="/register" />}
    >
        <AuthField type="email" placeholder="Email" />
        <AuthField type="password" placeholder="Password" />
      <AuthSubmit>Login</AuthSubmit>
    </AuthForm>
  );
}
