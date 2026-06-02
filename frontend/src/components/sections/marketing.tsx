import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { mockPlans } from "@/data/mock";

export function MarketingHero({
  badge,
  category,
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
}: {
  badge?: string;
  category?: string;
  title: string;
  description?: string;
  primaryCta?: { to: string; label: string };
  secondaryCta?: { to: string; label: string };
  visual?: ReactNode;
}) {
  return (
    <section className="pt-20 pb-12 px-4 max-w-5xl mx-auto text-center">
      {badge && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" /> {badge}
        </span>
      )}
      {category && <p className="text-xs uppercase tracking-widest text-accent mb-3">{category}</p>}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-5 text-grad"
      >
        {title}
      </motion.h1>
      {description && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>
      )}
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-wrap gap-3 justify-center mt-9">
          {primaryCta && (
            <Link to={primaryCta.to} className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              {primaryCta.label} <ArrowRight className="size-4" />
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.to} className="border border-border px-6 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-colors">
              {secondaryCta.label}
            </Link>
          )}
        </div>
      )}
      {visual && <div className="mt-12">{visual}</div>}
    </section>
  );
}

export function FeatureGrid({
  category,
  title,
  features,
  columns = 3,
}: {
  category?: string;
  title?: string;
  features: { icon?: LucideIcon; t: string; d: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colCls = columns === 4 ? "md:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 border-t border-border">
      {(category || title) && (
        <div className="text-center mb-14">
          {category && <p className="text-xs uppercase tracking-widest text-accent mb-2">{category}</p>}
          {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
        </div>
      )}
      <div className={`grid gap-5 ${colCls}`}>
        {features.map((f, i) => {
          const Icon = f.icon ?? Sparkles;
          return (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.03 * i }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/40 transition-colors"
            >
              <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center text-accent mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="font-bold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl md:text-4xl font-bold tracking-tight text-grad">{s.value}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LogoCloud({ logos = ["NORTHLIGHT", "VANTA", "HELIX", "OBSIDIAN", "POLARIS", "STRATA"] }: { logos?: string[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-5 text-center">Trusted by teams shipping every day</p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 opacity-60 text-sm font-bold tracking-wider">
        {logos.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </section>
  );
}

export function PricingTable() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockPlans.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border p-6 flex flex-col ${
              p.featured ? "border-accent bg-card relative shadow-[0_0_60px_-20px_var(--accent)]" : "border-border bg-card"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] uppercase tracking-widest bg-accent text-accent-foreground rounded-full font-bold">
                Most popular
              </span>
            )}
            <h3 className="font-bold mb-1">{p.name}</h3>
            <p className="text-xs text-muted-foreground mb-5">{p.tagline}</p>
            <div className="mb-5">
              <span className="text-3xl font-bold tracking-tight">{p.price}</span>
              <span className="text-xs text-muted-foreground ml-1">{p.cadence}</span>
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check className="size-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`w-full h-10 rounded-lg font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-90 ${
                p.featured ? "bg-accent text-accent-foreground" : "border border-border bg-background"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-xs uppercase tracking-widest text-accent mb-2 text-center">Questions</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">Frequently asked</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <details key={it.q} className="group rounded-xl border border-border bg-card p-5 open:border-accent/40 transition-colors">
            <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-sm">
              {it.q}
              <span className="text-accent group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CTASection({
  title = "Ready when you are.",
  description = "Start free. 100 credits, no card required.",
  primary = { to: "/register", label: "Create account" },
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 border-t border-border">
      <div className="rounded-3xl border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary-muted/15" />
        <div className="relative max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="relative flex gap-3 shrink-0">
          <Link to={primary.to} className="bg-accent text-accent-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 inline-flex items-center gap-2">
            {primary.label} <ArrowRight className="size-4" />
          </Link>
          {secondary && (
            <Link to={secondary.to} className="border border-border px-5 py-3 rounded-xl font-bold text-sm hover:bg-muted">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
