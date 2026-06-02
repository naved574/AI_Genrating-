import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Profile() {
  return (
    <>
      <DashPageHeader title="Profile" description="How you appear publicly." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Profile"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of profile."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
