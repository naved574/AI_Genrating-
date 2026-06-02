import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/pages/site/Events";

export const Route = createFileRoute("/_site/events")({
  head: () => ({ meta: [{ title: "Events — Luminal" }, { name: "description", content: "Workshops, livestreams, and meetups." }] }),
  component: Events,
});
