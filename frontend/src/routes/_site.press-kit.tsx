import { createFileRoute } from "@tanstack/react-router";
import { PressKit } from "@/pages/site/PressKit";

export const Route = createFileRoute("/_site/press-kit")({
  head: () => ({ meta: [{ title: "Press kit — Luminal" }, { name: "description", content: "Logos, screenshots, and brand guidelines." }] }),
  component: PressKit,
});
