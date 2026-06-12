/**
 * VOR Admin - Finance Management (Phase 2)
 *
 * Finance management page for admin to oversee all financial operations
 */

'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, ArrowRightLeft, FileText, Plus, Search, MoreVertical, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function AdminFinancePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      // Mock data for transactions
      const mockTransactions = [
        { id: 'TXN001', type: 'payment', description: 'Property Purchase', amount: 5000000, status: 'completed', source: 'Bank Transfer', created_at: new Date().toISOString() },
        { id: 'TXN002', type: 'deposit', description: 'Investment Deposit', amount: 10000000, status: 'pending', source: 'Bank Transfer', created_at: new Date().toISOString() },
      ];
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Finance Management</h1>
          <p className="mt-2 text-vor-slate">Oversee all financial operations and transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Generate Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₦${(totalRevenue / 1000000).toFixed(2)}M`} icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" trend="" />
        <StatCard title="Total Transactions" value={transactions.length.toString()} icon={ArrowRightLeft} color="bg-vor-navy/10 text-vor-navy" trend="" />
        <StatCard title="Pending" value={pendingCount.toString()} icon={FileText} color="bg-vor-gold/10 text-vor-gold" trend="" />
        <StatCard title="Completed" value={transactions.filter(t => t.status === 'completed').length.toString()} icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" trend="" />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-vor-navy">Recent Transactions</h2>
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
        <div className="space-y-4">
          {loading ? (
            <p className="text-vor-slate">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-vor-slate">No transactions found</p>
          ) : (
            transactions.map((txn) => (
              <TransactionRow
                key={txn.id}
                id={txn.id}
                type={txn.type || 'payment'}
                description={txn.description || 'Transaction'}
                amount={`₦${(txn.amount || 0).toLocaleString()}`}
                date={txn.created_at ? new Date(txn.created_at).toLocaleDateString() : 'N/A'}
                status={txn.status || 'pending'}
                source={txn.source || 'Bank Transfer'}
              />
            ))
          )}
        </div>
      </div>

      {/* Financial Alerts */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Financial Alerts</h2>
        <div className="space-y-4">
          {pendingCount > 0 ? (
            <AlertItem
              type="warning"
              title="Pending Transactions"
              description={`${pendingCount} transactions pending review`}
              time="Recently"
            />
          ) : (
            <p className="text-vor-slate">No financial alerts at this time</p>
          )}
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
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
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
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function AlertItem({
  type,
  title,
  description,
  time,
}: {
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  time: string;
}) {
  const typeConfig = {
    warning: { color: 'bg-vor-gold/10 text-vor-gold', icon: AlertTriangle },
    error: { color: 'bg-red-100 text-red-700', icon: AlertTriangle },
    info: { color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg border ${type === 'error' ? 'border-red-200 bg-red-50' : 'border-vor-border'}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{description}</p>
        <p className="text-xs text-vor-slate mt-1">{time}</p>
      </div>
    </div>
  );
}
