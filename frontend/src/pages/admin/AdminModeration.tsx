import { useEffect } from "react";

import { AdminPageHeader, AdminTable } from "@/components/sections";
import { useAdminData } from "@/store/admin";

export function AdminModeration() {
  const { reports, load, error } = useAdminData();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <AdminPageHeader
        title="Image moderation"
        description="Reported generated assets awaiting review."
      />
      {error && <p className="px-6 md:px-8 pt-4 text-xs text-destructive">{error}</p>}
      <AdminTable
        columns={[
          { key: "id", label: "ID" },
          { key: "reason", label: "Reason" },
          { key: "status", label: "Status" },
          { key: "created_at", label: "Reported" },
        ]}
        rows={reports}
        emptyLabel="No reports found"
      />
    </>
  );
}
