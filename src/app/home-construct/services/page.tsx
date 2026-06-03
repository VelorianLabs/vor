import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { Button } from "@/components/ui/Button";
import { HOME_NAV } from "@/lib/constants/navigation";
import { Hammer, Ruler, Paintbrush, Building2 } from "lucide-react";

const services = [
  {
    icon: Ruler,
    title: "Architectural Design",
    description: "Custom residential and commercial designs compliant with Lagos, FCT, and Ogun building codes.",
  },
  {
    icon: Hammer,
    title: "General Construction",
    description: "End-to-end construction management with milestone-based payments and progress tracking.",
  },
  {
    icon: Building2,
    title: "Estate Development",
    description: "Master-planned community development from land preparation through handover.",
  },
  {
    icon: Paintbrush,
    title: "Renovation & Fit-Out",
    description: "Interior finishing, structural upgrades, and commercial fit-out services.",
  },
];

export const metadata = {
  title: "Construction Services",
};

export default function ConstructionServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Home & Construct"
        title="Construction Services"
        description="Institutional-grade construction and development services with transparent project governance."
      />
      <DivisionSubnav items={HOME_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex gap-5 bg-white rounded-xl border border-vor-border p-6 shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-vor-cream text-vor-navy">
                <s.icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-vor-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-vor-slate leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/corporate/contact" variant="primary" size="lg">
            Request a quote
          </Button>
        </div>
      </div>
    </>
  );
}
