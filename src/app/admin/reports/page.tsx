/**
 * VOR Admin - Reports (Phase 3)
 *
 * Advanced reports page for admin to access comprehensive system reports
 */

'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, DollarSign, Users, TrendingUp, FileText, Plus } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      // Mock data for reports
      const mockReports = [
        { id: '1', title: 'Monthly Revenue Report', published_at: new Date().toISOString() },
        { id: '2', title: 'User Activity Report', published_at: new Date().toISOString() },
      ];
      setReports(mockReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const thisMonthCount = reports.filter(r => {
    const reportDate = new Date(r.published_at);
    const now = new Date();
    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
  }).length;

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
        <StatCard title="Reports Generated" value={reports.length.toString()} icon={FileText} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="This Month" value={thisMonthCount.toString()} icon={Calendar} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Financial Reports" value={reports.filter(r => r.type === 'financial').length.toString()} icon={DollarSign} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="System Reports" value={reports.filter(r => r.type === 'system').length.toString()} icon={FileText} color="bg-vor-navy/10 text-vor-navy" />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCategoryCard
          title="Financial Reports"
          description="Revenue, transactions, and financial performance"
          icon={DollarSign}
          reports={reports.filter(r => r.type === 'financial').length}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <ReportCategoryCard
          title="User Analytics"
          description="User growth, engagement, and behavior analysis"
          icon={Users}
          reports={reports.filter(r => r.type === 'user').length}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <ReportCategoryCard
          title="Investment Performance"
          description="Pool performance, ROI tracking, and investor metrics"
          icon={TrendingUp}
          reports={reports.filter(r => r.type === 'investment').length}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <ReportCategoryCard
          title="Property Analytics"
          description="Property performance, sales data, and market trends"
          icon={BarChart3}
          reports={reports.filter(r => r.type === 'property').length}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <ReportCategoryCard
          title="System Reports"
          description="System health, performance, and security metrics"
          icon={FileText}
          reports={reports.filter(r => r.type === 'system').length}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <ReportCategoryCard
          title="Compliance Reports"
          description="Regulatory compliance and audit reports"
          icon={FileText}
          reports={reports.filter(r => r.type === 'compliance').length}
          color="bg-vor-gold/10 text-vor-gold"
        />
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Recently Generated Reports</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-vor-slate">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-vor-slate">No reports found</p>
          ) : (
            reports.map((report) => (
              <ReportRow
                key={report.id}
                title={report.title}
                type={report.type || 'Financial'}
                date={report.published_at ? new Date(report.published_at).toLocaleDateString() : 'N/A'}
                size="2.4 MB"
                format="PDF"
              />
            ))
          )}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Scheduled Reports</h2>
        <div className="space-y-4">
          <p className="text-vor-slate">No scheduled reports configured. Use the Generate Custom Report button to create reports.</p>
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
