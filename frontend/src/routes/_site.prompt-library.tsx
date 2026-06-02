import { createFileRoute } from "@tanstack/react-router";
import { PromptLibrary } from "@/pages/site/PromptLibrary";

export const Route = createFileRoute("/_site/prompt-library")({
  head: () => ({ meta: [{ title: "Prompt library — Luminal" }, { name: "description", content: "Curated prompts organized by style, subject, and model." }] }),
  component: PromptLibrary,
});
