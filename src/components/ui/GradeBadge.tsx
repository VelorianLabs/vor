import { cn } from "@/lib/utils/cn";
import type { InvestmentGrade } from "@/lib/types";

const colors: Record<InvestmentGrade, string> = {
  A: "bg-vor-gold/15 text-vor-navy border-vor-gold/40",
  B: "bg-vor-navy/5 text-vor-navy border-vor-navy/20",
  C: "bg-slate-100 text-slate-600 border-slate-200",
};

export function GradeBadge({ grade, className }: { grade: InvestmentGrade; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 text-xs font-semibold",
        colors[grade],
        className
      )}
    >
      Grade {grade}
    </span>
  );
}
