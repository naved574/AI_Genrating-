import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockAdminUsers } from "@/data/mock";

export function AdminUsers() {
  return (
    <>
      <AdminPageHeader title="User management" description="Search, edit, and act on user accounts." />
      <AdminTable columns={[{ key: "id", label: "ID" }, { key: "email", label: "Email" }, { key: "plan", label: "Plan" }, { key: "credits", label: "Credits" }, { key: "status", label: "Status" }]} rows={mockAdminUsers} />
    </>
  );
}
