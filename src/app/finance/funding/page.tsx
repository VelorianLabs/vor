import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { Button } from "@/components/ui/Button";
import { FINANCE_NAV } from "@/lib/constants/navigation";

export const metadata = { title: "Project Funding" };

export default function ProjectFundingPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Finance"
        title="Project Funding"
        description="Raise capital for land acquisition, estate development, and infrastructure projects through VOR's investor network."
      />
      <DivisionSubnav items={FINANCE_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-vor-navy">For developers</h2>
            <p className="mt-4 text-vor-slate leading-relaxed">
              Submit your project for VOR Finance review. We evaluate title security, market demand,
              development team track record, and financial projections before opening investment pools.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-vor-slate">
              <li>· Minimum project size: ₦50M</li>
              <li>· VOR Terrain verification required for land-backed projects</li>
              <li>· Quarterly investor reporting mandatory</li>
            </ul>
            <Button href="/corporate/contact" variant="primary" className="mt-8">
              Submit project proposal
            </Button>
          </div>
          <div className="bg-vor-cream border-2 border-dashed border-black/40 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold text-vor-navy">For investors</h2>
            <p className="mt-4 text-vor-slate leading-relaxed">
              Access pre-vetted development projects with transparent structures, defined terms, and
              regulated-style disclosure documents.
            </p>
            <Button href="/finance" variant="outline" className="mt-8">
              View open pools
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
