/**
 * VOR Phase 2 - Contractor Deliverables Page
 *
 * Contractor's deliverables management page
 */

import { FolderOpen, Calendar, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

export default function ContractorDeliverablesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Deliverables</h1>
        <p className="mt-2 text-vor-slate">Manage your project deliverables</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total" value="12" icon={FolderOpen} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Pending" value="5" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="In Review" value="3" icon={AlertCircle} color="bg-amber-100 text-amber-700" />
        <StatCard title="Approved" value="4" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
      </div>

      {/* Deliverables List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">All Deliverables</h2>
        <div className="space-y-4">
          <DeliverableRow
            id="DEL-001"
            title="Foundation Work - Phase 1"
            project="VOR-LAG-001"
            type="Construction"
            dueDate="June 15, 2026"
            status="pending"
            priority="high"
          />
          <DeliverableRow
            id="DEL-002"
            title="Electrical Installation - Block A"
            project="VOR-ABJ-002"
            type="Installation"
            dueDate="June 20, 2026"
            status="in_review"
            priority="medium"
          />
          <DeliverableRow
            id="DEL-003"
            title="Plumbing System - Phase 2"
            project="VOR-LAG-001"
            type="Installation"
            dueDate="June 25, 2026"
            status="pending"
            priority="medium"
          />
          <DeliverableRow
            id="DEL-004"
            title="Roofing - Block B"
            project="VOR-ABJ-002"
            type="Construction"
            dueDate="May 30, 2026"
            status="approved"
            priority="high"
          />
          <DeliverableRow
            id="DEL-005"
            title="Interior Finishing - Unit 1-10"
            project="VOR-LAG-003"
            type="Finishing"
            dueDate="July 10, 2026"
            status="pending"
            priority="low"
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

function DeliverableRow({
  id,
  title,
  project,
  type,
  dueDate,
  status,
  priority,
}: {
  id: string;
  title: string;
  project: string;
  type: string;
  dueDate: string;
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
          <FileText className="h-5 w-5" />
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
            <span>Due: {dueDate}</span>
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
