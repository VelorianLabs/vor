/**
 * VOR Phase 2 - Contractor Requests Page
 *
 * Contractor's approval requests page
 */

import { FileCheck, Calendar, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

export default function ContractorRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Approval Requests</h1>
          <p className="mt-2 text-vor-slate">Manage your project approval requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Send className="h-4 w-4" />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total" value="8" icon={FileCheck} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Pending" value="2" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Approved" value="5" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Rejected" value="1" icon={AlertCircle} color="bg-red-100 text-red-700" />
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">All Requests</h2>
        <div className="space-y-4">
          <RequestRow
            id="REQ-001"
            title="Foundation Completion Approval"
            project="VOR-LAG-001"
            type="Milestone"
            submittedDate="June 1, 2026"
            status="pending"
            priority="high"
          />
          <RequestRow
            id="REQ-002"
            title="Material Change Request"
            project="VOR-ABJ-002"
            type="Change Order"
            submittedDate="May 28, 2026"
            status="in_review"
            priority="medium"
          />
          <RequestRow
            id="REQ-003"
            title="Phase 1 Completion"
            project="VOR-LAG-001"
            type="Milestone"
            submittedDate="May 20, 2026"
            status="approved"
            priority="high"
          />
          <RequestRow
            id="REQ-004"
            title="Budget Adjustment"
            project="VOR-LAG-003"
            type="Budget"
            submittedDate="May 15, 2026"
            status="rejected"
            priority="medium"
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

function RequestRow({
  id,
  title,
  project,
  type,
  submittedDate,
  status,
  priority,
}: {
  id: string;
  title: string;
  project: string;
  type: string;
  submittedDate: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}) {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold', icon: Clock },
    in_review: { label: 'In Review', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
    approved: { label: 'Approved', color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  };

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-700' },
    medium: { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
    low: { label: 'Low', color: 'bg-slate-100 text-slate-700' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig[priority].color}`}>
              {priorityConfig[priority].label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{title}</p>
          <p className="text-sm text-vor-slate">{project} • {type}</p>
          <div className="flex items-center gap-1 text-xs text-vor-slate mt-1">
            <Calendar className="h-3 w-3" />
            <span>Submitted: {submittedDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </span>
      </div>
    </div>
  );
}
