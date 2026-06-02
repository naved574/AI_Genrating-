import { createFileRoute } from "@tanstack/react-router";
import { ApiKeys } from "@/pages/dashboard/ApiKeys";

export const Route = createFileRoute("/_dash/dashboard/api-keys")({
  head: () => ({ meta: [{ title: "API keys — Luminal" }, { name: "description", content: "Manage keys for the Luminal API." }] }),
  component: ApiKeys,
});
