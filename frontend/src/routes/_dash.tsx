import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { useAuth } from "@/store/auth";

function DashboardLayout() {
  const navigate = useNavigate();
  const { initialize, isAuthed, loading } = useAuth();

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    if (!loading && !isAuthed) void navigate({ to: "/login" });
  }, [isAuthed, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardTopbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export const Route = createFileRoute("/_dash")({
  component: DashboardLayout,
});
