/**
 * VOR Phase 2 - Client Payment Center
 * 
 * View payment history, outstanding payments, installment schedule, receipts, and invoices.
 */

import { CreditCard, Download, FileText, Calendar, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

// Mock data
const paymentData = {
  totalPaid: 45000000,
  outstandingBalance: 12500000,
  nextPaymentDue: 2500000,
  nextPaymentDate: '2024-07-15',
  paymentHistory: [
    {
      id: 'pay-001',
      reference: 'VOR-PAY-2024-06-001',
      type: 'Installment',
      amount: 2500000,
      status: 'completed',
      property: 'Ndukego Housing Parcels',
      paidAt: '2024-06-15T10:30:00Z',
      method: 'Paystack',
    },
    {
      id: 'pay-002',
      reference: 'VOR-PAY-2024-05-001',
      type: 'Installment',
      amount: 2500000,
      status: 'completed',
      property: 'Ndukego Housing Parcels',
      paidAt: '2024-05-15T14:20:00Z',
      method: 'Paystack',
    },
    {
      id: 'pay-003',
      reference: 'VOR-PAY-2024-04-001',
      type: 'Reservation Fee',
      amount: 500000,
      status: 'completed',
      property: 'Lugbe Residential Extension',
      paidAt: '2024-04-10T09:15:00Z',
      method: 'Flutterwave',
    },
    {
      id: 'pay-004',
      reference: 'VOR-PAY-2024-03-001',
      type: 'Full Payment',
      amount: 42000000,
      status: 'completed',
      property: 'Ibeju-Lekki Industrial Zone',
      paidAt: '2024-03-22T16:45:00Z',
      method: 'Bank Transfer',
    },
  ],
  outstandingPayments: [
    {
      id: 'out-001',
      property: 'Ndukego Housing Parcels',
      amount: 2500000,
      dueDate: '2024-07-15',
      installmentNumber: 4,
      totalInstallments: 12,
      status: 'pending',
    },
    {
      id: 'out-002',
      property: '4-Bed Terrace — Lekki Phase 1',
      amount: 5000000,
      dueDate: '2024-07-20',
      installmentNumber: 2,
      totalInstallments: 6,
      status: 'pending',
    },
  ],
  installmentSchedule: [
    {
      id: 'sched-001',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 1,
      amount: 2500000,
      dueDate: '2024-04-15',
      status: 'paid',
      paidDate: '2024-04-15',
    },
    {
      id: 'sched-002',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 2,
      amount: 2500000,
      dueDate: '2024-05-15',
      status: 'paid',
      paidDate: '2024-05-15',
    },
    {
      id: 'sched-003',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 3,
      amount: 2500000,
      dueDate: '2024-06-15',
      status: 'paid',
      paidDate: '2024-06-15',
    },
    {
      id: 'sched-004',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 4,
      amount: 2500000,
      dueDate: '2024-07-15',
      status: 'pending',
    },
    {
      id: 'sched-005',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 5,
      amount: 2500000,
      dueDate: '2024-08-15',
      status: 'upcoming',
    },
    {
      id: 'sched-006',
      property: 'Ndukego Housing Parcels',
      installmentNumber: 6,
      amount: 2500000,
      dueDate: '2024-09-15',
      status: 'upcoming',
    },
  ],
  invoices: [
    {
      id: 'inv-001',
      invoiceNumber: 'INV-2024-06-001',
      property: 'Ndukego Housing Parcels',
      amount: 2500000,
      dueDate: '2024-06-15',
      status: 'paid',
      paidDate: '2024-06-15',
      issuedAt: '2024-06-01',
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-2024-07-001',
      property: 'Ndukego Housing Parcels',
      amount: 2500000,
      dueDate: '2024-07-15',
      status: 'pending',
      issuedAt: '2024-07-01',
    },
  ],
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

export default function ClientPaymentCenter() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Payment Center
        </h1>
        <p className="mt-2 text-vor-slate">
          Manage your payments, view invoices, and track installment schedules
        </p>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Paid"
          value={formatCurrency(paymentData.totalPaid)}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <SummaryCard
          title="Outstanding Balance"
          value={formatCurrency(paymentData.outstandingBalance)}
          icon={AlertCircle}
          color="bg-vor-gold"
        />
        <SummaryCard
          title="Next Payment Due"
          value={formatCurrency(paymentData.nextPaymentDue)}
          icon={Calendar}
          color="bg-vor-navy"
          subtitle={formatDate(paymentData.nextPaymentDate)}
        />
        <SummaryCard
          title="Payment Progress"
          value="78%"
          icon={TrendingUp}
          color="bg-vor-trust"
        />
      </div>

      {/* Outstanding Payments */}
      <section>
        <SectionHeader
          title="Outstanding Payments"
          subtitle="Payments due in the next 30 days"
          count={paymentData.outstandingPayments.length}
        />
        <div className="space-y-4">
          {paymentData.outstandingPayments.map((payment) => (
            <OutstandingPaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      </section>

      {/* Payment History */}
      <section>
        <SectionHeader
          title="Payment History"
          subtitle="Your recent payment transactions"
          count={paymentData.paymentHistory.length}
        />
        <div className="rounded-xl border border-vor-border bg-white overflow-hidden shadow-card">
          <table className="w-full">
            <thead className="bg-vor-cream">
              <tr>
                <TableHeader>Reference</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Property</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Method</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Receipt</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {paymentData.paymentHistory.map((payment) => (
                <PaymentHistoryRow key={payment.id} payment={payment} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Installment Schedule */}
      <section>
        <SectionHeader
          title="Installment Schedule"
          subtitle="Your upcoming installment payments"
        />
        <div className="rounded-xl border border-vor-border bg-white overflow-hidden shadow-card">
          <table className="w-full">
            <thead className="bg-vor-cream">
              <tr>
                <TableHeader>Property</TableHeader>
                <TableHeader>Installment</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Due Date</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Paid Date</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {paymentData.installmentSchedule.map((schedule) => (
                <InstallmentScheduleRow key={schedule.id} schedule={schedule} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Invoices */}
      <section>
        <SectionHeader
          title="Invoices"
          subtitle="Your payment invoices"
          count={paymentData.invoices.length}
        />
        <div className="space-y-4">
          {paymentData.invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-2xl font-bold text-vor-navy">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-vor-slate">{subtitle}</p>
          )}
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
  count,
}: {
  title: string;
  subtitle: string;
  count?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
        <p className="mt-1 text-sm text-vor-slate">
          {subtitle} {count && `(${count})`}
        </p>
      </div>
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

function OutstandingPaymentCard({ payment }: { payment: any }) {
  const daysUntilDue = Math.ceil(
    (new Date(payment.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isUrgent = daysUntilDue <= 5;
  const isOverdue = daysUntilDue < 0;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-6 ${
        isOverdue
          ? 'border-red-200 bg-red-50'
          : isUrgent
          ? 'border-vor-gold bg-vor-cream'
          : 'border-vor-border bg-white'
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="h-5 w-5 text-vor-navy" />
          <h3 className="font-semibold text-vor-navy">{payment.property}</h3>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-vor-slate" />
            <span className="text-vor-slate">Due: {formatDate(payment.dueDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-vor-slate">
              Installment {payment.installmentNumber} of {payment.totalInstallments}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-navy">{formatCurrency(payment.amount)}</p>
          <p
            className={`text-sm ${
              isOverdue
                ? 'text-red-600'
                : isUrgent
                ? 'text-vor-gold'
                : 'text-vor-slate'
            }`}
          >
            {isOverdue
              ? `${Math.abs(daysUntilDue)} days overdue`
              : `${daysUntilDue} days remaining`}
          </p>
        </div>
        <button className="rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          Pay Now
        </button>
      </div>
    </div>
  );
}

function PaymentHistoryRow({ payment }: { payment: any }) {
  const statusColors = {
    completed: 'bg-vor-trust/10 text-vor-trust',
    pending: 'bg-vor-gold/10 text-vor-gold',
    failed: 'bg-red-100 text-red-600',
  };

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4 text-sm font-medium text-vor-navy">
        {payment.reference}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{payment.type}</td>
      <td className="px-6 py-4 text-sm text-vor-slate">{payment.property}</td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-navy">
        {formatCurrency(payment.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{payment.method}</td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {formatDateTime(payment.paidAt)}
      </td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[payment.status as keyof typeof statusColors]
          }`}
        >
          {payment.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-sm font-medium text-vor-navy hover:bg-vor-border">
          <Download className="h-4 w-4" />
          Receipt
        </button>
      </td>
    </tr>
  );
}

function InstallmentScheduleRow({ schedule }: { schedule: any }) {
  const statusColors = {
    paid: 'bg-vor-trust/10 text-vor-trust',
    pending: 'bg-vor-gold/10 text-vor-gold',
    upcoming: 'bg-vor-slate/10 text-vor-slate',
    overdue: 'bg-red-100 text-red-600',
  };

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4 text-sm text-vor-slate">{schedule.property}</td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        #{schedule.installmentNumber}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-navy">
        {formatCurrency(schedule.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{formatDate(schedule.dueDate)}</td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[schedule.status as keyof typeof statusColors]
          }`}
        >
          {schedule.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {schedule.paidDate ? formatDate(schedule.paidDate) : '-'}
      </td>
    </tr>
  );
}

function InvoiceCard({ invoice }: { invoice: any }) {
  const statusColors = {
    paid: 'bg-vor-trust/10 text-vor-trust',
    pending: 'bg-vor-gold/10 text-vor-gold',
    overdue: 'bg-red-100 text-red-600',
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-cream">
          <FileText className="h-6 w-6 text-vor-navy" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-vor-navy">{invoice.invoiceNumber}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[invoice.status as keyof typeof statusColors]
              }`}
            >
              {invoice.status}
            </span>
          </div>
          <p className="text-sm text-vor-slate">{invoice.property}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-vor-slate">
            <span>Issued: {formatDate(invoice.issuedAt)}</span>
            <span>•</span>
            <span>Due: {formatDate(invoice.dueDate)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-navy">{formatCurrency(invoice.amount)}</p>
          {invoice.paidDate && (
            <p className="text-xs text-vor-slate">Paid: {formatDate(invoice.paidDate)}</p>
          )}
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  );
}
