import { createFileRoute } from "@tanstack/react-router";
import { AiTools } from "@/pages/dashboard/AiTools";

export const Route = createFileRoute("/_dash/dashboard/ai-tools")({
  head: () => ({ meta: [{ title: "AI Tools — Luminal" }, { name: "description", content: "Sixteen specialized tools, one credit each." }] }),
  component: AiTools,
});
