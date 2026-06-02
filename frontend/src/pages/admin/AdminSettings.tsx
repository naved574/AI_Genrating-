import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminSettings() {
  return (
    <>
      <AdminPageHeader title="Settings" description="Platform configuration." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
