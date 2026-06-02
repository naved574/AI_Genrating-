import { createFileRoute } from "@tanstack/react-router";
import { Team } from "@/pages/dashboard/Team";

export const Route = createFileRoute("/_dash/dashboard/team")({
  head: () => ({ meta: [{ title: "Team — Luminal" }, { name: "description", content: "Members, roles, and invites." }] }),
  component: Team,
});
