import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockModeration } from "@/data/mock";

export function AdminReported() {
  return (
    <>
      <AdminPageHeader title="Reported content" description="User-reported images and posts." />
      <AdminTable columns={[{ key: "id", label: "ID" }, { key: "image", label: "Image", render: (r) => <img src={r.image} alt="" className="size-10 rounded object-cover" /> }, { key: "reporter", label: "Reporter" }, { key: "reason", label: "Reason" }, { key: "reportedAt", label: "Reported" }]} rows={mockModeration} />
    </>
  );
}
