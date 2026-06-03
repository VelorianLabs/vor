import { BadgeCheck, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { VerificationStatus } from "@/lib/types";

const config: Record<
  VerificationStatus,
  { label: string; icon: typeof BadgeCheck; className: string }
> = {
  verified: {
    label: "VOR Verified",
    icon: BadgeCheck,
    className: "bg-vor-trust/10 text-vor-trust border-vor-trust/30",
  },
  "in-review": {
    label: "Verification In Review",
    icon: Clock,
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  pending: {
    label: "Pending Verification",
    icon: ShieldAlert,
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md";
  className?: string;
}

export function VerificationBadge({ status, size = "sm", className }: VerificationBadgeProps) {
  const { label, icon: Icon, className: statusClass } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        statusClass,
        className
      )}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      {label}
    </span>
  );
}
