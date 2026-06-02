import { createFileRoute } from "@tanstack/react-router";
import { ApiAccess } from "@/pages/site/ApiAccess";

export const Route = createFileRoute("/_site/api-access")({
  head: () => ({ meta: [{ title: "API Access — Luminal" }, { name: "description", content: "REST + Node SDK with the same model lineup." }] }),
  component: ApiAccess,
});
