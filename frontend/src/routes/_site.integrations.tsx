import { createFileRoute } from "@tanstack/react-router";
import { Integrations } from "@/pages/site/Integrations";

export const Route = createFileRoute("/_site/integrations")({
  head: () => ({ meta: [{ title: "Integrations — Luminal" }, { name: "description", content: "Figma, Slack, Notion, Zapier, and more." }] }),
  component: Integrations,
});
