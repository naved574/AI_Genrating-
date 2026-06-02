import { createFileRoute } from "@tanstack/react-router";
import { CreatorProgram } from "@/pages/site/CreatorProgram";

export const Route = createFileRoute("/_site/creator-program")({
  head: () => ({ meta: [{ title: "Creator Program — Luminal" }, { name: "description", content: "For ambitious creators shipping with Luminal." }] }),
  component: CreatorProgram,
});
