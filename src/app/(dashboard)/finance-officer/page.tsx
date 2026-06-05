/**
 * VOR Phase 2 - Finance Officer Dashboard Overview
 * 
 * Overview of payment operations, transaction history,
 * invoice management, and financial reporting.
 */

import { DollarSign, CreditCard, TrendingUp, FileText, CheckCircle, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data
const financeStats = {
  totalTransactions: 245,
  totalVolume: 875000000,
  pendingTransactions: 12,
  refundRequests: 3,
  monthlyRevenue: 45000000,
  averageTransactionValue: 3571428,
};

const recentTransactions = [
  {
    id: 'txn-001',
    reference: 'VOR-PAY-2024-07-001',
    type: 'INSTALLMENT',
    amount: 2500000,
    method: 'PAYSTACK',
    status: 'COMPLETED',
    user: 'John Doe',
    property: 'Ndukego Housing Parcels',
    processedAt: '2024-07-10T10:30:00Z',
  },
  {
    id: 'txn-002',
    reference: 'VOR-PAY-2024-07-002',
    type: 'INVESTMENT',
    amount: 10000000,
    method: 'FLUTTERWAVE',
    status: 'COMPLETED',
    user: 'Jane Investor',
    project: 'Lekki Corridor Land Fund III',
    processedAt: '2024-07-09T14:20:00Z',
  },
  {
    id: 'txn-003',
    reference: 'VOR-PAY-2024-07-003',
    type: 'VERIFICATION_FEE',
    amount: 500000,
    method: 'PAYSTACK',
    status: 'PENDING',
    user: 'Mike Johnson',
    property: 'Ajah Hillside Development',
    processedAt: '2024-07-08T09:15:00Z',
  },
  {
    id: 'txn-004',
    reference: 'VOR-PAY-2024-07-004',
    type: 'PROPERTY_PURCHASE',
    amount: 42000000,
    method: 'FLUTTERWAVE',
    status: 'FAILED',
    user: 'Sarah Williams',
    property: 'Ibeju-Lekki Industrial Zone',
    processedAt: '2024-07-07T16:45:00Z',
    failureReason: 'Insufficient funds',
  },
  {
    id: 'txn-005',
    reference: 'VOR-PAY-2024-07-005',
    type: 'RESERVATION',
    amount: 500000,
    method: 'PAYSTACK',
    status: 'COMPLETED',
    user: 'David Brown',
    property: 'Lugbe Residential Extension',
    processedAt: '2024-07-06T11:00:00Z',
  },
];

const pendingRefunds = [
  {
    id: 'ref-001',
    reference: 'VOR-PAY-2024-06-001',
    amount: 2500000,
    reason: 'Property reservation cancelled',
    requestedBy: 'John Doe',
    requestedAt: '2024-06-28T10:30:00Z',
    status: 'pending',
  },
  {
    id: 'ref-002',
    reference: 'VOR-PAY-2024-06-002',
    amount: 500000,
    reason: 'Service fee refund',
    requestedBy: 'Jane Smith',
    requestedAt: '2024-06-25T14:15:00Z',
    status: 'pending',
  },
  {
    id: 'ref-003',
    reference: 'VOR-PAY-2024-06-003',
    amount: 10000000,
    reason: 'Investment withdrawal',
    requestedBy: 'Robert Taylor',
    requestedAt: '2024-06-20T09:00:00Z',
    status: 'under_review',
  },
];

const paymentMethods = [
  {
    method: 'PAYSTACK',
    transactions: 180,
    volume: 625000000,
    successRate: 98.5,
  },
  {
    method: 'FLUTTERWAVE',
    transactions: 60,
    volume: 245000000,
    successRate: 97.2,
  },
  {
    method: 'BANK_TRANSFER',
    transactions: 5,
    volume: 5000000,
    successRate: 100,
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function FinanceDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Finance Dashboard
        </h1>
        <p className="mt-2 text-vor-slate">
          Overview of payment operations and financial performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Transactions"
          value={financeStats.totalTransactions.toString()}
          icon={CreditCard}
          color="bg-vor-navy"
        />
        <StatCard
          title="Total Volume"
          value={formatCurrency(financeStats.totalVolume)}
          icon={DollarSign}
          color="bg-vor-trust"
        />
        <StatCard
          title="Pending"
          value={financeStats.pendingTransactions.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="Refund Requests"
          value={financeStats.refundRequests.toString()}
          icon={AlertTriangle}
          color="bg-orange-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(financeStats.monthlyRevenue)}
          icon={TrendingUp}
          color="bg-vor-trust"
        />
        <StatCard
          title="Avg Transaction"
          value={formatCurrency(financeStats.averageTransactionValue)}
          icon={DollarSign}
          color="bg-vor-slate"
        />
      </div>

      {/* Recent Transactions */}
      <section>
        <SectionHeader
          title="Recent Transactions"
          subtitle="Latest payment activities"
          link="/dashboard/finance-officer/transactions"
          linkText="View All"
        />
        <div className="rounded-xl border border-vor-border bg-white overflow-hidden shadow-card">
          <table className="w-full">
            <thead className="bg-vor-cream">
              <tr>
                <TableHeader>Reference</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>User</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {recentTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Payment Methods */}
        <section>
          <SectionHeader
            title="Payment Methods"
            subtitle="Transaction breakdown by payment gateway"
          />
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.method} method={method} />
            ))}
          </div>
        </section>

        {/* Pending Refunds */}
        <section>
          <SectionHeader
            title="Pending Refunds"
            subtitle={`Awaiting action: ${pendingRefunds.length} requests`}
            link="/dashboard/finance-officer/transactions"
            linkText="View All"
          />
          <div className="space-y-4">
            {pendingRefunds.map((refund) => (
              <RefundCard key={refund.id} refund={refund} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-2xl font-bold text-vor-navy">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  link,
  linkText,
}: {
  title: string;
  subtitle: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
        <p className="mt-1 text-sm text-vor-slate">{subtitle}</p>
      </div>
      {link && linkText && (
        <a
          href={link}
          className="text-sm font-medium text-vor-gold hover:text-vor-gold-light"
        >
          {linkText} →
        </a>
      )}
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-vor-slate">
      {children}
    </th>
  );
}

function TransactionRow({ transaction }: { transaction: any }) {
  const statusColors = {
    COMPLETED: 'bg-vor-trust/10 text-vor-trust',
    PENDING: 'bg-vor-gold/10 text-vor-gold',
    FAILED: 'bg-red-100 text-red-600',
    REFUNDED: 'bg-vor-slate/10 text-vor-slate',
    CANCELLED: 'bg-vor-slate/10 text-vor-slate',
  };

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4 text-sm font-medium text-vor-navy">
        {transaction.reference}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{transaction.type}</td>
      <td className="px-6 py-4 text-sm text-vor-slate">{transaction.user}</td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-navy">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{transaction.method}</td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[transaction.status as keyof typeof statusColors]
          }`}
        >
          {transaction.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {formatDateTime(transaction.processedAt)}
      </td>
    </tr>
  );
}

function PaymentMethodCard({ method }: { method: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-vor-navy">{method.method}</h3>
          <p className="text-sm text-vor-slate mt-1">
            {method.transactions} transactions
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-trust">{method.successRate}%</p>
          <p className="text-xs text-vor-slate">Success Rate</p>
        </div>
      </div>
      <div className="pt-4 border-t border-vor-border">
        <p className="text-sm text-vor-slate">Total Volume</p>
        <p className="text-lg font-semibold text-vor-navy">{formatCurrency(method.volume)}</p>
      </div>
    </div>
  );
}

function RefundCard({ refund }: { refund: any }) {
  const statusColors = {
    pending: 'bg-vor-gold/10 text-vor-gold',
    under_review: 'bg-blue-500/10 text-blue-500',
    approved: 'bg-vor-trust/10 text-vor-trust',
    rejected: 'bg-red-100 text-red-600',
  };

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm font-medium text-vor-slate">
              {refund.reference}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[refund.status as keyof typeof statusColors]
              }`}
            >
              {refund.status}
            </span>
          </div>
          <p className="text-sm text-vor-slate">{refund.reason}</p>
          <p className="text-xs text-vor-slate mt-1">Requested by: {refund.requestedBy}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-navy">{formatCurrency(refund.amount)}</p>
          <p className="text-xs text-vor-slate">{formatDateTime(refund.requestedAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-vor-border">
        <button className="flex-1 rounded-lg bg-vor-trust px-4 py-2 text-sm font-semibold text-white hover:bg-vor-trust-light">
          Approve
        </button>
        <button className="flex-1 rounded-lg border border-vor-border px-4 py-2 text-sm font-medium text-vor-slate hover:bg-vor-cream">
          Review
        </button>
        <button className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          Reject
        </button>
      </div>
    </div>
  );
}
