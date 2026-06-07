/**
 * VOR Phase 2 - Investor Marketplace Page
 *
 * Investment marketplace page for investors to browse and invest in opportunities
 */

import { TrendingUp, MapPin, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';

export default function InvestorMarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Investment Marketplace</h1>
        <p className="mt-2 text-vor-slate">Browse and invest in verified real estate opportunities</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Locations</option>
          <option>Lagos</option>
          <option>Abuja</option>
          <option>Port Harcourt</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Types</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Mixed Use</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Status</option>
          <option>Open</option>
          <option>Closing Soon</option>
          <option>Fully Funded</option>
        </select>
      </div>

      {/* Investment Pools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InvestmentPoolCard
          id="POOL-001"
          name="Lekki Peninsula Development Pool"
          location="Lekki, Lagos"
          type="Residential"
          targetAmount="₦100,000,000"
          raisedAmount="₦75,000,000"
          roi={18}
          minInvestment="₦1,000,000"
          closingDate="July 30, 2026"
          status="open"
        />
        <InvestmentPoolCard
          id="POOL-002"
          name="Abuja Prime Estate Fund"
          location="Katampe, Abuja"
          type="Commercial"
          targetAmount="₦150,000,000"
          raisedAmount="₦45,000,000"
          roi={22}
          minInvestment="₦2,000,000"
          closingDate="August 15, 2026"
          status="open"
        />
        <InvestmentPoolCard
          id="POOL-003"
          name="Victoria Island Mixed Development"
          location="Victoria Island, Lagos"
          type="Mixed Use"
          targetAmount="₦200,000,000"
          raisedAmount="₦185,000,000"
          roi={15}
          minInvestment="₦5,000,000"
          closingDate="June 20, 2026"
          status="closing"
        />
        <InvestmentPoolCard
          id="POOL-004"
          name="Port Harcourt Garden City"
          location="Port Harcourt, Rivers"
          type="Residential"
          targetAmount="₦80,000,000"
          raisedAmount="₦80,000,000"
          roi={20}
          minInvestment="₦500,000"
          closingDate="May 15, 2026"
          status="fully_funded"
        />
      </div>
    </div>
  );
}

function InvestmentPoolCard({
  id,
  name,
  location,
  type,
  targetAmount,
  raisedAmount,
  roi,
  minInvestment,
  closingDate,
  status,
}: {
  id: string;
  name: string;
  location: string;
  type: string;
  targetAmount: string;
  raisedAmount: string;
  roi: number;
  minInvestment: string;
  closingDate: string;
  status: 'open' | 'closing' | 'fully_funded';
}) {
  const progress = (parseInt(raisedAmount.replace(/[₦,]/g, '')) / parseInt(targetAmount.replace(/[₦,]/g, ''))) * 100;

  const statusConfig = {
    open: { label: 'Open', color: 'bg-vor-trust/10 text-vor-trust' },
    closing: { label: 'Closing Soon', color: 'bg-amber-50 text-amber-800' },
    fully_funded: { label: 'Fully Funded', color: 'bg-slate-100 text-slate-600' },
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
          <TrendingUp className="h-4 w-4" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          <span>Closes: {closingDate}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-vor-slate">Raised</span>
          <span className="font-medium">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-vor-cream rounded-full overflow-hidden">
          <div className="h-full bg-vor-trust rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1 text-vor-slate">
          <span>{raisedAmount}</span>
          <span>{targetAmount}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-vor-slate">Min. Investment</p>
          <p className="text-sm font-semibold text-vor-navy">{minInvestment}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Projected ROI</p>
          <p className="text-sm font-semibold text-vor-trust">{roi}%</p>
        </div>
      </div>

      {status !== 'fully_funded' && (
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          Invest Now
          <ArrowUpRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
