import { LegalDoc } from "@/components/sections";

export function Dmca() {
  return (
    <LegalDoc
      title="DMCA"
      updated="June 2, 2026"
      intro="If you believe content on Luminal infringes your copyright, you can file a takedown notice."
      sections={[
    { id: "how", heading: "How to file", body: <><p>Email dmca@luminal.example with: identification of the work, URLs of the infringing content, your contact info, and a sworn statement.</p></> },
    { id: "counter", heading: "Counter notice", body: <><p>If your content was removed in error, you can submit a counter notice with the same information and your reasoning.</p></> },
    { id: "repeat", heading: "Repeat infringers", body: <><p>Accounts that repeatedly infringe will be terminated.</p></> },
      ]}
    />
  );
}
