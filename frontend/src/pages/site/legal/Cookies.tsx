import { LegalDoc } from "@/components/sections";

export function Cookies() {
  return (
    <LegalDoc
      title="Cookies"
      updated="June 2, 2026"
      intro="This page explains how Luminal uses cookies and similar technologies."
      sections={[
    { id: "what", heading: "What are cookies", body: <><p>Cookies are small text files stored on your device when you visit a website. They help us remember preferences and understand usage.</p></> },
    { id: "types", heading: "Types we use", body: <><p>Strictly necessary: required for the site to function.</p><p>Analytics: aggregated, anonymized usage data.</p><p>Functionality: remembers your theme, layout, and language.</p></> },
    { id: "control", heading: "Your choices", body: <><p>You can disable non-essential cookies in your browser settings. Some functionality may not work as expected.</p></> },
      ]}
    />
  );
}
