import { BarChart3, Map, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "Verified listings", value: "24", icon: Map },
  { label: "Active projects", value: "3", icon: BarChart3 },
  { label: "Investors", value: "156", icon: Users },
  { label: "Pools raised", value: "₦69B", icon: TrendingUp },
];

export const metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-vor-navy">Dashboard</h1>
      <p className="text-vor-slate mt-1 text-sm">
        Placeholder admin panel. Connect NestJS API + PostgreSQL in Phase 2.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-vor-border p-5 shadow-card"
          >
            <stat.icon className="h-5 w-5 text-vor-gold mb-3" aria-hidden />
            <p className="text-2xl font-semibold text-vor-navy">{stat.value}</p>
            <p className="text-sm text-vor-slate">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-vor-border p-6">
        <h2 className="font-semibold text-vor-navy">Recent activity</h2>
        <p className="mt-4 text-sm text-vor-slate">
          Activity feed will populate from API routes when backend is connected.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-vor-slate">
          <li>· New verification request — Ibeju-Lekki parcel</li>
          <li>· Inspection booked — Epe Waterfront Estate Plot</li>
          <li>· Investment pool contribution — Lekki Corridor Fund II</li>
        </ul>
      </div>
    </div>
  );
}