import { Button } from "./Button";

interface CTABannerProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTABanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className="bg-vor-navy rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-2xl">
        <h3 className="font-display text-2xl md:text-3xl font-semibold">{title}</h3>
        <p className="mt-3 text-white/75 leading-relaxed">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-vor-navy">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
