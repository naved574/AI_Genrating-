import { createFileRoute } from "@tanstack/react-router";
import { Avatar } from "@/pages/site/tools/Avatar";

export const Route = createFileRoute("/_site/tools/avatar")({
  head: () => ({ meta: [{ title: "Avatar maker — Luminal" }, { name: "description", content: "The avatar maker tool, powered by Luminal." }] }),
  component: Avatar,
});
