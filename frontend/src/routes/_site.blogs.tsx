import { createFileRoute } from "@tanstack/react-router";
import { Blog } from "@/pages/site/Blog";

export const Route = createFileRoute("/_site/blogs")({
  head: () => ({ meta: [{ title: "Blog — Luminal" }, { name: "description", content: "Writing on AI, image generation, and the craft of prompting." }] }),
  component: Blog,
});
