import { createFileRoute } from "@tanstack/react-router";
import { Status } from "@/pages/site/Status";

export const Route = createFileRoute("/_site/status")({
  head: () => ({ meta: [{ title: "Status — Luminal" }, { name: "description", content: "Live system status." }] }),
  component: Status,
});
