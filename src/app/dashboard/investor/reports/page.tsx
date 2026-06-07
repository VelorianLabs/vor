/**
 * VOR Phase 2 - Investor Reports Page
 *
 * Investor's reports page showing investment performance reports
 */

import { BarChart3, Calendar, Download, FileText, TrendingUp, DollarSign } from 'lucide-react';

export default function InvestorReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Investment Reports</h1>
        <p className="mt-2 text-vor-slate">View your investment performance reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Reports" value="12" icon={FileText} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="This Month" value="3" icon={Calendar} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Avg. Return" value="15%" icon={TrendingUp} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Total Dividends" value="₦550,000" icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" />
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Available Reports</h2>
        <div className="space-y-4">
          <ReportRow
            title="Q1 2026 Portfolio Performance"
            description="Comprehensive Q1 performance analysis"
            date="April 1, 2026"
            type="quarterly"
          />
          <ReportRow
            title="March 2026 Monthly Statement"
            description="Monthly investment summary"
            date="April 1, 2026"
            type="monthly"
          />
          <ReportRow
            title="Lekki Peninsula Pool Update"
            description="Specific pool performance update"
            date="March 25, 2026"
            type="pool"
          />
          <ReportRow
            title="Q4 2025 Portfolio Performance"
            description="Comprehensive Q4 performance analysis"
            date="January 1, 2026"
            type="quarterly"
          />
          <ReportRow
            title="Annual Investment Summary 2025"
            description="Year-end investment summary"
            date="January 1, 2026"
            type="annual"
          />
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Generate Custom Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-vor-navy">Performance Report</p>
              <p className="text-sm text-vor-slate">Generate performance analysis</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <DollarSign className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-vor-navy">Dividend Report</p>
              <p className="text-sm text-vor-slate">Generate dividend summary</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-vor-navy">Custom Report</p>
              <p className="text-sm text-vor-slate">Create custom report</p>
            </div>
          </button>
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

function ReportRow({
  title,
  description,
  date,
  type,
}: {
  title: string;
  description: string;
  date: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'pool';
}) {
  const typeConfig = {
    monthly: { label: 'Monthly', color: 'bg-vor-navy/10 text-vor-navy' },
    quarterly: { label: 'Quarterly', color: 'bg-vor-gold/10 text-vor-gold' },
    annual: { label: 'Annual', color: 'bg-vor-trust/10 text-vor-trust' },
    pool: { label: 'Pool', color: 'bg-vor-navy/10 text-vor-navy' },
  };

  const config = typeConfig[type];

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-vor-navy/10 text-vor-navy">
              {config.label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{title}</p>
          <p className="text-sm text-vor-slate">{description}</p>
          <div className="flex items-center gap-1 text-xs text-vor-slate mt-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
      <button className="p-2 rounded hover:bg-vor-cream text-vor-slate hover:text-vor-navy">
        <Download className="h-5 w-5" />
      </button>
    </div>
  );
}
