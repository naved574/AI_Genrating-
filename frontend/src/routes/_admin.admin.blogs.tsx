import { createFileRoute } from "@tanstack/react-router";
import { AdminBlogs } from "@/pages/admin/AdminBlogs";

export const Route = createFileRoute("/_admin/admin/blogs")({
  head: () => ({ meta: [{ title: "Blog management — Luminal" }, { name: "description", content: "Drafts, scheduled posts, and published." }] }),
  component: AdminBlogs,
});
