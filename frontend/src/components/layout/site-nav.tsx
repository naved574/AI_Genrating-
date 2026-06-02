import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { to: "/explore", label: "Showcase" },
  { to: "/models", label: "Models" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blogs", label: "Blog" },
  { to: "/api-access", label: "API" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-accent to-primary-muted flex items-center justify-center">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-lg">LUMINAL</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition-colors">
            Login
          </Link>
          <Link to="/dashboard" className="px-4 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
