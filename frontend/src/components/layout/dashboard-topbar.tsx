import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, Sparkles, Menu } from "lucide-react";
import { useAuth } from "@/store/auth";
import { ThemeToggle } from "./theme-toggle";

export function DashboardTopbar() {
  const user = useAuth((s) => s.user);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const title = path.split("/").filter(Boolean).slice(-1)[0]?.replace(/-/g, " ") || "Dashboard";
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="lg:hidden size-9 rounded-md border border-border flex items-center justify-center"><Menu className="size-4" /></button>
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-accent to-primary-muted flex items-center justify-center"><Sparkles className="size-3.5 text-white" /></div>
            <span className="font-bold tracking-tight">LUMINAL</span>
          </Link>
          <span className="hidden md:inline text-xs text-muted-foreground uppercase tracking-widest ml-3 capitalize">{title}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 max-w-md flex-1 mx-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input placeholder="Search prompts, models, creators…" className="w-full h-9 pl-9 pr-3 rounded-md bg-muted border border-border text-sm focus:outline-none focus:border-accent" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="size-9 rounded-md border border-border flex items-center justify-center relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-accent" />
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-border">
            <span className="text-xs text-muted-foreground">{user?.credits} cr</span>
            <img src={user?.avatar} alt="" className="size-8 rounded-full border border-border" />
          </div>
        </div>
      </div>
    </header>
  );
}
