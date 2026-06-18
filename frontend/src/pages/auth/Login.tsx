import { useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useState } from "react";

import { AuthForm, AuthSubmit, AuthFooterLink } from "@/components/sections";
import { useAuth } from "@/store/auth";

export function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login(email, password);
    await navigate({ to: "/dashboard/generate" });
  }

  return (
    <AuthForm
      title="Login"
      subtitle="Access your creator workspace, credits, and generation history."
      footer={<AuthFooterLink prefix="New here?" label="Create account" to="/register" />}
    >
      <form onSubmit={onSubmit} className="space-y-4">
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
          placeholder="Password"
          className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <AuthSubmit disabled={loading}>{loading ? "Logging in..." : "Login"}</AuthSubmit>
      </form>
    </AuthForm>
  );
}
