import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Settings() {
  return (
    <>
      <DashPageHeader title="Settings" description="Account preferences." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Settings"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of settings."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
