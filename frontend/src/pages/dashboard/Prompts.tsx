import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Prompts() {
  return (
    <>
      <DashPageHeader title="Prompts" description="Saved prompts and presets." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Prompts"}]} />
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
