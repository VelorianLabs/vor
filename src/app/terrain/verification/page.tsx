import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TERRAIN_NAV } from "@/lib/constants/navigation";
import { FileSearch, Shield, MapPinned, Scale } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Document intake",
    description: "Submit C of O, Governor's Consent, deed of assignment, gazette, or excision documentation.",
  },
  {
    icon: Scale,
    title: "Legal title audit",
    description: "VOR legal partners verify chain of title, encumbrances, and alignment with state land bureau records.",
  },
  {
    icon: MapPinned,
    title: "Survey & GPS validation",
    description: "Registered survey plans cross-checked with on-ground GPS coordinates and plot boundaries.",
  },
  {
    icon: Shield,
    title: "VOR Verified badge",
    description: "Approved properties receive the VOR Verified badge and are eligible for marketplace listing.",
  },
];

export const metadata = {
  title: "Land Verification Center",
  description: "VOR's multi-stage land title verification process for Nigerian real estate.",
};

export default function VerificationCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Terrain"
        title="Land Verification Center"
        description="Our proprietary verification pipeline protects buyers, investors, and developers from title fraud and incomplete documentation."
      />
      <DivisionSubnav items={TERRAIN_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          title="Four-stage verification process"
          description="Every parcel listed on VOR Terrain must pass our verification standards or display its current review status transparently."
          className="mb-12"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-white rounded-xl border border-vor-border p-6 shadow-card"
            >
              <span className="text-vor-gold font-display text-2xl font-semibold">0{i + 1}</span>
              <step.icon className="h-8 w-8 text-vor-navy mt-4" aria-hidden />
              <h3 className="mt-4 font-display font-semibold text-vor-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-vor-slate leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-vor-cream rounded-2xl p-8 md:p-12">
          <h3 className="font-display text-2xl font-semibold text-vor-navy">
            Submit land for verification
          </h3>
          <p className="mt-3 text-vor-slate max-w-2xl">
            Developers, estate owners, and individual sellers can submit properties for VOR verification.
            Typical turnaround: 10–21 business days depending on title complexity and state registry access.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/corporate/contact" variant="primary">
              Start verification
            </Button>
            <Button href="/terrain" variant="outline">
              Browse verified listings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
