import { createFileRoute } from "@tanstack/react-router";
import { Enterprise } from "@/pages/site/Enterprise";

export const Route = createFileRoute("/_site/enterprise")({
  head: () => ({ meta: [{ title: "Enterprise — Luminal" }, { name: "description", content: "Scale safely with SSO, audit logs, and private fine-tunes." }] }),
  component: Enterprise,
});
