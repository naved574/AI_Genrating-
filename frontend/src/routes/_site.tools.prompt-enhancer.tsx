import { createFileRoute } from "@tanstack/react-router";
import { PromptEnhancer } from "@/pages/site/tools/PromptEnhancer";

export const Route = createFileRoute("/_site/tools/prompt-enhancer")({
  head: () => ({ meta: [{ title: "Prompt enhancer — Luminal" }, { name: "description", content: "The prompt enhancer tool, powered by Luminal." }] }),
  component: PromptEnhancer,
});
