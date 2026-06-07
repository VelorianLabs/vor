import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, MapPin } from "lucide-react";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { formatNaira } from "@/lib/utils/cn";
import type { HomeListing } from "@/lib/types";

const listingLabels = { buy: "For Sale", rent: "For Rent", lease: "For Lease" };

export function HomeCard({ home }: { home: HomeListing }) {
  return (
    <article className="bg-white rounded-xl border border-vor-border shadow-card overflow-hidden hover:shadow-elevated transition-shadow">
      <div className="relative aspect-[4/3]">
        <Image src={home.image} alt={home.title} fill className="object-cover" sizes="33vw" />
        <span className="absolute top-3 left-3 bg-vor-navy text-white text-xs font-semibold px-2.5 py-1 rounded">
          {listingLabels[home.listingType]}
        </span>
        <div className="absolute top-3 right-3">
          <VerificationBadge status={home.verificationStatus} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-vor-navy">
          <Link href={`/home-construct/${home.id}`} className="hover:text-vor-trust">
            {home.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-vor-slate">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {home.lga}, {home.state}
        </p>
        <div className="mt-3 flex gap-4 text-sm text-vor-slate">
          {home.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" aria-hidden />
              {home.bedrooms} bed
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" aria-hidden />
            {home.bathrooms} bath
          </span>
        </div>
        <p className="mt-3 text-lg font-semibold text-vor-navy">
          {formatNaira(home.price)}
          {home.listingType === "rent" && <span className="text-sm font-normal text-vor-slate">/yr</span>}
        </p>
      </div>
    </article>
  );
}
