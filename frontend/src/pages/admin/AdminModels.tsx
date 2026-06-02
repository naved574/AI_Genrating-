import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockModels } from "@/data/mock";

export function AdminModels() {
  return (
    <>
      <AdminPageHeader title="AI models" description="Models available on the platform." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "tagline", label: "Tagline" }, { key: "category", label: "Category" }]} rows={mockModels} />
    </>
  );
}
