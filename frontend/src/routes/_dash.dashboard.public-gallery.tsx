import { createFileRoute } from "@tanstack/react-router";
import { PublicGallery } from "@/pages/dashboard/PublicGallery";

export const Route = createFileRoute("/_dash/dashboard/public-gallery")({
  head: () => ({ meta: [{ title: "Public gallery — Luminal" }, { name: "description", content: "Your public work, on your profile." }] }),
  component: PublicGallery,
});
