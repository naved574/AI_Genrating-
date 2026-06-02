import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockBlogs } from "@/data/mock";

export function AdminBlogs() {
  return (
    <>
      <AdminPageHeader title="Blog management" description="Drafts, scheduled posts, and published." />
      <AdminTable columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "publishedAt", label: "Published" }, { key: "readTime", label: "Read time" }]} rows={mockBlogs} />
    </>
  );
}
