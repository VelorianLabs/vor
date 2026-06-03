import Link from "next/link";
import { Map, Home, Landmark } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const divisions = [
  {
    icon: Map,
    title: "VOR Terrain",
    href: "/terrain",
    description:
      "Land intelligence, acquisition support, title verification, and structured land sales across Nigeria's growth corridors.",
  },
  {
    icon: Home,
    title: "VOR Home & Construct",
    href: "/home-construct",
    description:
      "Residential and commercial development, construction services, and housing marketplace — buy, rent, or lease with confidence.",
  },
  {
    icon: Landmark,
    title: "VOR Finance",
    href: "/finance",
    description:
      "Project financing, investor relations, regulated investment pools, and transparent financial reporting for stakeholders.",
  },
];

export function DivisionsSection() {
  return (
    <section className="py-20 bg-vor-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Three Divisions"
          title="One ecosystem. Complete real estate lifecycle."
          description="From land verification through construction to structured investment — VOR covers every stage with institutional-grade transparency."
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {divisions.map(({ icon: Icon, title, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-xl p-8 border border-vor-border shadow-card hover:shadow-elevated transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-navy text-vor-gold group-hover:bg-vor-trust group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-vor-navy">{title}</h3>
              <p className="mt-3 text-vor-slate text-sm leading-relaxed">{description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-vor-trust group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
