import { createFileRoute } from "@tanstack/react-router";
import { Terms } from "@/pages/site/legal/Terms";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({ meta: [{ title: "Terms — Luminal" }, { name: "description", content: "Terms of service." }] }),
  component: Terms,
});
