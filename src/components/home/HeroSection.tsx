import { Shield, BadgeCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pillars = [
  { icon: Shield, label: "Trust" },
  { icon: Eye, label: "Transparency" },
  { icon: BadgeCheck, label: "Verified Realty" },
];

export function HeroSection() {
  return (
    <section className="relative bg-vor-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, #C4A052 1%, transparent 60%), radial-gradient(circle at 80% 20%, #1A6B4A 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-vor-gold text-md font-semibold uppercase tracking-widest mb-4">
            Vintage Outlook Realty
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
            Nigeria&apos;s trust-first real estate &amp; infrastructure platform
          </h1>
          <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl">
            A transparent, technology-driven ecosystem focused on verified land,
            trusted development, and structured investment opportunities across Lagos,
            Abuja, Ogun, and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/terrain" variant="primary" size="lg">
              Explore Verified Land
            </Button>
            <Button href="/finance" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-vor-navy">
              Investor Portal
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-6">
            {pillars.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/80">
                <Icon className="h-5 w-5 text-vor-gold" aria-hidden />
                <span className="text-sm font-medium uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
