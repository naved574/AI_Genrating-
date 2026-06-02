import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter } from "lucide-react";

const groups = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/models", label: "Models" },
      { to: "/pricing", label: "Pricing" },
      { to: "/changelog", label: "Changelog" },
      { to: "/roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/blogs", label: "Blog" },
      { to: "/documentation", label: "Documentation" },
      { to: "/tutorials", label: "Tutorials" },
      { to: "/prompt-library", label: "Prompt library" },
      { to: "/help", label: "Help center" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/press-kit", label: "Press kit" },
      { to: "/contact", label: "Contact" },
      { to: "/status", label: "Status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
      { to: "/cookies", label: "Cookies" },
      { to: "/dmca", label: "DMCA" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-accent to-primary-muted flex items-center justify-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">LUMINAL</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-[32ch]">Architecting the next generation of visual synthesis tools.</p>
          <div className="flex gap-3">
            <a href="#" className="size-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"><Twitter className="size-4" /></a>
            <a href="#" className="size-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"><Github className="size-4" /></a>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title} className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{g.title}</p>
            <ul className="space-y-2 text-sm">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© 2026 Luminal Labs. All rights reserved.</p>
          <p className="uppercase tracking-widest">System status: operational</p>
        </div>
      </div>
    </footer>
  );
}
