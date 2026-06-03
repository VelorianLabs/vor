"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
}

export function DivisionSubnav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-vor-border bg-white sticky top-16 z-40"
      aria-label="Division"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "bg-vor-cream text-vor-navy"
                    : "text-vor-slate hover:text-vor-navy hover:bg-vor-cream/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
