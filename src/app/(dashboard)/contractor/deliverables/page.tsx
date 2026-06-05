/**
 * VOR Phase 2 - Contractor Deliverables
 * 
 * Submit reports, upload deliverables, track submission status,
 * and manage required documentation.
 */

import { FolderKanban, Upload, FileText, Calendar, CheckCircle, Clock, AlertTriangle, Plus, Filter, Search } from 'lucide-react';

// Mock data
const deliverablesData = {
  deliverables: [
    {
      id: 'del-001',
      project: 'VOR Green Courts — Epe',
      title: 'Monthly Progress Report - June 2024',
      type: 'report',
      description: 'Detailed monthly progress report including construction updates, budget utilization, and milestone achievements.',
      dueDate: '2024-07-05',
      submittedDate: null,
      status: 'pending',
      priority: 'high',
      attachments: [],
      templateUrl: '/templates/monthly_progress_report.docx',
    },
    {
      id: 'del-002',
      project: 'VOR Green Courts — Epe',
      title: 'Structural Inspection Photos',
      type: 'media',
      description: 'High-resolution photos of structural work completed, including foundation, columns, and beams.',
      dueDate: '2024-07-10',
      submittedDate: null,
      status: 'pending',
      priority: 'medium',
      attachments: [],
      requirements: ['Minimum 20 photos', 'Include date stamps', 'Show progress markers'],
    },
    {
      id: 'del-003',
      project: 'Abuja Gateway Terraces',
      title: 'Foundation Completion Certificate',
      type: 'document',
      description: 'Official certificate confirming foundation work completion, signed by structural engineer.',
      dueDate: '2024-07-15',
      submittedDate: null,
      status: 'pending',
      priority: 'high',
      attachments: [],
      requirements: ['Engineer signature', 'Stamp and seal', 'Completion date'],
    },
    {
      id: 'del-004',
      project: 'Ogun Smart Homes Phase 1',
      title: 'MEP Installation Progress',
      type: 'report',
      description: 'Progress report on mechanical, electrical, and plumbing installation work.',
      dueDate: '2024-07-20',
      submittedDate: null,
      status: 'pending',
      priority: 'medium',
      attachments: [],
    },
    {
      id: 'del-005',
      project: 'Ogun Smart Homes Phase 1',
      title: 'Quality Assurance Report',
      type: 'report',
      description: 'QA report covering material inspections, workmanship quality, and compliance checks.',
      dueDate: '2024-07-25',
      submittedDate: null,
      status: 'pending',
      priority: 'low',
      attachments: [],
    },
    {
      id: 'del-006',
      project: 'VOR Green Courts — Epe',
      title: 'Monthly Progress Report - May 2024',
      type: 'report',
      description: 'Detailed monthly progress report for May 2024.',
      dueDate: '2024-06-05',
      submittedDate: '2024-06-04T14:30:00Z',
      status: 'approved',
      priority: 'high',
      attachments: [
        { name: 'may_progress_report.pdf', url: '/deliverables/may_2024.pdf' },
        { name: 'site_photos_may.zip', url: '/deliverables/photos_may.zip' },
      ],
      reviewedBy: 'Project Manager',
      reviewedAt: '2024-06-06T10:00:00Z',
      feedback: 'Excellent progress. Keep up the good work.',
    },
    {
      id: 'del-007',
      project: 'Abuja Gateway Terraces',
      title: 'Site Preparation Report',
      type: 'report',
      description: 'Report on site clearing, leveling, and preparation work.',
      dueDate: '2024-05-20',
      submittedDate: '2024-05-18T11:00:00Z',
      status: 'approved',
      priority: 'high',
      attachments: [
        { name: 'site_prep_report.pdf', url: '/deliverables/site_prep.pdf' },
      ],
      reviewedBy: 'Site Engineer',
      reviewedAt: '2024-05-19T09:30:00Z',
      feedback: 'Site preparation completed satisfactorily.',
    },
    {
      id: 'del-008',
      project: 'Ogun Smart Homes Phase 1',
      title: 'Infrastructure Completion Photos',
      type: 'media',
      description: 'Photos showing completed infrastructure work including roads, drainage, and utilities.',
      dueDate: '2024-05-15',
      submittedDate: '2024-05-14T16:00:00Z',
      status: 'approved',
      priority: 'medium',
      attachments: [
        { name: 'infrastructure_photos.zip', url: '/deliverables/infra_photos.zip' },
      ],
      reviewedBy: 'Project Manager',
      reviewedAt: '2024-05-16T14:00:00Z',
      feedback: 'Infrastructure work meets all requirements.',
    },
  ],
};

const typeLabels = {
  report: 'Report',
  media: 'Media',
  document: 'Document',
};

const typeIcons = {
  report: FileText,
  media: Upload,
  document: FileText,
};

const typeColors = {
  report: 'bg-vor-navy/10 text-vor-navy',
  media: 'bg-vor-trust/10 text-vor-trust',
  document: 'bg-vor-gold/10 text-vor-gold',
};

const statusLabels = {
  pending: 'Pending',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  revision_required: 'Revision Required',
};

const statusColors = {
  pending: 'bg-vor-gold/10 text-vor-gold',
  submitted: 'bg-blue-100 text-blue-600',
  under_review: 'bg-vor-gold/10 text-vor-gold',
  approved: 'bg-vor-trust/10 text-vor-trust',
  rejected: 'bg-red-100 text-red-600',
  revision_required: 'bg-orange-100 text-orange-600',
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

export default function ContractorDeliverables() {
  const pendingDeliverables = deliverablesData.deliverables.filter(d => d.status === 'pending');
  const completedDeliverables = deliverablesData.deliverables.filter(d => d.status === 'approved');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Deliverables
          </h1>
          <p className="mt-2 text-vor-slate">
            Submit reports and manage required documentation
          </p>
        </div>
        <div className="flex items-center gap-3">
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
          placeholder="Search deliverables by title, project, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending"
          value={pendingDeliverables.length.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="Submitted"
          value={deliverablesData.deliverables.filter(d => d.status === 'submitted').length.toString()}
          icon={Upload}
          color="bg-blue-500"
        />
        <StatCard
          title="Under Review"
          value={deliverablesData.deliverables.filter(d => d.status === 'under_review').length.toString()}
          icon={FileText}
          color="bg-orange-500"
        />
        <StatCard
          title="Approved"
          value={completedDeliverables.length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
      </div>

      {/* Pending Deliverables */}
      <section>
        <SectionHeader
          title="Pending Deliverables"
          subtitle={`Due soon: ${pendingDeliverables.length} items`}
        />
        <div className="space-y-4">
          {pendingDeliverables.map((deliverable) => (
            <DeliverableCard key={deliverable.id} deliverable={deliverable} />
          ))}
        </div>
      </section>

      {/* Completed Deliverables */}
      <section>
        <SectionHeader
          title="Completed Deliverables"
          subtitle={`Approved: ${completedDeliverables.length} items`}
        />
        <div className="space-y-4">
          {completedDeliverables.map((deliverable) => (
            <DeliverableCard key={deliverable.id} deliverable={deliverable} />
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

function DeliverableCard({ deliverable }: { deliverable: any }) {
  const daysUntilDue = Math.ceil(
    (new Date(deliverable.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isUrgent = daysUntilDue <= 3;
  const isOverdue = daysUntilDue < 0;

  const Icon = typeIcons[deliverable.type as keyof typeof typeIcons] || FileText;

  return (
    <div
      className={`rounded-xl border p-6 ${
        isOverdue && deliverable.status === 'pending'
          ? 'border-red-200 bg-red-50'
          : isUrgent && deliverable.status === 'pending'
          ? 'border-vor-gold bg-vor-cream'
          : 'border-vor-border bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${typeColors[deliverable.type as keyof typeof typeColors]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    typeColors[deliverable.type as keyof typeof typeColors]
                  }`}
                >
                  {typeLabels[deliverable.type as keyof typeof typeLabels]}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    priorityColors[deliverable.priority as keyof typeof priorityColors]
                  }`}
                >
                  {priorityLabels[deliverable.priority as keyof typeof priorityLabels]}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[deliverable.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[deliverable.status as keyof typeof statusLabels]}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-vor-navy">{deliverable.title}</h3>
              <p className="mt-1 text-sm text-vor-slate">{deliverable.project}</p>
            </div>
          </div>

          <p className="text-sm text-vor-slate mb-4">{deliverable.description}</p>

          {/* Requirements */}
          {deliverable.requirements && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-vor-navy mb-2">Requirements</h4>
              <ul className="space-y-1">
                {deliverable.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-vor-slate">
                    <span className="text-vor-gold mt-0.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Attachments */}
          {deliverable.attachments && deliverable.attachments.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-vor-navy mb-2">Attachments</h4>
              <div className="flex flex-wrap gap-2">
                {deliverable.attachments.map((attachment: any, index: number) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border"
                  >
                    <Upload className="h-3 w-3" />
                    {attachment.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {deliverable.feedback && (
            <div className="mb-4 p-3 rounded-lg bg-vor-trust/10 border border-vor-trust/20">
              <h4 className="text-sm font-semibold text-vor-trust mb-1">Feedback</h4>
              <p className="text-sm text-vor-navy">{deliverable.feedback}</p>
              <p className="text-xs text-vor-slate mt-1">
                Reviewed by {deliverable.reviewedBy} on {formatDateTime(deliverable.reviewedAt)}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-vor-border">
            <div className="flex items-center gap-4 text-sm text-vor-slate">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span
                  className={
                    isOverdue && deliverable.status === 'pending'
                      ? 'text-red-600 font-medium'
                      : isUrgent && deliverable.status === 'pending'
                      ? 'text-vor-gold font-medium'
                      : ''
                  }
                >
                  {isOverdue && deliverable.status === 'pending'
                    ? `${Math.abs(daysUntilDue)} days overdue`
                    : `Due: ${formatDate(deliverable.dueDate)}`}
                </span>
              </div>
              {deliverable.submittedDate && (
                <span>Submitted: {formatDate(deliverable.submittedDate)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {deliverable.status === 'pending' && (
                <>
                  {deliverable.templateUrl && (
                    <button className="rounded-lg border border-vor-border px-4 py-2 text-sm font-medium text-vor-slate hover:bg-vor-cream">
                      Download Template
                    </button>
                  )}
                  <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-4 py-2 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
                    <Upload className="h-4 w-4" />
                    Submit
                  </button>
                </>
              )}
              {deliverable.status === 'approved' && (
                <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
                  <Upload className="h-4 w-4" />
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
