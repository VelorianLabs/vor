import Link from "next/link";
import Image from "next/image";
import { FileCheck, Scale, Users } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { HomeCard } from "@/components/properties/HomeCard";
import { LandMapPlaceholder } from "@/components/maps/LandMapPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/ui/CTABanner";
import { Button } from "@/components/ui/Button";
import {
  landProperties,
  constructionProjects,
  testimonials,
  investmentPools,
} from "@/lib/data/mock";
import { formatNaira } from "@/lib/utils/cn";

export default function HomePage() {
  const featured = landProperties.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Verified Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="VOR Terrain"
              title="Verified properties"
              description="Every listing undergoes title audit, survey review, and GPS verification before publication."
            />
            <Button href="/terrain" variant="outline">
              View marketplace
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Land Map */}
      <section className="py-20 bg-vor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Land Intelligence"
            title="Explore Nigeria's growth corridors"
            description="Interactive map with verified plot boundaries, investment zones, and title status overlays — coming in Phase 2."
            className="mb-8"
          />
          <LandMapPlaceholder />
        </div>
      </section>

      {/* Featured Estates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured Estates"
            title="Premium developments"
            description="Curated estates and master-planned communities with VOR oversight."
            className="mb-10"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {constructionProjects.slice(0, 2).map((project) => (
              <Link
                key={project.id}
                href="/home-construct/projects"
                className="group relative aspect-[16/9] rounded-xl overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vor-navy/90 via-vor-navy/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-vor-gold text-sm font-medium">{project.location}</p>
                  <h3 className="font-display text-2xl font-semibold mt-1">{project.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{project.progress}% complete · {project.units} units</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DivisionsSection />

      {/* Why VOR */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why VOR"
            title="Built for trust in Nigerian real estate"
            align="center"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileCheck,
                title: "Title Verification",
                text: "C of O, Governor's Consent, and deed chains audited by VOR legal partners before any listing goes live.",
              },
              {
                icon: Scale,
                title: "Legal Transparency",
                text: "Downloadable documents, regulatory references, and clear disclosure on every property and investment pool.",
              },
              {
                icon: Users,
                title: "Institutional Standards",
                text: "Premium, secure platform design — not flashy agent marketing. Built for serious buyers, developers, and investors.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center px-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-vor-cream text-vor-navy">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-vor-slate text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Section */}
      <section className="py-20 bg-vor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="VOR Finance"
            title="Structured investment opportunities"
            description="Regulated-style investment pools with transparent reporting and defined ROI projections."
            className="mb-10"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {investmentPools.map((pool) => (
              <div
                key={pool.id}
                className="bg-white rounded-xl border border-vor-border p-6 shadow-card"
              >
                <span
                  className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                    pool.status === "open"
                      ? "bg-vor-trust/10 text-vor-trust"
                      : pool.status === "closing"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {pool.status}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-vor-navy">{pool.name}</h3>
                <p className="text-sm text-vor-slate mt-1">{pool.state} · {pool.roi}% projected ROI</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-vor-slate mb-1">
                    <span>Raised</span>
                    <span>{Math.round((pool.raisedAmount / pool.targetAmount) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-vor-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-vor-trust rounded-full"
                      style={{ width: `${(pool.raisedAmount / pool.targetAmount) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-vor-navy font-medium">
                    Min. {formatNaira(pool.minInvestment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/finance" variant="secondary">
              Open Investor Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Construction Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="VOR Home & Construct"
            title="Ongoing construction projects"
            className="mb-10"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {constructionProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-vor-border overflow-hidden shadow-card"
              >
                <div className="relative aspect-video">
                  <Image src={project.image} alt={project.name} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-vor-navy">{project.name}</h3>
                  <p className="text-sm text-vor-slate">{project.location}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-vor-slate">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-vor-cream rounded-full">
                      <div
                        className="h-full bg-vor-gold rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-vor-slate">
                    {project.units} units · Est. {project.completionDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Dashboard Section */}
      <section className="py-20 bg-vor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Client Portal"
                title="Manage your property portfolio"
                description="Access your personalized dashboard to track your investments, view payment history, manage documents, and get support."
                className="mb-6"
              />
              <ul className="space-y-4 mb-8">
                {[
                  "Track your property portfolio in real-time",
                  "View payment history and upcoming payments",
                  "Access all your documents in one secure place",
                  "Get dedicated support for your inquiries",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-vor-gold text-vor-navy mt-0.5 shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-vor-navy">{item}</span>
                  </li>
                ))}
              </ul>
              <Button href="/dashboard/client" variant="primary" size="lg">
                Access Client Dashboard
              </Button>
            </div>
            <div className="bg-white rounded-2xl border border-vor-border shadow-elevated p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-vor-border">
                  <span className="text-sm font-medium text-vor-slate">Portfolio Value</span>
                  <span className="text-2xl font-bold text-vor-navy">₦45,000,000</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-vor-cream rounded-lg p-4">
                    <p className="text-xs text-vor-slate mb-1">Properties</p>
                    <p className="text-xl font-bold text-vor-navy">3</p>
                  </div>
                  <div className="bg-vor-cream rounded-lg p-4">
                    <p className="text-xs text-vor-slate mb-1">Payments</p>
                    <p className="text-xl font-bold text-vor-navy">12</p>
                  </div>
                  <div className="bg-vor-cream rounded-lg p-4">
                    <p className="text-xs text-vor-slate mb-1">Documents</p>
                    <p className="text-xl font-bold text-vor-navy">8</p>
                  </div>
                  <div className="bg-vor-cream rounded-lg p-4">
                    <p className="text-xs text-vor-slate mb-1">Support Tickets</p>
                    <p className="text-xl font-bold text-vor-navy">2</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-vor-border">
                  <p className="text-xs text-vor-slate mb-2">Recent Activity</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-vor-trust" />
                      <span className="text-vor-navy">Payment received - VOR-LAG-001</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-vor-gold" />
                      <span className="text-vor-navy">Document uploaded - Deed of Assignment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-vor-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by investors and developers"
            align="center"
            className="mb-12 [&_h2]:text-white [&_p]:text-white/70"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <p className="text-white/90 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/60">
                    {t.role} · {t.location}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Transparency */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTABanner
            title="Legal transparency at every step"
            description="Access our Transparency Center, governance policies, and fraud prevention resources. VOR operates with institutional accountability — aligned with Nigerian regulatory frameworks."
            primaryLabel="Transparency Center"
            primaryHref="/corporate/transparency"
            secondaryLabel="Fraud Prevention"
            secondaryHref="/corporate/fraud-prevention"
          />
        </div>
      </section>
    </>
  );
}
