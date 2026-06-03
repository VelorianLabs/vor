import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils/cn";

interface CorporatePageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function CorporatePageTemplate({
  title,
  description,
  children,
  className,
}: CorporatePageTemplateProps) {
  return (
    <>
      <PageHero eyebrow="Corporate" title={title} description={description} />
      <div className={cn("max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16", className)}>
        <div className="prose prose-slate max-w-none text-vor-slate leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </>
  );
}
