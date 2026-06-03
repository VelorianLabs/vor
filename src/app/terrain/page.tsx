import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { LandFilters } from "@/components/terrain/LandFilters";
import { filterLandProperties } from "@/lib/utils/filterProperties";
import { TERRAIN_NAV } from "@/lib/constants/navigation";
import { landProperties } from "@/lib/data/mock";

interface TerrainPageProps {
  searchParams: Promise<{
    state?: string;
    lga?: string;
    titleType?: string;
    grade?: string;
    maxPrice?: string;
    minSize?: string;
  }>;
}

async function MarketplaceGrid({
  searchParams,
}: {
  searchParams: Awaited<TerrainPageProps["searchParams"]>;
}) {
  const filtered = filterLandProperties(landProperties, searchParams);

  return (
    <>
      <p className="text-sm text-vor-slate mb-6">
        {filtered.length} verified listing{filtered.length !== 1 ? "s" : ""} found
      </p>
      {filtered.length === 0 ? (
        <p className="text-vor-slate py-12 text-center">
          No properties match your filters. Try adjusting your criteria.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}

export const metadata = {
  title: "Land Marketplace",
  description: "Browse verified land listings across Lagos, Abuja, and Ogun with VOR title verification.",
};

export default async function TerrainMarketplacePage({ searchParams }: TerrainPageProps) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="VOR Terrain"
        title="Land Marketplace"
        description="Verified land parcels with title audit, survey documentation, and investment-grade ratings."
      />
      <DivisionSubnav items={TERRAIN_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <Suspense fallback={<div className="h-96 bg-vor-cream rounded-xl animate-pulse" />}>
            <LandFilters />
          </Suspense>
          <div className="lg:col-span-3">
            <MarketplaceGrid searchParams={params} />
          </div>
        </div>
      </div>
    </>
  );
}
