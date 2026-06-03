import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-vor-gold font-semibold text-sm uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-vor-navy font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-vor-slate text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
