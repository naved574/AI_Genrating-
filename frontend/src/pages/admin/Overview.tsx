import { DashPageHeader, DashStatTiles, DashCardGrid, DashTable } from "@/components/sections";

export function AdminOverview() {
  return (
    <>
      <DashPageHeader title="Admin overview" description="Operational dashboard for the Luminal platform."  />
      <DashStatTiles stats={[{"label":"MAU","value":"84,219","trend":"+12% w/w"},{"label":"Generations / day","value":"1.2M","sub":"across all models"},{"label":"MRR","value":"$427,800","trend":"+8.4%"},{"label":"Refund rate","value":"0.6%","sub":"rolling 30d"}]} />
      <DashCardGrid
        cards={[{"title":"Pending moderation","body":"8 items awaiting review."},{"title":"Reported content","body":"3 new reports today."},{"title":"Feature flags","body":"4 flags currently rolled out."}]}
      />
    </>
  );
}
