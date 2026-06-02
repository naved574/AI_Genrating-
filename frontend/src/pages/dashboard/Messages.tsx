import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Messages() {
  return (
    <>
      <DashPageHeader title="Messages" description="Conversations with collaborators." breadcrumbs={[{"to":"/dashboard","label":"Dashboard"},{"label":"Messages"}]} />
      <DashCardGrid
        cards={[{"title":"Get started","body":"Begin with the basics of messages."},{"title":"Quick actions","body":"The shortcuts you'll use the most."},{"title":"Recent activity","body":"What's happened here lately."}]}
      />
    </>
  );
}
