import { createFileRoute } from "@tanstack/react-router";
import { BrandKit } from "@/pages/dashboard/BrandKit";

export const Route = createFileRoute("/_dash/dashboard/brand-kit")({
  head: () => ({ meta: [{ title: "Brand kit — Luminal" }, { name: "description", content: "Colors, fonts, and reference images that auto-attach." }] }),
  component: BrandKit,
});
