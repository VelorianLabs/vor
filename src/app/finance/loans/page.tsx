import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { FINANCE_NAV } from "@/lib/constants/navigation";
import { Landmark } from "lucide-react";

export const metadata = { title: "Loan Marketplace" };

export default function LoanMarketplacePage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Finance"
        title="Loan Marketplace"
        description="Mortgage and development financing partnerships — launching in Phase 3."
      />
      <DivisionSubnav items={FINANCE_NAV} />
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Landmark className="h-16 w-16 text-vor-gold mx-auto mb-6" aria-hidden />
        <h2 className="font-display text-2xl font-semibold text-vor-navy">Coming in Phase 3</h2>
        <p className="mt-4 text-vor-slate">
          VOR will partner with licensed mortgage banks and development finance institutions to offer
          competitive home and project loans for verified VOR properties.
        </p>
      </div>
    </>
  );
}
