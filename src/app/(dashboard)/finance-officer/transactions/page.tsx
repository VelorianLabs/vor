/**
 * VOR Phase 2 - Finance Transactions
 * 
 * View and manage all payment transactions, process refunds,
 * and track payment history.
 */

import { CreditCard, Search, Filter, Download, RefreshCw, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

// Mock data
const transactionsData = {
  transactions: [
    {
      id: 'txn-001',
      reference: 'VOR-PAY-2024-07-001',
      type: 'INSTALLMENT',
      amount: 2500000,
      method: 'PAYSTACK',
      status: 'COMPLETED',
      user: 'John Doe',
      userEmail: 'john.doe@email.com',
      property: 'Ndukego Housing Parcels',
      propertyId: 'vor-lag-001',
      processedAt: '2024-07-10T10:30:00Z',
      gatewayReference: 'paystack_ref_123456',
      receiptUrl: '/receipts/VOR-PAY-2024-07-001.pdf',
    },
    {
      id: 'txn-002',
      reference: 'VOR-PAY-2024-07-002',
      type: 'INVESTMENT',
      amount: 10000000,
      method: 'FLUTTERWAVE',
      status: 'COMPLETED',
      user: 'Jane Investor',
      userEmail: 'jane.investor@email.com',
      project: 'Lekki Corridor Land Fund III',
      investmentId: 'inv-001',
      processedAt: '2024-07-09T14:20:00Z',
      gatewayReference: 'flutterwave_ref_789012',
      receiptUrl: '/receipts/VOR-PAY-2024-07-002.pdf',
    },
    {
      id: 'txn-003',
      reference: 'VOR-PAY-2024-07-003',
      type: 'VERIFICATION_FEE',
      amount: 500000,
      method: 'PAYSTACK',
      status: 'PENDING',
      user: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      property: 'Ajah Hillside Development',
      propertyId: 'vor-lag-003',
      processedAt: '2024-07-08T09:15:00Z',
      gatewayReference: 'paystack_ref_345678',
      receiptUrl: null,
    },
    {
      id: 'txn-004',
      reference: 'VOR-PAY-2024-07-004',
      type: 'PROPERTY_PURCHASE',
      amount: 42000000,
      method: 'FLUTTERWAVE',
      status: 'FAILED',
      user: 'Sarah Williams',
      userEmail: 'sarah.williams@email.com',
      property: 'Ibeju-Lekki Industrial Zone',
      propertyId: 'vor-lag-002',
      processedAt: '2024-07-07T16:45:00Z',
      gatewayReference: 'flutterwave_ref_901234',
      receiptUrl: null,
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
      userEmail: 'david.brown@email.com',
      property: 'Lugbe Residential Extension',
      propertyId: 'vor-abj-003',
      processedAt: '2024-07-06T11:00:00Z',
      gatewayReference: 'paystack_ref_567890',
      receiptUrl: '/receipts/VOR-PAY-2024-07-005.pdf',
    },
    {
      id: 'txn-006',
      reference: 'VOR-PAY-2024-07-006',
      type: 'INSPECTION_FEE',
      amount: 250000,
      method: 'PAYSTACK',
      status: 'COMPLETED',
      user: 'Emily Davis',
      userEmail: 'emily.davis@email.com',
      property: 'VOR Green Courts — Epe',
      propertyId: 'proj-001',
      processedAt: '2024-07-05T08:30:00Z',
      gatewayReference: 'paystack_ref_234567',
      receiptUrl: '/receipts/VOR-PAY-2024-07-006.pdf',
    },
    {
      id: 'txn-007',
      reference: 'VOR-PAY-2024-07-007',
      type: 'INSTALLMENT',
      amount: 5000000,
      method: 'FLUTTERWAVE',
      status: 'REFUNDED',
      user: 'Robert Taylor',
      userEmail: 'robert.taylor@email.com',
      property: 'Ogun Smart Homes Phase 1',
      propertyId: 'proj-003',
      processedAt: '2024-07-04T15:00:00Z',
      gatewayReference: 'flutterwave_ref_890123',
      receiptUrl: '/receipts/VOR-PAY-2024-07-007.pdf',
      refundId: 'REF-001',
      refundAmount: 5000000,
      refundReason: 'Project cancelled',
      refundedAt: '2024-07-05T10:00:00Z',
    },
    {
      id: 'txn-008',
      reference: 'VOR-PAY-2024-07-008',
      type: 'INVESTMENT',
      amount: 15000000,
      method: 'BANK_TRANSFER',
      status: 'COMPLETED',
      user: 'Chris Martin',
      userEmail: 'chris.martin@email.com',
      project: 'FCT Residential Development Pool',
      investmentId: 'inv-002',
      processedAt: '2024-07-03T12:45:00Z',
      gatewayReference: 'BANK-REF-456789',
      receiptUrl: '/receipts/VOR-PAY-2024-07-008.pdf',
    },
  ],
};

const typeLabels = {
  INSTALLMENT: 'Installment',
  INVESTMENT: 'Investment',
  VERIFICATION_FEE: 'Verification Fee',
  INSPECTION_FEE: 'Inspection Fee',
  PROPERTY_PURCHASE: 'Property Purchase',
  RESERVATION: 'Reservation',
  SERVICE_FEE: 'Service Fee',
};

const statusLabels = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
  CANCELLED: 'Cancelled',
};

const statusIcons = {
  PENDING: Clock,
  PROCESSING: RefreshCw,
  COMPLETED: CheckCircle,
  FAILED: XCircle,
  REFUNDED: AlertTriangle,
  CANCELLED: XCircle,
};

const statusColors = {
  PENDING: 'bg-vor-gold/10 text-vor-gold',
  PROCESSING: 'bg-blue-500/10 text-blue-500',
  COMPLETED: 'bg-vor-trust/10 text-vor-trust',
  FAILED: 'bg-red-100 text-red-600',
  REFUNDED: 'bg-orange-500/10 text-orange-500',
  CANCELLED: 'bg-vor-slate/10 text-vor-slate',
};

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

export default function FinanceTransactions() {
  const completedTransactions = transactionsData.transactions.filter(t => t.status === 'COMPLETED');
  const pendingTransactions = transactionsData.transactions.filter(t => t.status === 'PENDING');
  const failedTransactions = transactionsData.transactions.filter(t => t.status === 'FAILED');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Transactions
          </h1>
          <p className="mt-2 text-vor-slate">
            View and manage all payment transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search transactions by reference, user, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Transactions"
          value={transactionsData.transactions.length.toString()}
          icon={CreditCard}
          color="bg-vor-navy"
        />
        <StatCard
          title="Completed"
          value={completedTransactions.length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Pending"
          value={pendingTransactions.length.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="Failed"
          value={failedTransactions.length.toString()}
          icon={XCircle}
          color="bg-red-500"
        />
      </div>

      {/* Transactions Table */}
      <section>
        <SectionHeader
          title="All Transactions"
          subtitle={`Total: ${transactionsData.transactions.length} transactions`}
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
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {transactionsData.transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
      <p className="mt-1 text-sm text-vor-slate">{subtitle}</p>
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
  const StatusIcon = statusIcons[transaction.status as keyof typeof statusIcons] || Clock;

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-vor-navy">{transaction.reference}</p>
          <p className="text-xs text-vor-slate">{transaction.gatewayReference}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {typeLabels[transaction.type as keyof typeof typeLabels] || transaction.type}
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-vor-navy">{transaction.user}</p>
          <p className="text-xs text-vor-slate">{transaction.userEmail}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-navy">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{transaction.method}</td>
      <td className="px-6 py-4">
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[transaction.status as keyof typeof statusColors]
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {statusLabels[transaction.status as keyof typeof statusLabels]}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {formatDateTime(transaction.processedAt)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {transaction.receiptUrl && (
            <button className="rounded-lg bg-vor-cream p-2 text-vor-navy hover:bg-vor-border" title="Download Receipt">
              <Download className="h-4 w-4" />
            </button>
          )}
          <button className="rounded-lg bg-vor-cream p-2 text-vor-navy hover:bg-vor-border" title="View Details">
            <CreditCard className="h-4 w-4" />
          </button>
          {transaction.status === 'FAILED' && (
            <button className="rounded-lg bg-vor-cream p-2 text-vor-navy hover:bg-vor-border" title="Retry">
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
