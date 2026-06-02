import { LegalDoc } from "@/components/sections";

export function Terms() {
  return (
    <LegalDoc
      title="Terms"
      updated="June 2, 2026"
      intro="By using Luminal you agree to these terms."
      sections={[
    { id: "account", heading: "Your account", body: <><p>You're responsible for what happens under your account. Keep credentials safe.</p></> },
    { id: "use", heading: "Acceptable use", body: <><p>No CSAM, non-consensual deepfakes, hateful content, or content designed to deceive. We enforce this aggressively.</p></> },
    { id: "ownership", heading: "Ownership of outputs", body: <><p>You own the outputs you generate, subject to the license tied to your plan.</p></> },
    { id: "billing", heading: "Billing & cancellation", body: <><p>Plans are month-to-month unless noted. Cancel anytime; access continues through the end of the billing period.</p></> },
    { id: "liability", heading: "Liability", body: <><p>Service is provided as-is. To the maximum extent allowed by law, our liability is limited to fees paid in the prior 12 months.</p></> },
      ]}
    />
  );
}
