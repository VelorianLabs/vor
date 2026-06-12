import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Download,
  Calendar,
  Navigation,
  FileText,
  Home as HomeIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { Button } from "@/components/ui/Button";
import { InspectionButton } from "@/components/inspection/PropertyDetailWrapper";
import { formatNaira } from "@/lib/utils/cn";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // Mock static params
  return [{ id: '1' }, { id: '2' }];
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;
  return {
    title: "Property Details",
    description: "View property details",
  };
}

export default async function HomeDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  // Mock home data
  const home = {
    id: id,
    title: 'Modern Villa',
    lga: 'Ikeja',
    state: 'Lagos',
    price: 50000000,
    bedrooms: 4,
    bathrooms: 3,
    listing_type: 'buy',
    images: ['/placeholder.jpg'],
    description: 'Beautiful modern villa in a prime location',
    created_at: new Date().toISOString(),
    verificationStatus: 'verified' as any,
    sqm: 500,
  };

  if (!home) notFound();

  const listingLabels: Record<string, string> = { buy: "For Sale", rent: "For Rent", lease: "For Lease" };

  return (
    <>
      <PageHero
        eyebrow="VOR Home & Construct · Property Detail"
        title={home.title}
        description={`${home.lga}, ${home.state}`}
      >
        <div className="flex flex-wrap gap-3">
          <VerificationBadge status={home.verificationStatus} size="md" />
          <span className="bg-vor-navy text-white text-sm font-semibold px-3 py-1 rounded">
            {listingLabels[home.listing_type] || home.listing_type}
          </span>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={home.images?.[0] || '/placeholder.jpg'}
                alt={home.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy">Property Overview</h2>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-4 rounded-lg bg-vor-cream">
                  <Bed className="h-5 w-5 text-vor-navy" aria-hidden />
                  <div>
                    <p className="text-2xl font-bold text-vor-navy">{home.bedrooms}</p>
                    <p className="text-xs text-vor-slate">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-vor-cream">
                  <Bath className="h-5 w-5 text-vor-navy" aria-hidden />
                  <div>
                    <p className="text-2xl font-bold text-vor-navy">{home.bathrooms}</p>
                    <p className="text-xs text-vor-slate">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-vor-cream">
                  <Navigation className="h-5 w-5 text-vor-navy" aria-hidden />
                  <div>
                    <p className="text-2xl font-bold text-vor-navy">{home.sqm}</p>
                    <p className="text-xs text-vor-slate">Square Meters</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy mb-4">Location</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-vor-slate">
                  <MapPin className="h-4 w-4 text-vor-trust" aria-hidden />
                  {home.lga}, {home.state}
                </span>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy mb-4">Documents</h2>
              <ul className="space-y-2">
                <li className="flex items-center justify-between p-4 rounded-lg border border-vor-border bg-vor-cream/50">
                  <span className="flex items-center gap-2 text-sm font-medium text-vor-navy">
                    <FileText className="h-4 w-4 text-vor-gold" aria-hidden />
                    Property Verification Certificate
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-vor-trust font-medium hover:underline"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download PDF
                  </button>
                </li>
              </ul>
              <p className="mt-2 text-xs text-vor-slate">
                Full document access available after purchase agreement.
              </p>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card sticky top-32">
              <p className="text-3xl font-display font-semibold text-vor-navy">
                {formatNaira(home.price)}
              </p>
              <p className="text-sm text-vor-slate mt-1">
                {home.sqm.toLocaleString()} sqm · {listingLabels[home.listing_type] || home.listing_type}
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-vor-border">
                  <span className="text-vor-slate">Listing type</span>
                  <span className="font-medium">{listingLabels[home.listing_type] || home.listing_type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-vor-border">
                  <span className="text-vor-slate">Verification</span>
                  <span className="font-medium capitalize">{home.verificationStatus}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-vor-slate">Location</span>
                  <span className="font-medium">{home.lga}, {home.state}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <InspectionButton
                  propertyTitle={home.title}
                  propertyType="home"
                />
                <p className="text-xs text-vor-slate text-center">
                  To proceed with the inspection, we will need to collect the necessary information
                </p>
                <Button href="/finance/funding" variant="outline" className="w-full">
                  Explore financing
                </Button>
              </div>

              <form className="mt-8 pt-6 border-t border-vor-border">
                <h3 className="font-semibold text-vor-navy text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden />
                  Schedule viewing
                </h3>
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
                  />
                  <input
                    type="date"
                    className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-vor-trust text-white py-2.5 text-sm font-semibold hover:bg-vor-trust-light"
                  >
                    Submit viewing request
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link href="/home-construct" className="text-sm text-vor-trust font-medium hover:underline">
            ← Back to marketplace
          </Link>
        </div>
      </div>
    </>
  );
}
