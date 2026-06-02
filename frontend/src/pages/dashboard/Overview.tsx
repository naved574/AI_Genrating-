import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function Overview() {
  return (
    <>
      <DashPageHeader title="Overview" description="Your generations, credits, and activity at a glance."  />
      <DashStatTiles stats={[{"label":"Generations this week","value":"247","sub":"12 sessions","trend":"+38%"},{"label":"Credits remaining","value":"1,240","sub":"of 2,000","trend":"18d left"},{"label":"Top model","value":"Spectral v4.2","sub":"64% of recent"},{"label":"Saved","value":"82","sub":"favorites"}]} />
      <DashCardGrid
        cards={[{"title":"Continue generating","body":"Pick up your latest session."},{"title":"Try a tool","body":"Sixteen specialized tools, one credit each."},{"title":"Explore community","body":"What others shipped today."}]}
      />
    </>
  );
}
