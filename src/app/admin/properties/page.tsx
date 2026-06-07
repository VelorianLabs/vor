/**
 * VOR Admin - Properties Management (Phase 1)
 *
 * Properties management page for admin to manage all properties
 */

import { Map, Plus, Search, MoreVertical, Building2, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Properties Management</h1>
          <p className="mt-2 text-vor-slate">Manage all properties and land listings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Add Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Properties" value="156" icon={Map} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Verified" value="142" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Pending" value="12" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Featured" value="24" icon={Building2} color="bg-vor-navy/10 text-vor-navy" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        </div>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Types</option>
          <option>Residential Land</option>
          <option>Commercial Land</option>
          <option>Mixed Use</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Locations</option>
          <option>Lagos</option>
          <option>Abuja</option>
          <option>Port Harcourt</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Status</option>
          <option>Verified</option>
          <option>Pending</option>
          <option>Sold</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          id="VOR-LAG-001"
          name="Lekki Peninsula Phase 1"
          location="Lekki, Lagos"
          type="Residential Land"
          price="₦12,000,000"
          status="verified"
          listedDate="January 15, 2024"
        />
        <PropertyCard
          id="VOR-ABJ-002"
          name="Guaranteed Estate Plot"
          location="Katampe, Abuja"
          type="Commercial Land"
          price="₦20,000,000"
          status="verified"
          listedDate="March 22, 2024"
        />
        <PropertyCard
          id="VOR-LAG-003"
          name="Victoria Island Development"
          location="Victoria Island, Lagos"
          type="Mixed Use"
          price="₦40,000,000"
          status="pending"
          listedDate="June 1, 2026"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-vor-navy">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({
  id,
  name,
  location,
  type,
  price,
  status,
  listedDate,
}: {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  status: 'verified' | 'pending' | 'sold';
  listedDate: string;
}) {
  const statusConfig = {
    verified: { label: 'Verified', color: 'bg-vor-trust/10 text-vor-trust' },
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold' },
    sold: { label: 'Sold', color: 'bg-slate-100 text-slate-600' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-vor-slate">{id}</span>
          <h3 className="text-lg font-semibold text-vor-navy mt-1">{name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Building2 className="h-4 w-4" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          <span>Listed: {listedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <p className="text-lg font-bold text-vor-navy">{price}</p>
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
