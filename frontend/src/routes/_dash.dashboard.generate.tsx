import { createFileRoute } from "@tanstack/react-router";
import { Generate } from "@/pages/dashboard/Generate";

export const Route = createFileRoute("/_dash/dashboard/generate")({
  head: () => ({ meta: [{ title: "Generate — Luminal" }] }),
  component: Generate,
});
