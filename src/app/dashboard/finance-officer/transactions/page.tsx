/**
 * VOR Phase 2 - Finance Officer Transactions Page
 *
 * Finance officer's transaction management page
 */

import { ArrowRightLeft, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Search } from 'lucide-react';

export default function FinanceOfficerTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Transactions</h1>
          <p className="mt-2 text-vor-slate">Manage all financial transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Volume" value="₦125.8M" icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Today" value="₦2.4M" icon={ArrowRightLeft} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Pending" value="8" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Completed" value="148" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          <TransactionRow
            id="TXN-001"
            type="payment"
            description="Client payment - VOR-LAG-001"
            amount="₦1,225,000"
            date="June 5, 2026"
            status="completed"
            source="Paystack"
          />
          <TransactionRow
            id="TXN-002"
            type="deposit"
            description="Investor funding - Pool A"
            amount="₦5,000,000"
            date="June 5, 2026"
            status="completed"
            source="Flutterwave"
          />
          <TransactionRow
            id="TXN-003"
            type="payout"
            description="Contractor payment - Phase 1"
            amount="₦2,500,000"
            date="June 4, 2026"
            status="pending"
            source="Bank Transfer"
          />
          <TransactionRow
            id="TXN-004"
            type="payment"
            description="Client payment - VOR-ABJ-002"
            amount="₦2,500,000"
            date="June 4, 2026"
            status="completed"
            source="Paystack"
          />
          <TransactionRow
            id="TXN-005"
            type="refund"
            description="Refund - Overpayment"
            amount="₦125,000"
            date="June 3, 2026"
            status="failed"
            source="Bank Transfer"
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

function TransactionRow({
  id,
  type,
  description,
  amount,
  date,
  status,
  source,
}: {
  id: string;
  type: 'payment' | 'deposit' | 'payout' | 'refund';
  description: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  source: string;
}) {
  const statusConfig = {
    completed: { label: 'Completed', color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold', icon: Clock },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const typeConfig = {
    payment: { label: 'Payment', color: 'bg-vor-trust/10 text-vor-trust' },
    deposit: { label: 'Deposit', color: 'bg-vor-navy/10 text-vor-navy' },
    payout: { label: 'Payout', color: 'bg-vor-gold/10 text-vor-gold' },
    refund: { label: 'Refund', color: 'bg-red-100 text-red-700' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <ArrowRightLeft className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeConfig[type].color}`}>
              {typeConfig[type].label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{description}</p>
          <div className="flex items-center gap-2 text-sm text-vor-slate mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span>•</span>
            <span>{source}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-vor-navy">{amount}</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
}
