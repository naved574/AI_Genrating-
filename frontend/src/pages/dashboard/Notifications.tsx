import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Notifications() {
  return (
    <>
      <DashPageHeader title="Notifications" description="Comments, mentions, system updates." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Notifications"}]} />
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
