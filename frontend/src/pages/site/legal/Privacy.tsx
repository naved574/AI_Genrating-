import { LegalDoc } from "@/components/sections";

export function Privacy() {
  return (
    <LegalDoc
      title="Privacy"
      updated="June 2, 2026"
      intro="We collect the minimum we need to provide Luminal, and never sell your data."
      sections={[
    { id: "collect", heading: "What we collect", body: <><p>Account: email, hashed password, plan, settings.</p><p>Usage: model, prompt metadata, generation count. Prompts are not used to train public models.</p><p>Billing: handled by our PCI-compliant processor.</p></> },
    { id: "use", heading: "How we use it", body: <><p>To run the product, send service emails, prevent abuse, and bill correctly.</p></> },
    { id: "share", heading: "Sharing", body: <><p>With sub-processors strictly necessary for operations (hosting, email, billing). Full list on request.</p></> },
    { id: "rights", heading: "Your rights", body: <><p>Export, edit, or delete your data anytime from Settings, or by emailing privacy@luminal.example.</p></> },
      ]}
    />
  );
}
