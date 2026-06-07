/**
 * VOR Admin - Loans Management (Phase 3)
 *
 * Loans management page for admin to oversee all loan operations
 */

import { Landmark, Plus, Search, MoreVertical, DollarSign, Users, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AdminLoansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Loans Management</h1>
          <p className="mt-2 text-vor-slate">Oversee all loan operations and repayments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
            Approve Loan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Loans" value="23" icon={Landmark} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Outstanding" value="₦125M" icon={DollarSign} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Pending Approval" value="8" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Default Risk" value="3" icon={AlertTriangle} color="bg-red-100 text-red-700" />
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-vor-navy">Active Loans</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
              <input
                type="text"
                placeholder="Search loans..."
                className="pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
              />
            </div>
            <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Default</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <LoanRow
            id="LOAN-001"
            borrower="John Doe"
            property="VOR-LAG-001"
            amount="₦5,000,000"
            remaining="₦3,250,000"
            interestRate={12}
            status="active"
            nextPayment="June 15, 2026"
          />
          <LoanRow
            id="LOAN-002"
            borrower="Jane Smith"
            property="VOR-ABJ-002"
            amount="₦8,000,000"
            remaining="₦6,400,000"
            interestRate={10}
            status="active"
            nextPayment="June 20, 2026"
          />
          <LoanRow
            id="LOAN-003"
            borrower="BuildRight Construction"
            property="VOR-LAG-003"
            amount="₦15,000,000"
            remaining="₦15,000,000"
            interestRate={15}
            status="pending"
            nextPayment="N/A"
          />
          <LoanRow
            id="LOAN-004"
            borrower="Michael Johnson"
            property="VOR-ABJ-003"
            amount="₦3,000,000"
            remaining="₦2,100,000"
            interestRate={14}
            status="default"
            nextPayment="Overdue"
          />
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

function LoanRow({
  id,
  borrower,
  property,
  amount,
  remaining,
  interestRate,
  status,
  nextPayment,
}: {
  id: string;
  borrower: string;
  property: string;
  amount: string;
  remaining: string;
  interestRate: number;
  status: 'active' | 'pending' | 'default' | 'paid';
  nextPayment: string;
}) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold', icon: Clock },
    default: { label: 'Default', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
    paid: { label: 'Paid', color: 'bg-slate-100 text-slate-600', icon: CheckCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${config.color}`}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{borrower}</p>
          <p className="text-sm text-vor-slate">{property}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm text-vor-slate">Amount</p>
          <p className="font-semibold text-vor-navy">{amount}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-vor-slate">Remaining</p>
          <p className="font-semibold text-vor-navy">{remaining}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-vor-slate">Interest</p>
          <p className="font-semibold text-vor-navy">{interestRate}%</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-vor-slate">Next Payment</p>
          <p className={`font-semibold ${nextPayment === 'Overdue' ? 'text-red-600' : 'text-vor-navy'}`}>{nextPayment}</p>
        </div>
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
