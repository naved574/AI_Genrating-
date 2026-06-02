import { createFileRoute } from "@tanstack/react-router";
import { Cookies } from "@/pages/site/legal/Cookies";

export const Route = createFileRoute("/_site/cookies")({
  head: () => ({ meta: [{ title: "Cookies — Luminal" }, { name: "description", content: "How we use cookies." }] }),
  component: Cookies,
});
