import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function AiTools() {
  return (
    <>
      <DashPageHeader title="AI Tools" description="Sixteen specialized tools, one credit each." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"AI Tools"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of ai tools."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
