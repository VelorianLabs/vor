import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { LandFilters } from "@/components/terrain/LandFilters";
import { filterLandProperties } from "@/lib/utils/filterProperties";
import { TERRAIN_NAV } from "@/lib/constants/navigation";

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
  // Mock land properties data
  const landProperties = [
    { id: '1', title: 'Prime Land in Lekki', state: 'Lagos', lga: 'Ikeja', price: 15000000, size_sqm: 500, sizeSqm: 500, title_type: 'C of O', titleType: 'C of O', investment_grade: 'A', investmentGrade: 'A', roi_projection: 25, roiProjection: 25, verificationStatus: 'verified' as any, images: ['/placeholder.jpg'], image: '/placeholder.jpg', coordinates: { lat: 6.5244, lng: 3.3792 }, gps: { lat: 6.5244, lng: 3.3792 }, area: 'Lekki Phase 1', documents: [], surveyAvailable: true, created_at: new Date().toISOString() },
    { id: '2', title: 'Land in Maitama', state: 'Abuja', lga: 'Maitama', price: 30000000, size_sqm: 600, sizeSqm: 600, title_type: 'Gazette', titleType: 'Gazette', investment_grade: 'A', investmentGrade: 'A', roi_projection: 30, roiProjection: 30, verificationStatus: 'verified' as any, images: ['/placeholder.jpg'], image: '/placeholder.jpg', coordinates: { lat: 9.0765, lng: 7.4983 }, gps: { lat: 9.0765, lng: 7.4983 }, area: 'Maitama', documents: [], surveyAvailable: true, created_at: new Date().toISOString() },
  ] as any;

  const filtered = filterLandProperties(landProperties || [], searchParams);

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
