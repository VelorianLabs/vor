import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { LandMapPlaceholder } from "@/components/maps/LandMapPlaceholder";
import { TERRAIN_NAV } from "@/lib/constants/navigation";
import type { InvestmentGrade } from "@/lib/types";

export const metadata = {
  title: "Investment Zones",
  description: "VOR-curated investment zones across Lagos, Abuja, and Ogun with grade ratings and ROI benchmarks.",
};

export default async function InvestmentZonesPage() {
  // Mock investment zones data
  const investmentZones = [
    { name: 'Ikeja, Lagos', state: 'Lagos', grade: 'A' as any, avgRoi: 25, description: 'Investment zone in Ikeja, Lagos', propertyCount: 15 },
    { name: 'Maitama, Abuja', state: 'Abuja', grade: 'A' as any, avgRoi: 30, description: 'Investment zone in Maitama, Abuja', propertyCount: 10 },
  ];

  return (
    <>
      <PageHero
        eyebrow="VOR Terrain"
        title="Investment Zones"
        description="Data-driven zone analysis with investment grades, average ROI benchmarks, and growth corridor intelligence."
      />
      <DivisionSubnav items={TERRAIN_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LandMapPlaceholder title="Investment Zone Map" height="h-[360px]" />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {investmentZones.map((zone) => (
            <article
              key={zone.name}
              className="bg-white rounded-xl border border-vor-border p-6 shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-vor-navy">{zone.name}</h3>
                <GradeBadge grade={zone.grade as InvestmentGrade} />
              </div>
              <p className="text-sm text-vor-slate mt-1">{zone.state}</p>
              <p className="mt-4 text-sm text-vor-slate leading-relaxed">{zone.description}</p>
              <p className="mt-4 text-vor-trust font-semibold">Avg. {zone.avgRoi}% ROI benchmark</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
