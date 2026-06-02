import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Sparkles, Image as ImageIcon, FolderHeart, Bookmark, History, Download,
  Upload, Calendar, Users, Bell, MessageSquare, BarChart3, DollarSign, Gift, CreditCard,
  Key, Briefcase, Palette, Wrench, Settings, User, Compass,
} from "lucide-react";

const sections = [
  {
    title: "Workspace",
    items: [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
      { to: "/dashboard/generate", label: "Generate", icon: Sparkles },
      { to: "/dashboard/canvas", label: "AI Canvas", icon: Palette },
      { to: "/dashboard/gallery", label: "My Gallery", icon: ImageIcon },
      { to: "/dashboard/public-gallery", label: "Public Gallery", icon: Compass },
    ],
  },
  {
    title: "Library",
    items: [
      { to: "/dashboard/collections", label: "Collections", icon: FolderHeart },
      { to: "/dashboard/favorites", label: "Favorites", icon: Bookmark },
      { to: "/dashboard/prompts", label: "Saved prompts", icon: Bookmark },
      { to: "/dashboard/history", label: "Prompt history", icon: History },
      { to: "/dashboard/downloads", label: "Downloads", icon: Download },
      { to: "/dashboard/uploads", label: "Uploads", icon: Upload },
      { to: "/dashboard/scheduled", label: "Scheduled", icon: Calendar },
    ],
  },
  {
    title: "Community",
    items: [
      { to: "/dashboard/community", label: "Community feed", icon: Users },
      { to: "/dashboard/following", label: "Following", icon: Users },
      { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
      { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    title: "Business",
    items: [
      { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
      { to: "/dashboard/referrals", label: "Referrals", icon: Gift },
      { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { to: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
      { to: "/dashboard/credits", label: "Credits", icon: DollarSign },
      { to: "/dashboard/api-keys", label: "API keys", icon: Key },
      { to: "/dashboard/team", label: "Team", icon: Users },
      { to: "/dashboard/brand-kit", label: "Brand kit", icon: Briefcase },
      { to: "/dashboard/ai-tools", label: "AI tools", icon: Wrench },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/dashboard/settings", label: "Settings", icon: Settings },
      { to: "/dashboard/profile", label: "Profile", icon: User },
    ],
  },
];

export function DashboardSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 border-r border-sidebar-border bg-sidebar flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div className="p-4 space-y-6 flex-1">
        {sections.map((s) => (
          <div key={s.title}>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 mb-2">{s.title}</p>
            <ul className="space-y-0.5">
              {s.items.map((it) => {
                const active = it.exact ? path === it.to : path === it.to || path.startsWith(it.to + "/");
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                        active ? "bg-accent/15 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <it.icon className="size-4" />
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
