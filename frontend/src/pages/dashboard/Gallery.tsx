import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Gallery() {
  return (
    <>
      <DashPageHeader title="My Gallery" description="Everything you've generated." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"My Gallery"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of my gallery."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
