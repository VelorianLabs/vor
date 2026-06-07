/**
 * VOR Phase 2 - Legal & Verification Dashboard Overview
 * 
 * Overview of verification requests, review workflow, legal documents,
 * and compliance tracking.
 */

import { FileCheck, Clock, CheckCircle, AlertTriangle, Scale, FileText, TrendingUp, Calendar } from 'lucide-react';

// Mock data
const legalStats = {
  pendingVerifications: 8,
  inProgressVerifications: 5,
  completedVerifications: 42,
  rejectedVerifications: 3,
  totalDocuments: 125,
  complianceScore: 94,
};

const verificationRequests = [
  {
    id: 'ver-001',
    requestNumber: 'VOR-VER-2024-07-001',
    type: 'SURVEY_PLAN',
    property: 'Ndukego Housing Parcels',
    location: 'Kuje, Abuja',
    submittedBy: 'John Doe',
    submittedDate: '2024-07-10T10:30:00Z',
    status: 'pending',
    priority: 'high',
    documents: [
      { name: 'survey_plan_draft.pdf', type: 'PDF' },
      { name: 'site_photos.zip', type: 'ZIP' },
    ],
    assignedTo: 'Sarah Johnson',
  },
  {
    id: 'ver-002',
    requestNumber: 'VOR-VER-2024-07-002',
    type: 'TITLE_DEED',
    property: 'Ibeju-Lekki Industrial Zone',
    location: 'Ibeju-Lekki, Lagos',
    submittedBy: 'Jane Investor',
    submittedDate: '2024-07-09T14:20:00Z',
    status: 'in_progress',
    priority: 'medium',
    documents: [
      { name: 'deed_of_assignment.pdf', type: 'PDF' },
      { name: 'governors_consent.pdf', type: 'PDF' },
    ],
    assignedTo: 'Sarah Johnson',
    reviewStartedAt: '2024-07-09T15:00:00Z',
  },
  {
    id: 'ver-003',
    requestNumber: 'VOR-VER-2024-07-003',
    type: 'ALLOCATION_LETTER',
    property: 'Lugbe Residential Extension',
    location: 'Lugbe, Abuja',
    submittedBy: 'Mike Johnson',
    submittedDate: '2024-07-08T09:15:00Z',
    status: 'pending',
    priority: 'high',
    documents: [
      { name: 'allocation_letter.pdf', type: 'PDF' },
    ],
    assignedTo: null,
  },
  {
    id: 'ver-004',
    requestNumber: 'VOR-VER-2024-07-004',
    type: 'C_OF_O',
    property: 'VOR Green Courts — Epe',
    location: 'Epe, Lagos',
    submittedBy: 'David Brown',
    submittedDate: '2024-07-07T16:45:00Z',
    status: 'completed',
    priority: 'medium',
    documents: [
      { name: 'c_of_o.pdf', type: 'PDF' },
      { name: 'land_use_charge.pdf', type: 'PDF' },
    ],
    assignedTo: 'Sarah Johnson',
    completedAt: '2024-07-08T10:00:00Z',
    verifiedBy: 'Sarah Johnson',
    verificationNotes: 'All documents verified successfully. Title is valid and authentic.',
  },
  {
    id: 'ver-005',
    requestNumber: 'VOR-VER-2024-07-005',
    type: 'SURVEY_PLAN',
    property: 'Ajah Hillside Development',
    location: 'Ajah, Lagos',
    submittedBy: 'Emily Davis',
    submittedDate: '2024-07-06T11:00:00Z',
    status: 'rejected',
    priority: 'low',
    documents: [
      { name: 'survey_plan.pdf', type: 'PDF' },
    ],
    assignedTo: 'Sarah Johnson',
    rejectedAt: '2024-07-07T09:00:00Z',
    rejectedBy: 'Sarah Johnson',
    rejectionReason: 'Survey plan does not match official records. Please submit corrected version.',
  },
];

const recentCompliance = [
  {
    id: 'comp-001',
    title: 'Regulatory Compliance Check',
    type: 'compliance',
    status: 'passed',
    checkedAt: '2024-07-10T08:00:00Z',
    score: 98,
  },
  {
    id: 'comp-002',
    title: 'Document Audit',
    type: 'audit',
    status: 'passed',
    checkedAt: '2024-07-08T14:30:00Z',
    score: 95,
  },
  {
    id: 'comp-003',
    title: 'Title Verification Batch',
    type: 'verification',
    status: 'in_progress',
    checkedAt: '2024-07-07T10:00:00Z',
    score: null,
  },
];

const upcomingDeadlines = [
  {
    id: 'deadline-001',
    request: 'VOR-VER-2024-07-001',
    type: 'SURVEY_PLAN',
    dueDate: '2024-07-15',
    daysRemaining: 5,
  },
  {
    id: 'deadline-002',
    request: 'VOR-VER-2024-07-003',
    type: 'ALLOCATION_LETTER',
    dueDate: '2024-07-18',
    daysRemaining: 8,
  },
];

const typeLabels = {
  SURVEY_PLAN: 'Survey Plan',
  TITLE_DEED: 'Title Deed',
  ALLOCATION_LETTER: 'Allocation Letter',
  C_OF_O: 'Certificate of Occupancy',
  GOVERNORS_CONSENT: "Governor's Consent",
  GAZETTE: 'Gazette',
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Verified',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

const statusIcons = {
  pending: Clock,
  in_progress: FileCheck,
  completed: CheckCircle,
  rejected: AlertTriangle,
  cancelled: Scale,
};

const statusColors = {
  pending: 'bg-vor-gold/10 text-vor-gold',
  in_progress: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-vor-trust/10 text-vor-trust',
  rejected: 'bg-red-100 text-red-600',
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

export default function LegalDashboard() {
  const pendingRequests = verificationRequests.filter(r => r.status === 'pending');
  const inProgressRequests = verificationRequests.filter(r => r.status === 'in_progress');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Legal & Verification Dashboard
        </h1>
        <p className="mt-2 text-vor-slate">
          Overview of verification requests and legal compliance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Pending"
          value={legalStats.pendingVerifications.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="In Progress"
          value={legalStats.inProgressVerifications.toString()}
          icon={FileCheck}
          color="bg-blue-500"
        />
        <StatCard
          title="Verified"
          value={legalStats.completedVerifications.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Rejected"
          value={legalStats.rejectedVerifications.toString()}
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <StatCard
          title="Documents"
          value={legalStats.totalDocuments.toString()}
          icon={FileText}
          color="bg-vor-navy"
        />
        <StatCard
          title="Compliance"
          value={`${legalStats.complianceScore}%`}
          icon={Scale}
          color="bg-vor-trust"
        />
      </div>

      {/* Pending Requests */}
      <section>
        <SectionHeader
          title="Pending Verification Requests"
          subtitle={`Awaiting review: ${pendingRequests.length} requests`}
          link="/dashboard/legal/verifications"
          linkText="View All"
        />
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <VerificationCard key={request.id} request={request} />
          ))}
        </div>
      </section>

      {/* In Progress Requests */}
      {inProgressRequests.length > 0 && (
        <section>
          <SectionHeader
            title="In Progress"
            subtitle={`Currently reviewing: ${inProgressRequests.length} requests`}
            link="/dashboard/legal/verifications"
            linkText="View All"
          />
          <div className="space-y-4">
            {inProgressRequests.map((request) => (
              <VerificationCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Compliance */}
        <section>
          <SectionHeader
            title="Recent Compliance Checks"
            subtitle="Latest compliance and audit activities"
          />
          <div className="space-y-4">
            {recentCompliance.map((compliance) => (
              <ComplianceCard key={compliance.id} compliance={compliance} />
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section>
          <SectionHeader
            title="Upcoming Deadlines"
            subtitle="Verification requests approaching deadline"
          />
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}
          </div>
        </section>
      </div>
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
  link,
  linkText,
}: {
  title: string;
  subtitle: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
        <p className="mt-1 text-sm text-vor-slate">{subtitle}</p>
      </div>
      {link && linkText && (
        <a
          href={link}
          className="text-sm font-medium text-vor-gold hover:text-vor-gold-light"
        >
          {linkText} →
        </a>
      )}
    </div>
  );
}

function VerificationCard({ request }: { request: any }) {
  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons] || Clock;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${statusColors[request.status as keyof typeof statusColors]}`}>
          <StatusIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm font-medium text-vor-slate">
                  {request.requestNumber}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    priorityColors[request.priority as keyof typeof priorityColors]
                  }`}
                >
                  {priorityLabels[request.priority as keyof typeof priorityLabels]}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[request.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[request.status as keyof typeof statusLabels]}
                </span>
              </div>
              <h3 className="font-semibold text-vor-navy">{request.property}</h3>
              <p className="text-sm text-vor-slate">{request.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-vor-slate">
            <span>{typeLabels[request.type as keyof typeof typeLabels] || request.type}</span>
            <span>•</span>
            <span>Submitted by: {request.submittedBy}</span>
            <span>•</span>
            <span>{formatDate(request.submittedDate)}</span>
          </div>

          {/* Documents */}
          {request.documents && request.documents.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-vor-slate mb-1">Documents</p>
              <div className="flex flex-wrap gap-2">
                {request.documents.map((doc: any, index: number) => (
                  <span key={index} className="rounded-lg bg-vor-cream px-2 py-1 text-xs text-vor-navy">
                    {doc.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification Notes */}
          {request.verificationNotes && (
            <div className="mb-3 p-3 rounded-lg bg-vor-trust/10 border border-vor-trust/20">
              <p className="text-sm text-vor-navy">{request.verificationNotes}</p>
            </div>
          )}

          {/* Rejection Reason */}
          {request.rejectionReason && (
            <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{request.rejectionReason}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-vor-border">
            <div className="flex items-center gap-2 text-sm text-vor-slate">
              {request.assignedTo ? (
                <span>Assigned to: {request.assignedTo}</span>
              ) : (
                <span className="text-vor-gold">Unassigned</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {request.status === 'pending' && (
                <button className="rounded-lg bg-vor-gold px-4 py-2 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
                  Start Review
                </button>
              )}
              {request.status === 'in_progress' && (
                <button className="rounded-lg bg-vor-navy px-4 py-2 text-sm font-semibold text-white hover:bg-vor-navy-light">
                  Continue Review
                </button>
              )}
              {request.status === 'completed' && (
                <button className="rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceCard({ compliance }: { compliance: any }) {
  const statusColors = {
    passed: 'bg-vor-trust/10 text-vor-trust',
    failed: 'bg-red-100 text-red-600',
    in_progress: 'bg-vor-gold/10 text-vor-gold',
  };

  return (
    <div className="rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-4 w-4 text-vor-navy" />
            <span className="font-medium text-vor-navy">{compliance.title}</span>
          </div>
          <p className="text-xs text-vor-slate">{formatDateTime(compliance.checkedAt)}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[compliance.status as keyof typeof statusColors]
          }`}
        >
          {compliance.status}
        </span>
      </div>
      {compliance.score !== null && (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-vor-trust" />
          <span className="text-sm font-semibold text-vor-trust">{compliance.score}% Score</span>
        </div>
      )}
    </div>
  );
}

function DeadlineCard({ deadline }: { deadline: any }) {
  const isUrgent = deadline.daysRemaining <= 3;

  return (
    <div
      className={`rounded-xl border p-4 ${
        isUrgent ? 'border-vor-gold bg-vor-cream' : 'border-vor-border bg-white'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isUrgent ? 'bg-vor-gold' : 'bg-vor-cream'}`}>
          <Calendar className="h-5 w-5 text-vor-navy" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-vor-navy">{deadline.request}</p>
          <p className="text-xs text-vor-slate">{typeLabels[deadline.type as keyof typeof typeLabels]}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-vor-slate">Due: {formatDate(deadline.dueDate)}</span>
        <span
          className={`text-sm font-medium ${
            isUrgent ? 'text-vor-gold' : 'text-vor-trust'
          }`}
        >
          {deadline.daysRemaining} days
        </span>
      </div>
    </div>
  );
}
