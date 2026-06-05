/**
 * VOR Phase 2 - Finance Invoices
 * 
 * Generate, manage, and track invoices for property purchases,
 * investments, and services.
 */

import { FileText, Plus, Search, Filter, Download, Send, Clock, CheckCircle, AlertTriangle, Calendar, DollarSign } from 'lucide-react';

// Mock data
const invoicesData = {
  invoices: [
    {
      id: 'inv-001',
      invoiceNumber: 'INV-2024-07-001',
      userId: 'user-001',
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      type: 'INSTALLMENT',
      amount: 2500000,
      dueDate: '2024-07-15',
      status: 'pending',
      issuedDate: '2024-07-01',
      property: 'Ndukego Housing Parcels',
      propertyId: 'vor-lag-001',
      installmentNumber: 4,
      totalInstallments: 12,
      items: [
        { description: 'Installment Payment #4', amount: 2500000, quantity: 1 },
      ],
      paidDate: null,
      paymentReference: null,
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-2024-07-002',
      userId: 'user-002',
      userName: 'Jane Investor',
      userEmail: 'jane.investor@email.com',
      type: 'INVESTMENT',
      amount: 10000000,
      dueDate: '2024-07-20',
      status: 'pending',
      issuedDate: '2024-07-05',
      project: 'Lekki Corridor Land Fund III',
      investmentId: 'inv-001',
      items: [
        { description: 'Investment in Lekki Corridor Land Fund III', amount: 10000000, quantity: 1 },
      ],
      paidDate: null,
      paymentReference: null,
    },
    {
      id: 'inv-003',
      invoiceNumber: 'INV-2024-07-003',
      userId: 'user-003',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      type: 'VERIFICATION_FEE',
      amount: 500000,
      dueDate: '2024-07-10',
      status: 'overdue',
      issuedDate: '2024-06-25',
      property: 'Ajah Hillside Development',
      propertyId: 'vor-lag-003',
      items: [
        { description: 'Survey Plan Verification Fee', amount: 500000, quantity: 1 },
      ],
      paidDate: null,
      paymentReference: null,
    },
    {
      id: 'inv-004',
      invoiceNumber: 'INV-2024-06-001',
      userId: 'user-001',
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      type: 'INSTALLMENT',
      amount: 2500000,
      dueDate: '2024-06-15',
      status: 'paid',
      issuedDate: '2024-06-01',
      property: 'Ndukego Housing Parcels',
      propertyId: 'vor-lag-001',
      installmentNumber: 3,
      totalInstallments: 12,
      items: [
        { description: 'Installment Payment #3', amount: 2500000, quantity: 1 },
      ],
      paidDate: '2024-06-15',
      paymentReference: 'VOR-PAY-2024-06-001',
    },
    {
      id: 'inv-005',
      invoiceNumber: 'INV-2024-06-002',
      userId: 'user-004',
      userName: 'Sarah Williams',
      userEmail: 'sarah.williams@email.com',
      type: 'PROPERTY_PURCHASE',
      amount: 42000000,
      dueDate: '2024-06-30',
      status: 'paid',
      issuedDate: '2024-06-10',
      property: 'Ibeju-Lekki Industrial Zone',
      propertyId: 'vor-lag-002',
      items: [
        { description: 'Full Payment for Ibeju-Lekki Industrial Zone Parcel', amount: 42000000, quantity: 1 },
      ],
      paidDate: '2024-06-28',
      paymentReference: 'VOR-PAY-2024-06-002',
    },
    {
      id: 'inv-006',
      invoiceNumber: 'INV-2024-05-001',
      userId: 'user-005',
      userName: 'David Brown',
      userEmail: 'david.brown@email.com',
      type: 'RESERVATION',
      amount: 500000,
      dueDate: '2024-05-15',
      status: 'paid',
      issuedDate: '2024-04-25',
      property: 'Lugbe Residential Extension',
      propertyId: 'vor-abj-003',
      items: [
        { description: 'Reservation Fee', amount: 500000, quantity: 1 },
      ],
      paidDate: '2024-05-10',
      paymentReference: 'VOR-PAY-2024-05-001',
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
  pending: 'Pending',
  sent: 'Sent',
  viewed: 'Viewed',
  overdue: 'Overdue',
  paid: 'Paid',
  cancelled: 'Cancelled',
};

const statusIcons = {
  pending: Clock,
  sent: Send,
  viewed: FileText,
  overdue: AlertTriangle,
  paid: CheckCircle,
  cancelled: FileText,
};

const statusColors = {
  pending: 'bg-vor-gold/10 text-vor-gold',
  sent: 'bg-blue-500/10 text-blue-500',
  viewed: 'bg-vor-slate/10 text-vor-slate',
  overdue: 'bg-red-100 text-red-600',
  paid: 'bg-vor-trust/10 text-vor-trust',
  cancelled: 'bg-vor-slate/10 text-vor-slate',
};

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const priorityColors = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-vor-gold/10 text-vor-gold',
  low: 'bg-vor-slate/10 text-vor-slate',
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

export default function FinanceInvoices() {
  const pendingInvoices = invoicesData.invoices.filter(i => i.status === 'pending' || i.status === 'sent' || i.status === 'viewed');
  const overdueInvoices = invoicesData.invoices.filter(i => i.status === 'overdue');
  const paidInvoices = invoicesData.invoices.filter(i => i.status === 'paid');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Invoices
          </h1>
          <p className="mt-2 text-vor-slate">
            Generate and manage invoices
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <Plus className="h-4 w-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search invoices by number, user, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoices"
          value={invoicesData.invoices.length.toString()}
          icon={FileText}
          color="bg-vor-navy"
        />
        <StatCard
          title="Pending"
          value={pendingInvoices.length.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="Overdue"
          value={overdueInvoices.length.toString()}
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <StatCard
          title="Paid"
          value={paidInvoices.length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
      </div>

      {/* Pending Invoices */}
      <section>
        <SectionHeader
          title="Pending Invoices"
          subtitle={`Awaiting payment: ${pendingInvoices.length} invoices`}
        />
        <div className="space-y-4">
          {pendingInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      </section>

      {/* Overdue Invoices */}
      {overdueInvoices.length > 0 && (
        <section>
          <SectionHeader
            title="Overdue Invoices"
            subtitle={`Payment overdue: ${overdueInvoices.length} invoices`}
          />
          <div className="space-y-4">
            {overdueInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        </section>
      )}

      {/* Paid Invoices */}
      <section>
        <SectionHeader
          title="Paid Invoices"
          subtitle={`Successfully paid: ${paidInvoices.length} invoices`}
        />
        <div className="space-y-4">
          {paidInvoices.map((invoice) => (
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

function InvoiceCard({ invoice }: { invoice: any }) {
  const StatusIcon = statusIcons[invoice.status as keyof typeof statusIcons] || Clock;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${statusColors[invoice.status as keyof typeof statusColors]}`}>
          <StatusIcon className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm font-medium text-vor-slate">
                  {invoice.invoiceNumber}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[invoice.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[invoice.status as keyof typeof statusLabels]}
                </span>
              </div>
              <h3 className="font-semibold text-vor-navy">{invoice.userName}</h3>
              <p className="text-sm text-vor-slate">{invoice.userEmail}</p>
              {invoice.property && (
                <p className="text-sm text-vor-slate">{invoice.property}</p>
              )}
              {invoice.project && (
                <p className="text-sm text-vor-slate">{invoice.project}</p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <Detail label="Type" value={typeLabels[invoice.type as keyof typeof typeLabels] || invoice.type} icon={FileText} />
            <Detail label="Issued" value={formatDate(invoice.issuedDate)} icon={Calendar} />
            <Detail label="Due Date" value={formatDate(invoice.dueDate)} icon={Calendar} />
            {invoice.paidDate && (
              <Detail label="Paid Date" value={formatDate(invoice.paidDate)} icon={CheckCircle} />
            )}
            {invoice.installmentNumber && (
              <Detail label="Installment" value={`${invoice.installmentNumber}/${invoice.totalInstallments}`} icon={FileText} />
            )}
          </div>

          {/* Items */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-vor-navy mb-2">Items</p>
            <div className="space-y-2">
              {invoice.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-vor-slate">{item.description}</span>
                  <span className="font-medium text-vor-navy">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-vor-border">
            <div className="flex items-center gap-4 text-sm text-vor-slate">
              {invoice.paymentReference && (
                <span>Paid via: {invoice.paymentReference}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
                <Download className="h-4 w-4" />
                Download
              </button>
              {invoice.status === 'pending' && (
                <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
                  <Send className="h-4 w-4" />
                  Send Reminder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <Icon className="h-3 w-3 text-vor-slate" />
        <p className="text-xs text-vor-slate">{label}</p>
      </div>
      <p className="text-sm font-semibold text-vor-navy">{value}</p>
    </div>
  );
}
