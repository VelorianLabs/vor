/**
 * VOR Admin - Reports (Phase 3)
 *
 * Advanced reports page for admin to access comprehensive system reports
 */

import { BarChart3, Download, Calendar, DollarSign, Users, TrendingUp, FileText, Plus } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Advanced Reports</h1>
          <p className="mt-2 text-vor-slate">Access comprehensive system reports and analytics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Generate Custom Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Reports Generated" value="156" icon={FileText} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="This Month" value="24" icon={Calendar} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Scheduled Reports" value="8" icon={BarChart3} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Data Points" value="1.2M" icon={TrendingUp} color="bg-vor-trust/10 text-vor-trust" />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCategoryCard
          title="Financial Reports"
          description="Revenue, transactions, and financial performance"
          icon={DollarSign}
          reports={12}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <ReportCategoryCard
          title="User Analytics"
          description="User growth, engagement, and behavior analysis"
          icon={Users}
          reports={18}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <ReportCategoryCard
          title="Investment Performance"
          description="Pool performance, ROI tracking, and investor metrics"
          icon={TrendingUp}
          reports={15}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <ReportCategoryCard
          title="Property Analytics"
          description="Property performance, sales data, and market trends"
          icon={BarChart3}
          reports={22}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <ReportCategoryCard
          title="System Reports"
          description="System health, performance, and security metrics"
          icon={FileText}
          reports={8}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <ReportCategoryCard
          title="Compliance Reports"
          description="Regulatory compliance and audit reports"
          icon={FileText}
          reports={6}
          color="bg-vor-gold/10 text-vor-gold"
        />
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Recently Generated Reports</h2>
        <div className="space-y-4">
          <ReportRow
            title="Q2 2026 Financial Summary"
            type="Financial"
            date="June 5, 2026"
            size="2.4 MB"
            format="PDF"
          />
          <ReportRow
            title="User Growth Analysis - May 2026"
            type="User Analytics"
            date="June 1, 2026"
            size="1.8 MB"
            format="PDF"
          />
          <ReportRow
            title="Investment Pool Performance Report"
            type="Investment"
            date="May 28, 2026"
            size="3.2 MB"
            format="Excel"
          />
          <ReportRow
            title="System Health Check - Weekly"
            type="System"
            date="May 25, 2026"
            size="0.5 MB"
            format="PDF"
          />
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Scheduled Reports</h2>
        <div className="space-y-4">
          <ScheduledReportRow
            title="Monthly Financial Report"
            frequency="Monthly"
            nextRun="July 1, 2026"
            recipients="admin@vor.com, finance@vor.com"
          />
          <ScheduledReportRow
            title="Weekly User Analytics"
            frequency="Weekly"
            nextRun="June 12, 2026"
            recipients="admin@vor.com, marketing@vor.com"
          />
          <ScheduledReportRow
            title="Daily System Health"
            frequency="Daily"
            nextRun="June 7, 2026"
            recipients="admin@vor.com, dev@vor.com"
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

function ReportCategoryCard({
  title,
  description,
  icon: Icon,
  reports,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  reports: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-vor-navy/10 text-vor-navy">
          {reports} reports
        </span>
      </div>
      <h3 className="text-lg font-semibold text-vor-navy mb-2">{title}</h3>
      <p className="text-sm text-vor-slate mb-4">{description}</p>
      <button className="flex items-center gap-2 text-sm font-medium text-vor-navy hover:text-vor-gold">
        View All
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}

function ReportRow({
  title,
  type,
  date,
  size,
  format,
}: {
  title: string;
  type: string;
  date: string;
  size: string;
  format: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-vor-navy">{title}</p>
          <div className="flex items-center gap-2 text-sm text-vor-slate mt-1">
            <span>{type}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span>•</span>
            <span>{size}</span>
            <span>•</span>
            <span>{format}</span>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-vor-cream rounded-lg hover:bg-vor-border text-vor-navy">
        <Download className="h-4 w-4" />
        Download
      </button>
    </div>
  );
}

function ScheduledReportRow({
  title,
  frequency,
  nextRun,
  recipients,
}: {
  title: string;
  frequency: string;
  nextRun: string;
  recipients: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-vor-navy">{title}</p>
          <div className="flex items-center gap-2 text-sm text-vor-slate mt-1">
            <span>{frequency}</span>
            <span>•</span>
            <span>Next: {nextRun}</span>
          </div>
          <p className="text-xs text-vor-slate mt-1">To: {recipients}</p>
        </div>
      </div>
      <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
        <Download className="h-5 w-5" />
      </button>
    </div>
  );
}
