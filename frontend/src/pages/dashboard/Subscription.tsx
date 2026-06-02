import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Subscription() {
  return (
    <>
      <DashPageHeader title="Subscription" description="Plan and renewal." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Subscription"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of subscription."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
