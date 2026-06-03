import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";

export const metadata = { title: "Transparency Center" };

export default function TransparencyCenterPage() {
  return (
    <CorporatePageTemplate
      title="Transparency Center"
      description="Public disclosures, policies, and accountability commitments."
    >
      <p>
        VOR publishes verification methodologies, fee structures, conflict-of-interest policies, and
        aggregate platform statistics to maintain public accountability.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Land verification methodology (public summary)</li>
        <li>Investment pool fee schedule</li>
        <li>Complaints and dispute resolution process</li>
        <li>Annual transparency report (Phase 2)</li>
      </ul>
    </CorporatePageTemplate>
  );
}
