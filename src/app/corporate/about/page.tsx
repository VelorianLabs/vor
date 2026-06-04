import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";

export const metadata = { title: "About VOR" };

export default function AboutPage() {
  return (
    <CorporatePageTemplate
      title="About Vintage Outlook Realty"
      description="Building Nigeria's most trusted real estate and infrastructure ecosystem."
    >
      <p>
        Vintage Outlook Realty (VOR) is a transparent, technology-driven real estate and infrastructure
        company focused on verified land, trusted development, and structured investment opportunities
        across Nigeria.
      </p>
      <p>
        Founded on the pillars of <strong>Trust</strong>, <strong>Transparency</strong>, and{" "}
        <strong>Verified Realty</strong>, VOR operates through three integrated divisions: VOR
        Terrain (land intelligence), VOR Home & Construct (development and housing), and VOR Finance
        (investment and project funding).
      </p>
      <p>
        We serve diaspora investors, local buyers, property developers, and institutional partners
        who demand institutional-grade due diligence — not speculative marketing.
      </p>
    </CorporatePageTemplate>
  );
}
