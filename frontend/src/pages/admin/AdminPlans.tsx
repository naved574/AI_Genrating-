import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminPlans() {
  return (
    <>
      <AdminPageHeader title="Subscription plans" description="Tiers, pricing, and features." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
