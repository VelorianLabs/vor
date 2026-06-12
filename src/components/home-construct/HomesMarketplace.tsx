"use client";

import { useState, useEffect, useCallback } from "react";
import { HomeCard } from "@/components/properties/HomeCard";
import { cn } from "@/lib/utils/cn";

const tabs = ["all", "buy", "rent", "lease"] as const;

export function HomesMarketplace() {
  const [active, setActive] = useState<(typeof tabs)[number]>("all");
  const [homeListings, setHomeListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHomeListings = useCallback(async () => {
    try {
      // Mock data for home listings
      const mockListings = [
        { id: '1', title: 'Modern Villa', listing_type: 'buy', price: 50000000, location: 'Lagos', image: '/placeholder.jpg' },
        { id: '2', title: 'Luxury Apartment', listing_type: 'rent', price: 2000000, location: 'Abuja', image: '/placeholder.jpg' },
      ];
      setHomeListings(mockListings);
    } catch (error) {
      console.error('Error loading home listings:', error);
      setHomeListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeListings();
  }, [loadHomeListings]);

  const filtered = active === "all" ? homeListings : homeListings.filter((h: any) => h.listing_type === active);

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
        {loading ? (
          <div className="col-span-full text-center py-12 text-vor-slate">Loading home listings...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-vor-slate">No home listings found</div>
        ) : (
          filtered.map((home) => (
            <HomeCard key={home.id} home={home} />
          ))
        )}
      </div>
    </>
  );
}
