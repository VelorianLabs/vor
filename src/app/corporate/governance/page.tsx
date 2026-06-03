import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";

export const metadata = { title: "Governance" };

export default function GovernancePage() {
  return (
    <CorporatePageTemplate
      title="Corporate Governance"
      description="Board oversight, ethics policies, and accountability frameworks."
    >
      <p>
        VOR maintains a governance structure designed for institutional accountability, including
        independent board oversight, conflict-of-interest policies, and segregated division
        reporting lines.
      </p>
      <p>
        Investment pool governance follows documented trustee arrangements and quarterly disclosure
        requirements (full implementation Phase 3, aligned with SEC Nigeria guidance).
      </p>
    </CorporatePageTemplate>
  );
}
