import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Earnings() {
  return (
    <>
      <DashPageHeader title="Earnings" description="Creator Program and referral payouts." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Earnings"}]} />
      <DashTable
        columns={[{ key: "name", label: "Name" }, { key: "updated", label: "Updated" }, { key: "status", label: "Status" }]}
        rows={[
          { name: "Item one", updated: "2 hours ago", status: "Active" },
          { name: "Item two", updated: "Yesterday", status: "Active" },
          { name: "Item three", updated: "3 days ago", status: "Archived" },
        ]}
      />
    </>
  );
}
