import type { ReactNode } from "react";

export type LegalSection = { id: string; heading: string; body: ReactNode };

export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-[200px_1fr] gap-10">
      <aside className="hidden lg:block sticky top-24 self-start">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Contents</p>
        <nav className="space-y-1.5">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="block text-xs text-muted-foreground hover:text-accent transition-colors">
              {s.heading}
            </a>
          ))}
        </nav>
      </aside>
      <article>
        <p className="text-xs uppercase tracking-widest text-accent mb-3">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-grad">{title}</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated {updated}</p>
        {intro && <p className="text-muted-foreground leading-relaxed mb-10">{intro}</p>}
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
