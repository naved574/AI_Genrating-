import { createFileRoute } from "@tanstack/react-router";
import { AdminModels } from "@/pages/admin/AdminModels";

export const Route = createFileRoute("/_admin/admin/models")({
  head: () => ({ meta: [{ title: "AI models — Luminal" }, { name: "description", content: "Models available on the platform." }] }),
  component: AdminModels,
});
