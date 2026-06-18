import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { useAuth } from "@/store/auth";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Flag,
  FileText,
  BarChart3,
  DollarSign,
  Coins,
  Bell,
  Flag as FlagIcon,
  Cpu,
  CreditCard,
  Megaphone,
  Settings,
} from "lucide-react";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/moderation", label: "Image moderation", icon: ImageIcon },
  { to: "/admin/reported", label: "Reported content", icon: Flag },
  { to: "/admin/blogs", label: "Blog management", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/revenue", label: "Revenue", icon: DollarSign },
  { to: "/admin/credits", label: "Credits control", icon: Coins },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/feature-flags", label: "Feature flags", icon: FlagIcon },
  { to: "/admin/models", label: "AI models", icon: Cpu },
  { to: "/admin/plans", label: "Plans", icon: CreditCard },
  { to: "/admin/banners", label: "Banners", icon: Megaphone },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-60 shrink-0 border-r border-sidebar-border bg-sidebar flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div className="p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-2 mb-2">
          Admin
        </p>
        {items.map((it) => {
          const active = it.exact ? path === it.to : path === it.to || path.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${active ? "bg-accent/15 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"}`}
            >
              <it.icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { initialize, isAuthed, loading, user } = useAuth();

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    if (loading) return;
    if (!isAuthed) void navigate({ to: "/login" });
    if (isAuthed && user?.role !== "admin") void navigate({ to: "/dashboard" });
  }, [isAuthed, loading, navigate, user?.role]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardTopbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
