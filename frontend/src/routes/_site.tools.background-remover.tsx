import { createFileRoute } from "@tanstack/react-router";
import { BackgroundRemover } from "@/pages/site/tools/BackgroundRemover";

export const Route = createFileRoute("/_site/tools/background-remover")({
  head: () => ({ meta: [{ title: "Background remover — Luminal" }, { name: "description", content: "The background remover tool, powered by Luminal." }] }),
  component: BackgroundRemover,
});
