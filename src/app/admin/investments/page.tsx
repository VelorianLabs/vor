/**
 * VOR Admin - Investments Management (Phase 3)
 *
 * Investments management page for admin to oversee all investment pools
 */

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Plus, Search, MoreVertical, DollarSign, Users, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AdminInvestmentsPage() {
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvestmentPools();
  }, []);

  const loadInvestmentPools = async () => {
    try {
      const response = await fetch('/api/investment-pools');
      const data = await response.json();
      setPools(data || []);
    } catch (error) {
      console.error('Error loading investment pools:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRaised = pools.reduce((sum, p) => sum + (p.raised_amount || 0), 0);
  const openPools = pools.filter(p => p.status === 'open').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Investments Management</h1>
          <p className="mt-2 text-vor-slate">Oversee all investment pools and opportunities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Create Pool
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Pools" value={pools.length.toString()} icon={TrendingUp} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Total Raised" value={`₦${(totalRaised / 1000000).toFixed(1)}M`} icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Active Investors" value={pools.reduce((sum, p) => sum + (p.investor_count || 0), 0).toString()} icon={Users} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Open for Investment" value={openPools.toString()} icon={CheckCircle} color="bg-vor-gold/10 text-vor-gold" />
      </div>

      {/* Investment Pools */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-vor-navy">Investment Pools</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
            <input
              type="text"
              placeholder="Search pools..."
              className="pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
            />
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <p className="text-vor-slate">Loading investment pools...</p>
          ) : pools.length === 0 ? (
            <p className="text-vor-slate">No investment pools found</p>
          ) : (
            pools.map((pool) => (
              <InvestmentPoolRow
                key={pool.id}
                id={pool.id}
                name={pool.name}
                location={pool.state}
                targetAmount={`₦${(pool.target_amount || 0).toLocaleString()}`}
                raisedAmount={`₦${(pool.raised_amount || 0).toLocaleString()}`}
                roi={pool.roi || 0}
                investors={pool.investor_count || 0}
                status={pool.status || 'open'}
                closingDate={pool.closing_date ? new Date(pool.closing_date).toLocaleDateString() : 'N/A'}
              />
            ))
          )}
        </div>
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

function InvestmentPoolRow({
  id,
  name,
  location,
  targetAmount,
  raisedAmount,
  roi,
  investors,
  status,
  closingDate,
}: {
  id: string;
  name: string;
  location: string;
  targetAmount: string;
  raisedAmount: string;
  roi: number;
  investors: number;
  status: 'open' | 'closing' | 'fully_funded' | 'closed';
  closingDate: string;
}) {
  const progress = (parseInt(raisedAmount.replace(/[₦,]/g, '')) / parseInt(targetAmount.replace(/[₦,]/g, ''))) * 100;

  const statusConfig = {
    open: { label: 'Open', color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
    closing: { label: 'Closing Soon', color: 'bg-amber-50 text-amber-800', icon: Clock },
    fully_funded: { label: 'Fully Funded', color: 'bg-slate-100 text-slate-600', icon: CheckCircle },
    closed: { label: 'Closed', color: 'bg-slate-100 text-slate-600', icon: AlertTriangle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${config.color}`}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{name}</p>
          <p className="text-sm text-vor-slate">{location}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-vor-slate">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {investors} investors
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Closes: {closingDate}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm text-vor-slate">Raised</p>
          <p className="font-semibold text-vor-navy">{raisedAmount}</p>
          <p className="text-xs text-vor-slate">of {targetAmount}</p>
        </div>
        <div className="w-32">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-vor-slate">Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-vor-cream rounded-full overflow-hidden">
            <div className="h-full bg-vor-trust rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-vor-slate">ROI</p>
          <p className="font-semibold text-vor-trust">{roi}%</p>
        </div>
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
