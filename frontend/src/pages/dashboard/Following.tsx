import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Following() {
  return (
    <>
      <DashPageHeader title="Following" description="Creators you follow." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Following"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of following."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
