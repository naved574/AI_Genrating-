import { Link } from "@tanstack/react-router";

import { DashPageHeader, DashStatTiles, DashCardGrid } from "@/components/sections";
import { useAuth } from "@/store/auth";

export function Credits() {
  const user = useAuth((state) => state.user);

  return (
    <>
      <DashPageHeader
        title="Credits"
        description="Your generation balance and top-up path. Credits are deducted when a job is submitted and refunded on provider failure."
        breadcrumbs={[{ to: "/dashboard", label: "Dashboard" }, { label: "Credits" }]}
        actions={
          <Link
            to="/dashboard/billing"
            className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
          >
            Buy credits
          </Link>
        }
      />
      <DashStatTiles
        stats={[
          {
            label: "Available credits",
            value: String(user?.credits ?? 0),
            sub: `${user?.plan ?? "free"} plan`,
          },
          { label: "MVP cost", value: "4-8", sub: "credits per image" },
          { label: "Refund policy", value: "Auto", sub: "failed jobs refund" },
          { label: "Audience", value: "Creators", sub: "thumbnail/poster/avatar" },
        ]}
      />
      <DashCardGrid
        cards={[
          {
            title: "How credits work",
            body: "Each enabled model has a credit cost. Quantity multiplies that cost before generation starts.",
          },
          {
            title: "Failed jobs",
            body: "Provider errors mark the job failed and create a refund ledger entry.",
          },
          {
            title: "Upgrade path",
            body: "Stripe plans add monthly credits through the webhook after checkout succeeds.",
          },
        ]}
      />
    </>
  );
}
