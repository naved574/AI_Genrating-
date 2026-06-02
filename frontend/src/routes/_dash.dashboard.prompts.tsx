import { createFileRoute } from "@tanstack/react-router";
import { Prompts } from "@/pages/dashboard/Prompts";

export const Route = createFileRoute("/_dash/dashboard/prompts")({
  head: () => ({ meta: [{ title: "Prompts — Luminal" }, { name: "description", content: "Saved prompts and presets." }] }),
  component: Prompts,
});
