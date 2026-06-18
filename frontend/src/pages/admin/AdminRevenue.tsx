import { useEffect } from "react";

import { AdminPageHeader, AdminTable } from "@/components/sections";
import { useAdminData } from "@/store/admin";

export function AdminRevenue() {
  const { payments, load, error } = useAdminData();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <AdminPageHeader
        title="Revenue"
        description="Stripe checkout and subscription payment records."
      />
      {error && <p className="px-6 md:px-8 pt-4 text-xs text-destructive">{error}</p>}
      <AdminTable
        columns={[
          { key: "stripe_session_id", label: "Session" },
          {
            key: "amount_cents",
            label: "Amount",
            render: (row) => `$${(Number(row.amount_cents ?? 0) / 100).toFixed(2)}`,
          },
          { key: "credits", label: "Credits" },
          { key: "status", label: "Status" },
          { key: "created_at", label: "Created" },
        ]}
        rows={payments}
        emptyLabel="No payments found"
      />
    </>
  );
}
