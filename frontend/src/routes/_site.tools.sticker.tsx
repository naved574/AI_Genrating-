import { createFileRoute } from "@tanstack/react-router";
import { Sticker } from "@/pages/site/tools/Sticker";

export const Route = createFileRoute("/_site/tools/sticker")({
  head: () => ({ meta: [{ title: "Sticker — Luminal" }, { name: "description", content: "The sticker tool, powered by Luminal." }] }),
  component: Sticker,
});
