import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/pages/site/Contact";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({ meta: [{ title: "Contact — Luminal" }, { name: "description", content: "Talk to a human. We answer fast." }] }),
  component: Contact,
});
