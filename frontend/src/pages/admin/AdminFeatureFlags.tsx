import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminFeatureFlags() {
  return (
    <>
      <AdminPageHeader title="Feature flags" description="Roll features out by cohort." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
