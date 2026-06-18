import { useEffect } from "react";

import { AdminPageHeader, AdminTable } from "@/components/sections";
import { useAdminData } from "@/store/admin";

export function AdminUsers() {
  const { users, load, error } = useAdminData();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Creators, plans, credits, and roles from Supabase profiles."
      />
      {error && <p className="px-6 md:px-8 pt-4 text-xs text-destructive">{error}</p>}
      <AdminTable
        columns={[
          { key: "id", label: "ID" },
          { key: "email", label: "Email" },
          { key: "plan", label: "Plan" },
          { key: "credits", label: "Credits" },
          { key: "role", label: "Role" },
        ]}
        rows={users}
        emptyLabel="No users found"
      />
    </>
  );
}
