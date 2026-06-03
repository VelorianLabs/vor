import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Investor Relations" };

export default function InvestorRelationsPage() {
  return (
    <CorporatePageTemplate
      title="Investor Relations"
      description="Information for current and prospective VOR investors."
    >
      <p>
        VOR Finance provides structured investment opportunities with transparent reporting. Access
        quarterly performance updates, annual reports, and project-specific disclosures.
      </p>
      <div className="flex flex-wrap gap-4 pt-4 not-prose">
        <Button href="/finance/reports" variant="primary">
          Financial reports
        </Button>
        <Button href="/finance" variant="outline">
          Investor portal
        </Button>
      </div>
    </CorporatePageTemplate>
  );
}
