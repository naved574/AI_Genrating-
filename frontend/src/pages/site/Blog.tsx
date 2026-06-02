import { Link } from "@tanstack/react-router";
import { mockBlogs } from "@/data/mock";

export function Blog() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-accent mb-2">Writing</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-grad">The Luminal blog</h1>
      <p className="text-muted-foreground max-w-2xl">Guides, engineering notes, and stories from the frontier of generative AI.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {mockBlogs.map((b) => (
          <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/40 transition-colors">
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest text-accent mb-2">{b.category}</p>
              <h3 className="font-bold mb-2 leading-snug">{b.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <img src={b.author.avatar} className="size-6 rounded-full" alt="" />
                <span className="text-xs text-muted-foreground">{b.author.name} · {b.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
