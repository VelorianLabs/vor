"use client";

import { useState } from "react";
import { HomeCard } from "@/components/properties/HomeCard";
import { homeListings } from "@/lib/data/mock";
import { cn } from "@/lib/utils/cn";

const tabs = ["all", "buy", "rent", "lease"] as const;

export function HomesMarketplace() {
  const [active, setActive] = useState<(typeof tabs)[number]>("all");
  const filtered =
    active === "all" ? homeListings : homeListings.filter((h) => h.listingType === active);

  return (
    <>
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors",
              active === tab
                ? "bg-vor-navy text-white"
                : "bg-vor-cream text-vor-slate hover:text-vor-navy"
            )}
          >
            {tab === "all" ? "All listings" : `For ${tab}`}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </div>
    </>
  );
}
