import { createFileRoute } from "@tanstack/react-router";
import { Credits } from "@/pages/dashboard/Credits";

export const Route = createFileRoute("/_dash/dashboard/credits")({
  head: () => ({ meta: [{ title: "Credits — Luminal" }, { name: "description", content: "Usage and top-ups." }] }),
  component: Credits,
});
