import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Uploads() {
  return (
    <>
      <DashPageHeader title="Uploads" description="Reference images you've uploaded." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Uploads"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of uploads."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
