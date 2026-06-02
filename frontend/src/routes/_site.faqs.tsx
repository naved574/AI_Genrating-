import { createFileRoute } from "@tanstack/react-router";
import { Faqs } from "@/pages/site/Faqs";

export const Route = createFileRoute("/_site/faqs")({
  head: () => ({ meta: [{ title: "FAQs — Luminal" }, { name: "description", content: "Answers to the questions we hear most." }] }),
  component: Faqs,
});
