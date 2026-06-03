import Image from "next/image";
import Link from "next/link";
import { MapPin, Ruler } from "lucide-react";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { formatNaira } from "@/lib/utils/cn";
import type { LandProperty } from "@/lib/types";

export function PropertyCard({ property }: { property: LandProperty }) {
  return (
    <article className="group bg-white rounded-xl border border-vor-border shadow-card overflow-hidden hover:shadow-elevated transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <VerificationBadge status={property.verificationStatus} />
          <GradeBadge grade={property.investmentGrade} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-vor-navy line-clamp-1">
          <Link href={`/terrain/${property.id}`} className="hover:text-vor-trust">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-vor-slate">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {property.lga}, {property.state}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-vor-slate uppercase tracking-wide">Price</p>
            <p className="text-lg font-semibold text-vor-navy">{formatNaira(property.price)}</p>
          </div>
          <div className="text-right">
            <p className="flex items-center gap-1 text-sm text-vor-slate">
              <Ruler className="h-3.5 w-3.5" aria-hidden />
              {property.sizeSqm.toLocaleString()} sqm
            </p>
            <p className="text-sm font-medium text-vor-trust">{property.roiProjection}% ROI proj.</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-vor-slate">{property.titleType}</p>
      </div>
    </article>
  );
}
