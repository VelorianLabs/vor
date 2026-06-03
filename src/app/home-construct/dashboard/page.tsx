import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { Button } from "@/components/ui/Button";
import { HOME_NAV } from "@/lib/constants/navigation";
import { LayoutDashboard, Lock } from "lucide-react";

export const metadata = { title: "Client Dashboard" };

export default function ClientDashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Home & Construct"
        title="Client Dashboard"
        description="Track your construction project milestones, payments, and documentation in one secure portal."
      />
      <DivisionSubnav items={HOME_NAV} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-vor-cream text-vor-navy mb-6">
          <LayoutDashboard className="h-10 w-10" aria-hidden />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-sm font-medium mb-4">
          <Lock className="h-4 w-4" aria-hidden />
          Phase 2 — Authentication required
        </div>
        <h2 className="font-display text-2xl font-semibold text-vor-navy">
          Client dashboard coming soon
        </h2>
        <p className="mt-4 text-vor-slate leading-relaxed">
          Registered clients will access project timelines, milestone payments, site inspection
          reports, and document vaults. NestJS backend + PostgreSQL auth integration planned for
          Phase 2.
        </p>
        <Button href="/corporate/contact" variant="primary" className="mt-8">
          Register interest
        </Button>
      </div>
    </>
  );
}
