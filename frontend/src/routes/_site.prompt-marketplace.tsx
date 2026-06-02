import { createFileRoute } from "@tanstack/react-router";
import { PromptMarketplace } from "@/pages/site/PromptMarketplace";

export const Route = createFileRoute("/_site/prompt-marketplace")({
  head: () => ({ meta: [{ title: "Prompt marketplace — Luminal" }, { name: "description", content: "Buy and sell battle-tested prompts." }] }),
  component: PromptMarketplace,
});
