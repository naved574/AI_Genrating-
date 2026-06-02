import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/pages/dashboard/Profile";

export const Route = createFileRoute("/_dash/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — Luminal" }, { name: "description", content: "How you appear publicly." }] }),
  component: Profile,
});
