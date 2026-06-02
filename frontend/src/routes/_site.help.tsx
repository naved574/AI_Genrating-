import { createFileRoute } from "@tanstack/react-router";
import { Help } from "@/pages/site/Help";

export const Route = createFileRoute("/_site/help")({
  head: () => ({ meta: [{ title: "Help center — Luminal" }, { name: "description", content: "Guides and support, organized by what you're trying to do." }] }),
  component: Help,
});
