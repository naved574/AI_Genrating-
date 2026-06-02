import { createFileRoute } from "@tanstack/react-router";
import { Community } from "@/pages/site/Community";

export const Route = createFileRoute("/_site/community")({
  head: () => ({ meta: [{ title: "Community — Luminal" }, { name: "description", content: "Channels, challenges, and the people who make Luminal." }] }),
  component: Community,
});
