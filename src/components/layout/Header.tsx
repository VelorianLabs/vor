"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DIVISIONS, CORPORATE_NAV } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [corporateOpen, setCorporateOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/65 backdrop-blur border-b border-vor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-vor-navy text-vor-gold">
              <Shield className="h-5 w-5" aria-hidden />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-semibold text-vor-navy leading-none">
                VOR
              </span>
              <span className="block text-[10px] text-vor-slate tracking-widest uppercase">
                Vintage Outlook Realty
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {DIVISIONS.filter((d) => d.id !== "main").map((division) => (
              <Link
                key={division.id}
                href={division.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(division.href)
                    ? "text-vor-navy bg-vor-cream"
                    : "text-vor-slate hover:text-vor-navy hover:bg-vor-cream/60"
                )}
              >
                {division.label}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCorporateOpen(!corporateOpen)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname.startsWith("/corporate")
                    ? "text-vor-navy bg-vor-cream"
                    : "text-vor-slate hover:text-vor-navy"
                )}
              >
                Corporate
              </button>
              {corporateOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCorporateOpen(false)} aria-hidden />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg border border-vor-border shadow-elevated py-2 z-20">
                    {CORPORATE_NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setCorporateOpen(false)}
                        className="block px-4 py-2 text-sm text-vor-navy hover:bg-vor-cream"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button href="/corporate/contact" variant="ghost" size="sm">
              Contact
            </Button>
            <Button href="/finance" variant="primary" size="sm">
              Invest with VOR
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-vor-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-vor-border bg-white px-4 py-4 space-y-1" aria-label="Mobile">
          {DIVISIONS.filter((d) => d.id !== "main").map((division) => (
            <Link
              key={division.id}
              href={division.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-vor-navy rounded-md hover:bg-vor-cream"
            >
              {division.label}
            </Link>
          ))}
          <p className="px-3 pt-3 text-xs font-semibold text-vor-slate uppercase">Corporate</p>
          {CORPORATE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-vor-slate hover:text-vor-navy"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Button href="/finance" variant="primary" size="md" className="w-full">
              Invest with VOR
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
