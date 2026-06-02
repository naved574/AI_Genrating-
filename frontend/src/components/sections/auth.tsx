import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthForm({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>}
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6 text-xs text-muted-foreground">{footer}</div>}
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-11 px-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:border-accent"
      />
    </label>
  );
}

export function AuthSubmit({ children = "Continue" }: { children?: ReactNode }) {
  return (
    <button type="button" className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity">
      {children}
    </button>
  );
}

export function AuthFooterLink({ to, prefix, label }: { to: string; prefix?: string; label: string }) {
  return (
    <span>
      {prefix} <Link to={to} className="text-accent">{label}</Link>
    </span>
  );
}

export function OnboardingStep({
  step,
  total,
  title,
  description,
  children,
  next,
}: {
  step: number;
  total: number;
  title: string;
  description?: string;
  children?: ReactNode;
  next?: { to: string; label?: string };
}) {
  const pct = Math.round((step / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
        <span>Step {step} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full mb-7 overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && <p className="text-sm text-muted-foreground mb-8">{description}</p>}
      {children && <div className="space-y-3 mb-8">{children}</div>}
      {next && (
        <Link to={next.to} className="block w-full h-11 rounded-lg bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 text-center leading-[2.75rem]">
          {next.label ?? "Continue"}
        </Link>
      )}
    </div>
  );
}

export function OptionCard({
  selected,
  title,
  description,
}: {
  selected?: boolean;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      className={`w-full text-left p-4 rounded-xl border transition-colors ${
        selected ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/40"
      }`}
    >
      <p className="font-semibold text-sm">{title}</p>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </button>
  );
}
