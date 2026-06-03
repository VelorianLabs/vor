import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Download,
  Calendar,
  Navigation,
  FileText,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { Button } from "@/components/ui/Button";
import { LandMapPlaceholder } from "@/components/maps/LandMapPlaceholder";
import { landProperties } from "@/lib/data/mock";
import { formatNaira } from "@/lib/utils/cn";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return landProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = landProperties.find((p) => p.id === id);
  return {
    title: property?.title ?? "Property",
    description: property?.description,
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = landProperties.find((p) => p.id === id);

  if (!property) notFound();

  return (
    <>
      <PageHero
        eyebrow="VOR Terrain · Property Detail"
        title={property.title}
        description={`${property.area} · ${property.lga}, ${property.state}`}
      >
        <div className="flex flex-wrap gap-3">
          <VerificationBadge status={property.verificationStatus} size="md" />
          <GradeBadge grade={property.investmentGrade} />
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy">Overview</h2>
              <p className="mt-3 text-vor-slate leading-relaxed">{property.description}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy mb-4">Location & GPS</h2>
              <LandMapPlaceholder title="Property GPS Location" height="h-[280px]" />
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-vor-slate">
                  <Navigation className="h-4 w-4 text-vor-trust" aria-hidden />
                  Lat: {property.gps.lat}, Lng: {property.gps.lng}
                </span>
                <span className="flex items-center gap-2 text-vor-slate">
                  <MapPin className="h-4 w-4 text-vor-trust" aria-hidden />
                  {property.lga}, {property.state}
                </span>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-vor-navy mb-4">Documents</h2>
              <ul className="space-y-2">
                {property.documents.map((doc) => (
                  <li
                    key={doc.name}
                    className="flex items-center justify-between p-4 rounded-lg border border-vor-border bg-vor-cream/50"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-vor-navy">
                      <FileText className="h-4 w-4 text-vor-gold" aria-hidden />
                      {doc.name}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-sm text-vor-trust font-medium hover:underline"
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      Download {doc.type}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-vor-slate">
                Full document access available after KYC verification (Phase 2).
              </p>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card sticky top-32">
              <p className="text-3xl font-display font-semibold text-vor-navy">
                {formatNaira(property.price)}
              </p>
              <p className="text-sm text-vor-slate mt-1">
                {property.sizeSqm.toLocaleString()} sqm · {property.titleType}
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-vor-border">
                  <span className="text-vor-slate">Title status</span>
                  <span className="font-medium">{property.titleType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-vor-border">
                  <span className="text-vor-slate">Survey available</span>
                  <span className="font-medium">{property.surveyAvailable ? "Yes" : "Pending"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-vor-border">
                  <span className="text-vor-slate flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                    ROI projection
                  </span>
                  <span className="font-medium text-vor-trust">{property.roiProjection}% p.a.</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-vor-slate">Investment grade</span>
                  <GradeBadge grade={property.investmentGrade} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button href="/corporate/contact" variant="primary" className="w-full">
                  Request inspection
                </Button>
                <Button href="/finance/funding" variant="outline" className="w-full">
                  Explore financing
                </Button>
              </div>

              <form className="mt-8 pt-6 border-t border-vor-border">
                <h3 className="font-semibold text-vor-navy text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden />
                  Book site inspection
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
                    Submit booking request
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link href="/terrain" className="text-sm text-vor-trust font-medium hover:underline">
            ← Back to marketplace
          </Link>
        </div>
      </div>
    </>
  );
}
