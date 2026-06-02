import { createFileRoute } from "@tanstack/react-router";
import { Challenges } from "@/pages/site/Challenges";

export const Route = createFileRoute("/_site/challenges")({
  head: () => ({ meta: [{ title: "Challenges — Luminal" }, { name: "description", content: "Weekly themed prompts. Prizes, plus bragging rights." }] }),
  component: Challenges,
});
