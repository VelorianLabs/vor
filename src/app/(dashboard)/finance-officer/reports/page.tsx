/**
 * VOR Phase 2 - Finance Reports
 * 
 * Generate and view financial reports including transaction summaries,
 * revenue analytics, payment method breakdown, and audit trails.
 */

import { FileText, Download, Calendar, TrendingUp, DollarSign, CreditCard, Filter, Search, BarChart3, PieChart } from 'lucide-react';

// Mock data
const reportsData = {
  reports: [
    {
      id: 'rpt-001',
      title: 'Monthly Revenue Report - June 2024',
      period: 'June 2024',
      type: 'revenue',
      generatedAt: '2024-07-01T10:00:00Z',
      status: 'ready',
      fileUrl: '/reports/monthly_revenue_june_2024.pdf',
      fileSize: 2456789,
      metrics: {
        totalRevenue: 45000000,
        totalTransactions: 45,
        averageTransactionValue: 1000000,
        paymentMethods: {
          paystack: 30000000,
          flutterwave: 14000000,
          bankTransfer: 1000000,
        },
        breakdown: {
          propertyPurchases: 25000000,
          investments: 15000000,
          fees: 5000000,
        },
      },
    },
    {
      id: 'rpt-002',
      title: 'Transaction Summary - Q2 2024',
      period: 'April - June 2024',
      type: 'transaction',
      generatedAt: '2024-07-01T09:30:00Z',
      status: 'ready',
      fileUrl: '/reports/transaction_summary_q2_2024.pdf',
      fileSize: 3456789,
      metrics: {
        totalTransactions: 135,
        totalVolume: 125000000,
        successRate: 97.8,
        refundRate: 1.2,
      },
    },
    {
      id: 'rpt-003',
      title: 'Payment Method Analysis - June 2024',
      period: 'June 2024',
      type: 'payment_methods',
      generatedAt: '2024-07-01T08:00:00Z',
      status: 'ready',
      fileUrl: '/reports/payment_methods_june_2024.pdf',
      fileSize: 1876543,
      metrics: {
        paystack: {
          transactions: 30,
          volume: 30000000,
          successRate: 98.5,
        },
        flutterwave: {
          transactions: 14,
          volume: 14000000,
          successRate: 97.2,
        },
        bankTransfer: {
          transactions: 1,
          volume: 1000000,
          successRate: 100,
        },
      },
    },
    {
      id: 'rpt-004',
      title: 'Audit Trail - June 2024',
      period: 'June 2024',
      type: 'audit',
      generatedAt: '2024-07-01T07:00:00Z',
      status: 'ready',
      fileUrl: '/reports/audit_trail_june_2024.pdf',
      fileSize: 5678901,
      metrics: {
        totalActions: 1250,
        paymentActions: 245,
        refundActions: 3,
        invoiceActions: 180,
      },
    },
    {
      id: 'rpt-005',
      title: 'Monthly Revenue Report - May 2024',
      period: 'May 2024',
      type: 'revenue',
      generatedAt: '2024-06-01T10:00:00Z',
      status: 'ready',
      fileUrl: '/reports/monthly_revenue_may_2024.pdf',
      fileSize: 2345678,
      metrics: {
        totalRevenue: 38000000,
        totalTransactions: 38,
        averageTransactionValue: 1000000,
      },
    },
  ],
  upcomingReports: [
    {
      id: 'upcoming-001',
      title: 'Monthly Revenue Report - July 2024',
      scheduledDate: '2024-08-01',
      type: 'revenue',
    },
    {
      id: 'upcoming-002',
      title: 'Transaction Summary - Q3 2024',
      scheduledDate: '2024-10-01',
      type: 'transaction',
    },
  ],
};

const typeLabels = {
  revenue: 'Revenue Report',
  transaction: 'Transaction Summary',
  payment_methods: 'Payment Method Analysis',
  audit: 'Audit Trail',
};

const typeIcons = {
  revenue: DollarSign,
  transaction: CreditCard,
  payment_methods: PieChart,
  audit: FileText,
};

const typeColors = {
  revenue: 'bg-vor-trust/10 text-vor-trust',
  transaction: 'bg-vor-navy/10 text-vor-navy',
  payment_methods: 'bg-vor-gold/10 text-vor-gold',
  audit: 'bg-orange-500/10 text-orange-500',
};

const statusLabels = {
  ready: 'Ready',
  generating: 'Generating',
  scheduled: 'Scheduled',
  failed: 'Failed',
};

const statusColors = {
  ready: 'bg-vor-trust/10 text-vor-trust',
  generating: 'bg-vor-gold/10 text-vor-gold',
  scheduled: 'bg-vor-slate/10 text-vor-slate',
  failed: 'bg-red-100 text-red-600',
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

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export default function FinanceReports() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Financial Reports
          </h1>
          <p className="mt-2 text-vor-slate">
            Generate and view financial reports and analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <FileText className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search reports by title, type, or period..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reports"
          value={reportsData.reports.length.toString()}
          icon={FileText}
          color="bg-vor-navy"
        />
        <StatCard
          title="Revenue Reports"
          value={reportsData.reports.filter(r => r.type === 'revenue').length.toString()}
          icon={DollarSign}
          color="bg-vor-trust"
        />
        <StatCard
          title="Transaction Reports"
          value={reportsData.reports.filter(r => r.type === 'transaction').length.toString()}
          icon={CreditCard}
          color="bg-vor-gold"
        />
        <StatCard
          title="Audit Reports"
          value={reportsData.reports.filter(r => r.type === 'audit').length.toString()}
          icon={BarChart3}
          color="bg-orange-500"
        />
      </div>

      {/* Available Reports */}
      <section>
        <SectionHeader
          title="Available Reports"
          subtitle={`Total: ${reportsData.reports.length} reports`}
        />
        <div className="space-y-4">
          {reportsData.reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>

      {/* Upcoming Reports */}
      <section>
        <SectionHeader
          title="Scheduled Reports"
          subtitle={`Upcoming: ${reportsData.upcomingReports.length} reports`}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {reportsData.upcomingReports.map((report) => (
            <ScheduledReportCard key={report.id} report={report} />
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

function ReportCard({ report }: { report: any }) {
  const Icon = typeIcons[report.type as keyof typeof typeIcons] || FileText;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                typeColors[report.type as keyof typeof typeColors]
              }`}
            >
              {typeLabels[report.type as keyof typeof typeLabels]}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[report.status as keyof typeof statusColors]
              }`}
            >
              {statusLabels[report.status as keyof typeof statusLabels]}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-vor-navy">{report.title}</h3>
          <p className="mt-1 text-sm text-vor-slate">{report.period}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
            <Download className="h-4 w-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Metrics */}
      {report.metrics && (
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-vor-border">
          {report.type === 'revenue' && (
            <>
              <Metric
                label="Total Revenue"
                value={formatCurrency(report.metrics.totalRevenue)}
              />
              <Metric
                label="Transactions"
                value={report.metrics.totalTransactions.toString()}
              />
              <Metric
                label="Avg Transaction"
                value={formatCurrency(report.metrics.averageTransactionValue)}
              />
            </>
          )}
          {report.type === 'transaction' && (
            <>
              <Metric
                label="Total Transactions"
                value={report.metrics.totalTransactions.toString()}
              />
              <Metric
                label="Total Volume"
                value={formatCurrency(report.metrics.totalVolume)}
              />
              <Metric
                label="Success Rate"
                value={`${report.metrics.successRate}%`}
              />
            </>
          )}
          {report.type === 'payment_methods' && (
            <>
              <Metric
                label="Paystack"
                value={formatCurrency(report.metrics.paystack.volume)}
              />
              <Metric
                label="Flutterwave"
                value={formatCurrency(report.metrics.flutterwave.volume)}
              />
              <Metric
                label="Bank Transfer"
                value={formatCurrency(report.metrics.bankTransfer.volume)}
              />
            </>
          )}
          {report.type === 'audit' && (
            <>
              <Metric
                label="Total Actions"
                value={report.metrics.totalActions.toString()}
              />
              <Metric
                label="Payment Actions"
                value={report.metrics.paymentActions.toString()}
              />
              <Metric
                label="Refund Actions"
                value={report.metrics.refundActions.toString()}
              />
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-vor-border text-sm text-vor-slate">
        <div className="flex items-center gap-4">
          <span>Generated: {formatDateTime(report.generatedAt)}</span>
          <span>•</span>
          <span>Size: {formatFileSize(report.fileSize)}</span>
        </div>
      </div>
    </div>
  );
}

function ScheduledReportCard({ report }: { report: any }) {
  const Icon = typeIcons[report.type as keyof typeof typeIcons] || FileText;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-cream">
          <Icon className="h-6 w-6 text-vor-navy" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                typeColors[report.type as keyof typeof typeColors]
              }`}
            >
              {typeLabels[report.type as keyof typeof typeLabels]}
            </span>
            <span className="rounded-full bg-vor-slate/10 px-3 py-1 text-xs font-medium text-vor-slate">
              Scheduled
            </span>
          </div>
          <h3 className="font-semibold text-vor-navy">{report.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-vor-slate">
            <Calendar className="h-4 w-4" />
            <span>Scheduled: {formatDate(report.scheduledDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-vor-slate">{label}</p>
      <p className="text-sm font-semibold text-vor-navy">{value}</p>
    </div>
  );
}
