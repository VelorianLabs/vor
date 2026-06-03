"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { STATES, LGAS, TITLE_TYPES, INVESTMENT_GRADES } from "@/lib/data/mock";

export function LandFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/terrain?${params.toString()}`);
    },
    [router, searchParams]
  );

  const state = searchParams.get("state") ?? "";
  const lgas = state ? LGAS[state] ?? [] : [];

  return (
    <aside className="bg-white rounded-xl border border-vor-border p-6 shadow-card h-fit">
      <h2 className="font-display text-lg font-semibold text-vor-navy mb-4">Filter listings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="filter-state" className="block text-sm font-medium text-vor-navy mb-1">
            State
          </label>
          <select
            id="filter-state"
            value={state}
            onChange={(e) => {
              update("state", e.target.value);
              update("lga", "");
            }}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm focus:outline focus:outline-2 focus:outline-vor-gold"
          >
            <option value="">All states</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-lga" className="block text-sm font-medium text-vor-navy mb-1">
            LGA
          </label>
          <select
            id="filter-lga"
            value={searchParams.get("lga") ?? ""}
            onChange={(e) => update("lga", e.target.value)}
            disabled={!state}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm disabled:opacity-50 focus:outline focus:outline-2 focus:outline-vor-gold"
          >
            <option value="">All LGAs</option>
            {lgas.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-title" className="block text-sm font-medium text-vor-navy mb-1">
            Title type
          </label>
          <select
            id="filter-title"
            value={searchParams.get("titleType") ?? ""}
            onChange={(e) => update("titleType", e.target.value)}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm focus:outline focus:outline-2 focus:outline-vor-gold"
          >
            <option value="">All title types</option>
            {TITLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-grade" className="block text-sm font-medium text-vor-navy mb-1">
            Investment grade
          </label>
          <select
            id="filter-grade"
            value={searchParams.get("grade") ?? ""}
            onChange={(e) => update("grade", e.target.value)}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm focus:outline focus:outline-2 focus:outline-vor-gold"
          >
            <option value="">All grades</option>
            {INVESTMENT_GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-price" className="block text-sm font-medium text-vor-navy mb-1">
            Max price (₦)
          </label>
          <input
            id="filter-price"
            type="number"
            placeholder="e.g. 50000000"
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={(e) => update("maxPrice", e.target.value)}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm focus:outline focus:outline-2 focus:outline-vor-gold"
          />
        </div>

        <div>
          <label htmlFor="filter-size" className="block text-sm font-medium text-vor-navy mb-1">
            Min size (sqm)
          </label>
          <input
            id="filter-size"
            type="number"
            placeholder="e.g. 400"
            defaultValue={searchParams.get("minSize") ?? ""}
            onBlur={(e) => update("minSize", e.target.value)}
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm focus:outline focus:outline-2 focus:outline-vor-gold"
          />
        </div>
      </div>
    </aside>
  );
}
