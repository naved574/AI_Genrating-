import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Canvas() {
  return (
    <>
      <DashPageHeader title="Canvas" description="An infinite scratchpad for visual ideation." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Canvas"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of canvas."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
