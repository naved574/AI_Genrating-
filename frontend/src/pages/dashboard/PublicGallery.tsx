import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function PublicGallery() {
  return (
    <>
      <DashPageHeader title="Public gallery" description="Your public work, on your profile." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Public gallery"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of public gallery."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
