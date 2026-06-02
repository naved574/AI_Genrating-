import { createFileRoute } from "@tanstack/react-router";
import { Dmca } from "@/pages/site/legal/Dmca";

export const Route = createFileRoute("/_site/dmca")({
  head: () => ({ meta: [{ title: "DMCA — Luminal" }, { name: "description", content: "How to file a takedown notice." }] }),
  component: Dmca,
});
