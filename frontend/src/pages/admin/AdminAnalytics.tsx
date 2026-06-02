import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminAnalytics() {
  return (
    <>
      <AdminPageHeader title="Analytics" description="Platform-wide usage and growth." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
