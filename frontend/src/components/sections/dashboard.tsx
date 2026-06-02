import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function DashPageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { to?: string; label: string }[];
  actions?: ReactNode;
}) {
  return (
    <header className="px-6 md:px-8 pt-8 pb-6 border-b border-border">
      {breadcrumbs && (
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="size-3" />
              {b.to ? <Link to={b.to} className="hover:text-foreground">{b.label}</Link> : <span className="text-foreground">{b.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{description}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function DashStatTiles({ stats }: { stats: { label: string; value: string; sub?: string; trend?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-8 py-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.04 * i }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
          <p className="text-2xl font-bold tracking-tight mt-2">{s.value}</p>
          <div className="flex items-baseline justify-between mt-1">
            {s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}
            {s.trend && <span className="text-xs text-accent font-semibold">{s.trend}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DashCardGrid({
  cards,
}: {
  cards: { icon?: LucideIcon; title: string; body: string; to?: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-8 py-6">
      {cards.map((c, i) => {
        const Inner = (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.03 * i }}
            className="rounded-2xl border border-border bg-card p-5 hover:border-accent/40 transition-colors h-full"
          >
            {c.icon && (
              <div className="size-9 rounded-lg bg-muted border border-border flex items-center justify-center text-accent mb-3">
                <c.icon className="size-4" />
              </div>
            )}
            <h3 className="font-bold mb-1.5">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </motion.div>
        );
        return c.to ? (
          <Link key={c.title} to={c.to}>{Inner}</Link>
        ) : (
          <div key={c.title}>{Inner}</div>
        );
      })}
    </div>
  );
}

export function DashTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyLabel = "No rows",
}: {
  columns: { key: keyof T & string; label: string; render?: (row: T) => ReactNode }[];
  rows: T[];
  emptyLabel?: string;
}) {
  return (
    <div className="px-6 md:px-8 py-6">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      {c.render ? c.render(r) : String(r[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="px-6 md:px-8 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}
