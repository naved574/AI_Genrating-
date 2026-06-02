import { createFileRoute } from "@tanstack/react-router";
import { Uploads } from "@/pages/dashboard/Uploads";

export const Route = createFileRoute("/_dash/dashboard/uploads")({
  head: () => ({ meta: [{ title: "Uploads — Luminal" }, { name: "description", content: "Reference images you've uploaded." }] }),
  component: Uploads,
});
