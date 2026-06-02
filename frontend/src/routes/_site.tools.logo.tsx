import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/pages/site/tools/Logo";

export const Route = createFileRoute("/_site/tools/logo")({
  head: () => ({ meta: [{ title: "Logo generator — Luminal" }, { name: "description", content: "The logo generator tool, powered by Luminal." }] }),
  component: Logo,
});
