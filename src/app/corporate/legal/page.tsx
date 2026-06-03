import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";
import { REGULATORY_BODIES } from "@/lib/constants/navigation";

export const metadata = { title: "Legal Compliance" };

export default function LegalCompliancePage() {
  return (
    <CorporatePageTemplate
      title="Legal Compliance"
      description="Regulatory alignment and compliance across Nigerian jurisdictions."
    >
      <p>
        VOR operations align with federal and state land administration frameworks, corporate
        registration requirements, and applicable securities regulations for collective investment
        activities.
      </p>
      <h2 className="font-display text-xl font-semibold text-vor-navy pt-4">Regulatory references</h2>
      <ul className="list-disc pl-5 space-y-2">
        {REGULATORY_BODIES.map((body) => (
          <li key={body.abbr}>
            <strong>{body.abbr}</strong> — {body.name}
          </li>
        ))}
      </ul>
    </CorporatePageTemplate>
  );
}
