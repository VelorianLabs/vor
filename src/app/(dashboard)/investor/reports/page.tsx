/**
 * VOR Phase 2 - Investor Reports
 * 
 * Generate and download investment reports with financial performance,
 * construction progress, milestones, risks, and project updates.
 * Export to PDF and Excel.
 */

import { FileText, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle, Filter, Search, FileSpreadsheet } from 'lucide-react';

// Mock data
const reportsData = {
  reports: [
    {
      id: 'rpt-001',
      title: 'Q2 2024 Investment Performance Report',
      period: 'April - June 2024',
      type: 'quarterly',
      generatedAt: '2024-07-01T10:00:00Z',
      status: 'ready',
      fileUrl: '/reports/q2_2024_performance.pdf',
      fileSize: 2456789,
      metrics: {
        totalInvestments: 50000000,
        portfolioValue: 54250000,
        totalReturns: 4250000,
        averageROI: 8.5,
        activeProjects: 3,
        completedProjects: 2,
      },
    },
    {
      id: 'rpt-002',
      title: 'Lekki Corridor Land Fund II - Project Update',
      period: 'June 2024',
      type: 'project',
      generatedAt: '2024-06-30T14:30:00Z',
      status: 'ready',
      fileUrl: '/reports/lekki_corridor_june_2024.pdf',
      fileSize: 1876543,
      projectId: 'proj-001',
      projectName: 'Lekki Corridor Land Fund II',
      metrics: {
        fundingProgress: 70,
        landAcquisitionProgress: 45,
        titleVerificationProgress: 30,
        milestonesCompleted: 2,
        totalMilestones: 8,
      },
    },
    {
      id: 'rpt-003',
      title: 'FCT Residential Development - Construction Progress',
      period: 'June 2024',
      type: 'project',
      generatedAt: '2024-06-28T09:15:00Z',
      status: 'ready',
      fileUrl: '/reports/fct_residential_june_2024.pdf',
      fileSize: 2134567,
      projectId: 'proj-002',
      projectName: 'FCT Residential Development Pool',
      metrics: {
        constructionProgress: 35,
        permitsApproved: true,
        foundationProgress: 20,
        milestonesCompleted: 1,
        totalMilestones: 6,
      },
    },
    {
      id: 'rpt-004',
      title: 'Q1 2024 Investment Performance Report',
      period: 'January - March 2024',
      type: 'quarterly',
      generatedAt: '2024-04-01T10:00:00Z',
      status: 'ready',
      fileUrl: '/reports/q1_2024_performance.pdf',
      fileSize: 2345678,
      metrics: {
        totalInvestments: 40000000,
        portfolioValue: 43250000,
        totalReturns: 3250000,
        averageROI: 8.1,
        activeProjects: 2,
        completedProjects: 2,
      },
    },
    {
      id: 'rpt-005',
      title: 'Annual Investment Report 2023',
      period: 'FY 2023',
      type: 'annual',
      generatedAt: '2024-01-15T10:00:00Z',
      status: 'ready',
      fileUrl: '/reports/annual_2023.pdf',
      fileSize: 5678901,
      metrics: {
        totalInvestments: 20000000,
        portfolioValue: 23000000,
        totalReturns: 3000000,
        averageROI: 15.0,
        activeProjects: 1,
        completedProjects: 2,
      },
    },
  ],
  upcomingReports: [
    {
      id: 'upcoming-001',
      title: 'Q3 2024 Investment Performance Report',
      scheduledDate: '2024-10-01',
      type: 'quarterly',
    },
    {
      id: 'upcoming-002',
      title: 'Ogun Affordable Housing - Monthly Update',
      scheduledDate: '2024-07-31',
      type: 'project',
      projectId: 'proj-003',
    },
  ],
};

const typeLabels = {
  quarterly: 'Quarterly',
  annual: 'Annual',
  project: 'Project',
};

const typeColors = {
  quarterly: 'bg-vor-trust/10 text-vor-trust',
  annual: 'bg-vor-navy/10 text-vor-navy',
  project: 'bg-vor-gold/10 text-vor-gold',
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

export default function InvestorReports() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Investment Reports
          </h1>
          <p className="mt-2 text-vor-slate">
            Generate and download comprehensive investment reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <FileText className="h-4 w-4" />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
          <input
            type="text"
            placeholder="Search reports by title, type, or period..."
            className="w-full rounded-lg border border-vor-border py-2.5 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
          <Filter className="h-4 w-4" />
          Filter
        </button>
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
          title="Quarterly Reports"
          value={reportsData.reports.filter(r => r.type === 'quarterly').length.toString()}
          icon={Calendar}
          color="bg-vor-trust"
        />
        <StatCard
          title="Project Reports"
          value={reportsData.reports.filter(r => r.type === 'project').length.toString()}
          icon={TrendingUp}
          color="bg-vor-gold"
        />
        <StatCard
          title="Annual Reports"
          value={reportsData.reports.filter(r => r.type === 'annual').length.toString()}
          icon={FileText}
          color="bg-vor-slate"
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
          {report.projectName && (
            <p className="text-sm text-vor-slate mt-1">{report.projectName}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
            <Download className="h-4 w-4" />
            PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Metrics */}
      {report.metrics && (
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-vor-border">
          {report.type === 'quarterly' || report.type === 'annual' ? (
            <>
              <Metric
                label="Total Investments"
                value={formatCurrency(report.metrics.totalInvestments)}
              />
              <Metric
                label="Portfolio Value"
                value={formatCurrency(report.metrics.portfolioValue)}
              />
              <Metric
                label="Average ROI"
                value={`${report.metrics.averageROI}%`}
              />
            </>
          ) : (
            <>
              <Metric
                label="Funding Progress"
                value={`${report.metrics.fundingProgress || report.metrics.constructionProgress}%`}
              />
              <Metric
                label="Milestones"
                value={`${report.metrics.milestonesCompleted}/${report.metrics.totalMilestones}`}
              />
              <Metric
                label="Status"
                value={report.metrics.permitsApproved ? 'Permits Approved' : 'In Progress'}
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
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-cream">
          <Calendar className="h-6 w-6 text-vor-navy" />
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
