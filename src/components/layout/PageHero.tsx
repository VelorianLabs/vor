import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-vor-navy text-white py-16 md:py-20",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-vor-gold text-sm font-semibold uppercase tracking-wider mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-white/75 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
