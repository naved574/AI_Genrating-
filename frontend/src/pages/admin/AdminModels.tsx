import { useEffect } from "react";

import { AdminPageHeader, AdminTable } from "@/components/sections";
import { useAdminData } from "@/store/admin";

export function AdminModels() {
  const { models, load, error } = useAdminData();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <AdminPageHeader title="AI models" description="Enabled provider models and credit costs." />
      {error && <p className="px-6 md:px-8 pt-4 text-xs text-destructive">{error}</p>}
      <AdminTable
        columns={[
          { key: "name", label: "Name" },
          { key: "provider", label: "Provider" },
          { key: "provider_model", label: "Provider ID" },
          { key: "cost_credits", label: "Credits" },
          { key: "enabled", label: "Enabled" },
        ]}
        rows={models}
        emptyLabel="No models found"
      />
    </>
  );
}
