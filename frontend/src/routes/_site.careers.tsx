import { createFileRoute } from "@tanstack/react-router";
import { Careers } from "@/pages/site/Careers";

export const Route = createFileRoute("/_site/careers")({
  head: () => ({ meta: [{ title: "Careers — Luminal" }, { name: "description", content: "Build the tools that creators dream with." }] }),
  component: Careers,
});
