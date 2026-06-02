import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockModeration } from "@/data/mock";

export function AdminModeration() {
  return (
    <>
      <AdminPageHeader title="Image moderation" description="Queue of items pending review." />
      <AdminTable columns={[{ key: "id", label: "ID" }, { key: "image", label: "Image", render: (r) => <img src={r.image} alt="" className="size-10 rounded object-cover" /> }, { key: "reporter", label: "Reporter" }, { key: "reason", label: "Reason" }, { key: "reportedAt", label: "Reported" }]} rows={mockModeration} />
    </>
  );
}
