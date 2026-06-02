import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";

export const Route = createFileRoute("/_site")({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1"><Outlet /></main>
      <SiteFooter />
    </div>
  ),
});
