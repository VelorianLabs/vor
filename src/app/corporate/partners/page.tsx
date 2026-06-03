import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";

export const metadata = { title: "Partners" };

export default function PartnersPage() {
  return (
    <CorporatePageTemplate
      title="Partners"
      description="Estate developers, surveyors, legal firms, and financial institutions."
    >
      <p>
        VOR partners with licensed surveyors (SURCON-registered), estate surveying firms (ESVARBON),
        property lawyers, and development finance institutions to deliver end-to-end verified real
        estate services.
      </p>
      <p>Interested in partnership? Contact our corporate team to discuss collaboration models.</p>
    </CorporatePageTemplate>
  );
}
