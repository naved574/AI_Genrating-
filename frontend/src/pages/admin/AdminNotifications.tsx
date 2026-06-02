import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminNotifications() {
  return (
    <>
      <AdminPageHeader title="Notifications" description="Outbound notifications and templates." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
