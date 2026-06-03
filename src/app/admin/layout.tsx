import Link from "next/link";
import { Shield, LayoutDashboard, Map, Home, Landmark, Settings } from "lucide-react";

/**
 * Admin layout stub — Phase 2 will add auth middleware (NextAuth / NestJS JWT).
 * Protected route placeholder; no real authentication in MVP.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-vor-navy text-white shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-vor-gold" aria-hidden />
            <span className="font-display font-semibold">VOR Admin</span>
          </Link>
          <p className="text-xs text-white/50 mt-1">Protected area (stub)</p>
        </div>
        <nav className="p-4 space-y-1 flex-1" aria-label="Admin">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
            { icon: Map, label: "Land listings", href: "/admin" },
            { icon: Home, label: "Projects", href: "/admin" },
            { icon: Landmark, label: "Investments", href: "/admin" },
            { icon: Settings, label: "Settings", href: "/admin" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/40">
          Auth middleware — Phase 2
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-vor-border px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-vor-slate">
            Admin dashboard · <span className="text-amber-600 font-medium">Unauthenticated stub</span>
          </p>
          <Link href="/" className="text-sm text-vor-trust hover:underline">
            ← Back to site
          </Link>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
