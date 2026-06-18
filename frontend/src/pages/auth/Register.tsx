import { useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useState } from "react";

import { AuthForm, AuthSubmit, AuthFooterLink } from "@/components/sections";
import { useAuth } from "@/store/auth";

export function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    setFormError(null);
    await register(email, password, fullName);
    await navigate({ to: "/onboarding/categories" });
  }

  return (
    <AuthForm
      title="Create account"
      subtitle="Start with free credits, then upgrade when your workflow is humming."
      footer={<AuthFooterLink prefix="Already have an account?" label="Login" to="/login" />}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          type="text"
          placeholder="Display name"
          className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
        />
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          placeholder="Email"
          className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          minLength={8}
          placeholder="Password"
          className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
        />
        <input
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          required
          minLength={8}
          placeholder="Confirm password"
          className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
        />
        {(formError || error) && <p className="text-xs text-destructive">{formError || error}</p>}
        <AuthSubmit disabled={loading}>{loading ? "Creating..." : "Create account"}</AuthSubmit>
      </form>
    </AuthForm>
  );
}
