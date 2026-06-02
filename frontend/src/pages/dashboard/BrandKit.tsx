import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function BrandKit() {
  return (
    <>
      <DashPageHeader title="Brand kit" description="Colors, fonts, and reference images that auto-attach." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Brand kit"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of brand kit."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
