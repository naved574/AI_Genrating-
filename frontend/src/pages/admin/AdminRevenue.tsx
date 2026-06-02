import { AdminPageHeader, AdminTable } from "@/components/sections";
import { mockTransactions } from "@/data/mock";

export function AdminRevenue() {
  return (
    <>
      <AdminPageHeader title="Revenue" description="MRR, ARR, and transactions." />
      <AdminTable columns={[{ key: "id", label: "ID" }, { key: "date", label: "Date" }, { key: "user", label: "User" }, { key: "amount", label: "Amount", render: (r) => "$" + r.amount }, { key: "status", label: "Status" }]} rows={mockTransactions} />
    </>
  );
}
