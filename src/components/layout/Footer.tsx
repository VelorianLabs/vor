import Link from "next/link";
import { Shield } from "lucide-react";
import {
  TERRAIN_NAV,
  HOME_NAV,
  FINANCE_NAV,
  CORPORATE_NAV,
  REGULATORY_BODIES,
} from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer className="bg-vor-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-vor-gold">
                <Shield className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-white">VOR</span>
                <span className="block text-xs text-white/50">Vintage Outlook Realty</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              A transparent, technology-driven real estate and infrastructure ecosystem
              focused on verified land, trusted development, and structured investment
              opportunities across Nigeria.
            </p>
            <p className="mt-4 text-xs font-semibold text-vor-gold uppercase tracking-wider">
              Trust · Transparency · Verified Realty
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">VOR Terrain</h4>
            <ul className="space-y-2 text-sm">
              {TERRAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-vor-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Home & Construct</h4>
            <ul className="space-y-2 text-sm">
              {HOME_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-vor-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Finance & Corporate</h4>
            <ul className="space-y-2 text-sm">
              {FINANCE_NAV.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-vor-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              {CORPORATE_NAV.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-vor-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/50 mb-3">Regulatory & industry references</p>
          <div className="flex flex-wrap gap-2">
            {REGULATORY_BODIES.map((body) => (
              <span
                key={body.abbr}
                className="text-xs px-2 py-1 rounded bg-white/5 text-white/60"
                title={body.name}
              >
                {body.abbr}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Vanguard Of Realty (VOR). All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/corporate/legal" className="hover:text-white">
              Legal
            </Link>
            <Link href="/corporate/transparency" className="hover:text-white">
              Transparency
            </Link>
            <Link href="/corporate/fraud-prevention" className="hover:text-white">
              Fraud Prevention
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
