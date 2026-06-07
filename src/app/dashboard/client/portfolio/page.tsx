/**
 * VOR Phase 2 - Client Portfolio Page
 *
 * Client's property portfolio page showing all owned properties
 */

import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';

export default function ClientPortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">My Portfolio</h1>
        <p className="mt-2 text-vor-slate">Manage your property investments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          id="VOR-LAG-001"
          name="Lekki Peninsula Phase 1"
          location="Lekki, Lagos"
          type="Residential Land"
          purchaseDate="January 15, 2024"
          currentValue="₦15,500,000"
          purchaseValue="₦12,000,000"
          status="active"
          progress={45}
        />
        <PropertyCard
          id="VOR-ABJ-002"
          name="Guaranteed Estate Plot"
          location="Katampe, Abuja"
          type="Commercial Land"
          purchaseDate="March 22, 2024"
          currentValue="₦25,000,000"
          purchaseValue="₦20,000,000"
          status="active"
          progress={30}
        />
        <PropertyCard
          id="VOR-LAG-003"
          name="Victoria Island Development"
          location="Victoria Island, Lagos"
          type="Mixed Use"
          purchaseDate="May 10, 2024"
          currentValue="₦45,000,000"
          purchaseValue="₦40,000,000"
          status="pending"
          progress={0}
        />
      </div>
    </div>
  );
}

function PropertyCard({
  id,
  name,
  location,
  type,
  purchaseDate,
  currentValue,
  purchaseValue,
  status,
  progress,
}: {
  id: string;
  name: string;
  location: string;
  type: string;
  purchaseDate: string;
  currentValue: string;
  purchaseValue: string;
  status: string;
  progress: number;
}) {
  const appreciation = ((parseInt(currentValue.replace(/[₦,]/g, '')) - parseInt(purchaseValue.replace(/[₦,]/g, ''))) / parseInt(purchaseValue.replace(/[₦,]/g, ''))) * 100;

  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-vor-slate">{id}</span>
          <h3 className="text-lg font-semibold text-vor-navy mt-1">{name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-vor-trust/10 text-vor-trust' : 'bg-amber-50 text-amber-700'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-3">
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
          <span>Purchased: {purchaseDate}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-vor-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-vor-slate">Current Value</span>
          <span className="text-lg font-bold text-vor-navy">{currentValue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-vor-trust" />
          <span className="text-vor-trust font-medium">+{appreciation.toFixed(1)}% appreciation</span>
        </div>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-vor-slate">Development Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-vor-cream rounded-full overflow-hidden">
              <div className="h-full bg-vor-gold rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
