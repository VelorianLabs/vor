"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function LandFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<Record<string, string[]>>({});
  const [titleTypes, setTitleTypes] = useState<string[]>([]);
  const [investmentGrades, setInvestmentGrades] = useState<string[]>([]);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      // Mock filter options
      const mockStates = ['Lagos', 'Abuja', 'Rivers', 'Oyo'];
      const mockLgas: Record<string, string[]> = {
        'Lagos': ['Ikeja', 'Lekki', 'Victoria Island'],
        'Abuja': ['Gwarinpa', 'Wuse', 'Maitama'],
        'Rivers': ['Port Harcourt', 'Obio-Akpor'],
        'Oyo': ['Ibadan North', 'Ibadan South'],
      };
      const mockTitleTypes = ['C of O', 'Gazette', 'Deed of Assignment'];
      const mockGrades = ['A', 'B', 'C'];

      setStates(mockStates);
      setLgas(mockLgas);
      setTitleTypes(mockTitleTypes);
      setInvestmentGrades(mockGrades);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

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
  const currentLgas = state ? lgas[state] ?? [] : [];

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
            {states.map((s) => (
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
            {currentLgas.map((l) => (
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
            {titleTypes.map((t) => (
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
            {investmentGrades.map((g) => (
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
