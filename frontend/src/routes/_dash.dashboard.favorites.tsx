import { createFileRoute } from "@tanstack/react-router";
import { Favorites } from "@/pages/dashboard/Favorites";

export const Route = createFileRoute("/_dash/dashboard/favorites")({
  head: () => ({ meta: [{ title: "Favorites — Luminal" }, { name: "description", content: "Images you've starred." }] }),
  component: Favorites,
});
