import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Analytics() {
  return (
    <>
      <DashPageHeader title="Analytics" description="Your usage, broken down." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Analytics"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of analytics."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
