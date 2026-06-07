/**
 * VOR Phase 2 - Finance Officer Reports Page
 *
 * Finance officer's financial reports page
 */

import { BarChart3, Calendar, Download, FileText, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function FinanceOfficerReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Financial Reports</h1>
        <p className="mt-2 text-vor-slate">View and generate financial reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Monthly Revenue" value="₦45.2M" icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" trend="+18%" />
        <StatCard title="Active Clients" value="156" icon={Users} color="bg-vor-navy/10 text-vor-navy" trend="+12" />
        <StatCard title="Reports Generated" value="24" icon={FileText} color="bg-vor-gold/10 text-vor-gold" trend="+5" />
        <StatCard title="Growth Rate" value="23%" icon={TrendingUp} color="bg-vor-trust/10 text-vor-trust" trend="+3%" />
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReportCard
            title="Monthly Revenue Report"
            description="Comprehensive monthly revenue analysis"
            lastGenerated="June 1, 2026"
            type="financial"
          />
          <ReportCard
            title="Transaction Summary"
            description="All transactions for the current month"
            lastGenerated="June 5, 2026"
            type="transaction"
          />
          <ReportCard
            title="Outstanding Invoices"
            description="List of all unpaid and overdue invoices"
            lastGenerated="June 4, 2026"
            type="invoice"
          />
          <ReportCard
            title="Client Payment History"
            description="Payment history by client"
            lastGenerated="June 3, 2026"
            type="client"
          />
          <ReportCard
            title="Investment Pool Performance"
            description="Performance metrics for investment pools"
            lastGenerated="June 1, 2026"
            type="investment"
          />
          <ReportCard
            title="Quarterly Financial Statement"
            description="Q2 2026 financial statement"
            lastGenerated="May 31, 2026"
            type="financial"
          />
        </div>
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-vor-navy">Revenue Report</p>
              <p className="text-sm text-vor-slate">Generate revenue analysis</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium text-vor-navy">Invoice Report</p>
              <p className="text-sm text-vor-slate">Generate invoice summary</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
              <TrendingUp className="h-5 w-5" />
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

function StatCard({ title, value, icon: Icon, color, trend }: { title: string; value: string; icon: any; color: string; trend: string }) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-vor-slate">{title}</p>
            <p className="mt-1 text-2xl font-bold text-vor-navy">{value}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-vor-trust">{trend}</span>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  description,
  lastGenerated,
  type,
}: {
  title: string;
  description: string;
  lastGenerated: string;
  type: 'financial' | 'transaction' | 'invoice' | 'client' | 'investment';
}) {
  return (
    <div className="border border-vor-border rounded-lg p-4 hover:bg-vor-cream transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileText className="h-5 w-5" />
        </div>
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <Download className="h-4 w-4" />
        </button>
      </div>
      <h3 className="font-medium text-vor-navy mb-1">{title}</h3>
      <p className="text-sm text-vor-slate mb-3">{description}</p>
      <div className="flex items-center gap-1 text-xs text-vor-slate">
        <Calendar className="h-3 w-3" />
        <span>Last generated: {lastGenerated}</span>
      </div>
    </div>
  );
}
