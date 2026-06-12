/**
 * VOR Admin - Loans Management (Phase 3)
 *
 * Loans management page for admin to oversee all loan operations
 */

'use client';

import { useState, useEffect } from 'react';
import { Landmark, Plus, Search, MoreVertical, DollarSign, Users, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function AdminLoansPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      // Mock data for loans
      const mockLoans = [
        { id: 'LN001', borrower: 'John Doe', amount: 5000000, remaining_amount: 3500000, status: 'active', created_at: new Date().toISOString() },
        { id: 'LN002', borrower: 'Jane Smith', amount: 10000000, remaining_amount: 8000000, status: 'pending', created_at: new Date().toISOString() },
      ];
      setLoans(mockLoans);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const outstanding = loans.reduce((sum, l) => sum + (l.remaining_amount || 0), 0);
  const pendingCount = loans.filter(l => l.status === 'pending').length;
  const defaultCount = loans.filter(l => l.status === 'default').length;

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
        <StatCard title="Active Loans" value={loans.filter(l => l.status === 'active').length.toString()} icon={Landmark} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Outstanding" value={`₦${(outstanding / 1000000).toFixed(0)}M`} icon={DollarSign} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Pending Approval" value={pendingCount.toString()} icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Default Risk" value={defaultCount.toString()} icon={AlertTriangle} color="bg-red-100 text-red-700" />
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
          {loading ? (
            <p className="text-vor-slate">Loading loans...</p>
          ) : loans.length === 0 ? (
            <p className="text-vor-slate">No loans found</p>
          ) : (
            loans.map((loan) => (
              <LoanRow
                key={loan.id}
                id={loan.id}
                borrower={loan.borrower_name || 'Unknown'}
                property={loan.property_id || 'N/A'}
                amount={`₦${(loan.amount || 0).toLocaleString()}`}
                remaining={`₦${(loan.remaining_amount || 0).toLocaleString()}`}
                interestRate={loan.interest_rate || 0}
                status={loan.status || 'pending'}
                nextPayment={loan.next_payment_date ? new Date(loan.next_payment_date).toLocaleDateString() : 'N/A'}
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
