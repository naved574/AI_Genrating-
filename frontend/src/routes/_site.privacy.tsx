import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/pages/site/legal/Privacy";

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Luminal" }, { name: "description", content: "Our privacy practices." }] }),
  component: Privacy,
});
