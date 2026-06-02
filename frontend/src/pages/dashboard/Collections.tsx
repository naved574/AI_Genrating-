import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Collections() {
  return (
    <>
      <DashPageHeader title="Collections" description="Organize your generations into albums." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Collections"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of collections."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
