import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Sparkles, ImageIcon, Users, Settings } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/generate", label: "Generate", icon: Sparkles, primary: true },
  { to: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/dashboard/community", label: "Feed", icon: Users },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <ul className="grid grid-cols-5 h-16">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          if (it.primary) {
            return (
              <li key={it.to} className="relative -mt-6 flex justify-center">
                <Link to={it.to} className="size-14 rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center shadow-lg shadow-accent/40 animate-pulse-glow">
                  <it.icon className="size-5" />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.to}>
              <Link to={it.to} className={`h-full flex flex-col items-center justify-center gap-0.5 text-[10px] ${active ? "text-accent" : "text-muted-foreground"}`}>
                <it.icon className="size-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
