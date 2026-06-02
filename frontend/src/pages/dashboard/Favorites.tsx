import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Favorites() {
  return (
    <>
      <DashPageHeader title="Favorites" description="Images you've starred." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Favorites"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of favorites."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
