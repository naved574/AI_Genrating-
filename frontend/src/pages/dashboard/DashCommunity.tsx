import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function DashCommunity() {
  return (
    <>
      <DashPageHeader title="Community" description="Channels, challenges, and people." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Community"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of community."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
