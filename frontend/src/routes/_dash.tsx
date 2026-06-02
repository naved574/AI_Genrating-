import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export const Route = createFileRoute("/_dash")({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <DashboardTopbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0"><Outlet /></main>
      </div>
      <MobileBottomNav />
    </div>
  ),
});
