import { AdminPageHeader, AdminTable } from "@/components/sections";

export function AdminCredits() {
  return (
    <>
      <AdminPageHeader title="Credits control" description="Grant, deduct, and audit credit balances." />
      <AdminTable columns={[{ key: "name", label: "Name" }, { key: "value", label: "Value" }, { key: "status", label: "Status" }]} rows={[{ name: "Setting A", value: "On", status: "Active" }, { name: "Setting B", value: "Off", status: "Inactive" }]} />
    </>
  );
}
