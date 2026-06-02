import { createFileRoute } from "@tanstack/react-router";
import { Leaderboard } from "@/pages/site/Leaderboard";

export const Route = createFileRoute("/_site/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — Luminal" }, { name: "description", content: "Top creators this month." }] }),
  component: Leaderboard,
});
