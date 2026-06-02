import { createFileRoute } from "@tanstack/react-router";
import { AdminBanners } from "@/pages/admin/AdminBanners";

export const Route = createFileRoute("/_admin/admin/banners")({
  head: () => ({ meta: [{ title: "Banner management — Luminal" }, { name: "description", content: "Site-wide announcements." }] }),
  component: AdminBanners,
});
