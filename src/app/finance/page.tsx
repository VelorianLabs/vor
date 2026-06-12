import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { Button } from "@/components/ui/Button";
import { FINANCE_NAV } from "@/lib/constants/navigation";
import { formatNaira } from "@/lib/utils/cn";
import { TrendingUp, Shield, BarChart3 } from "lucide-react";

export const metadata = { title: "Investor Portal" };

export default async function InvestorPortalPage() {
  // Mock investment pools data
  const investmentPools = [
    { id: '1', title: 'Lekki Phase 2 Development', target_amount: 50000000, raised_amount: 35000000, status: 'open', created_at: new Date().toISOString() },
    { id: '2', title: 'Abuja Estate Project', target_amount: 80000000, raised_amount: 20000000, status: 'open', created_at: new Date().toISOString() },
  ];

  return (
    <>
      <PageHero
        eyebrow="VOR Finance"
        title="Investor Portal"
        description="Access structured investment pools, project funding opportunities, and transparent financial reporting."
      />
      <DivisionSubnav items={FINANCE_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Shield, title: "Regulated approach", text: "Aligned with SEC Nigeria frameworks for collective investment schemes (Phase 3)." },
            { icon: TrendingUp, title: "Defined returns", text: "Clear ROI projections with quarterly reporting and audited financial statements." },
            { icon: BarChart3, title: "Portfolio view", text: "Track all VOR investments, distributions, and project updates in one dashboard (Phase 2)." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-vor-cream rounded-xl p-6">
              <Icon className="h-8 w-8 text-vor-navy" aria-hidden />
              <h3 className="mt-4 font-display font-semibold text-vor-navy">{title}</h3>
              <p className="mt-2 text-sm text-vor-slate">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-vor-navy mb-6">Open investment pools</h2>
        <div className="space-y-4">
          {(investmentPools || []).map((pool: any) => (
            <div
              key={pool.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl border border-vor-border p-6 shadow-card"
            >
              <div>
                <span className="text-xs font-semibold uppercase text-vor-trust">{pool.status}</span>
                <h3 className="font-display text-lg font-semibold text-vor-navy mt-1">{pool.name}</h3>
                <p className="text-sm text-vor-slate">
                  {pool.state} · {pool.roi}% ROI · {pool.termMonths} months
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-vor-slate">Raised / Target</p>
                <p className="font-semibold text-vor-navy">
                  {formatNaira(pool.raisedAmount)} / {formatNaira(pool.targetAmount)}
                </p>
                <p className="text-xs text-vor-slate mt-1">Min. {formatNaira(pool.minInvestment)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/finance/funding" variant="primary">
            Project funding
          </Button>
          <Button href="/finance/reports" variant="outline">
            Financial reports
          </Button>
        </div>
      </div>
    </>
  );
}
