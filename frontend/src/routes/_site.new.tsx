import { createFileRoute } from "@tanstack/react-router";
import { New } from "@/pages/site/New";

export const Route = createFileRoute("/_site/new")({
  head: () => ({ meta: [{ title: "New — Luminal" }, { name: "description", content: "What's new this week on Luminal." }] }),
  component: New,
});
