import { createFileRoute } from "@tanstack/react-router";
import { Changelog } from "@/pages/site/Changelog";

export const Route = createFileRoute("/_site/changelog")({
  head: () => ({ meta: [{ title: "Changelog — Luminal" }, { name: "description", content: "Everything we've shipped, week by week." }] }),
  component: Changelog,
});
