/**
 * VOR Phase 2 - Legal Verification Requests
 * 
 * Review and manage verification requests for survey plans,
 * title deeds, allocation letters, and other legal documents.
 */

import { FileCheck, Clock, CheckCircle, AlertTriangle, Search, Filter, Eye, Download, Scale, Calendar } from 'lucide-react';

// Mock data
const verificationData = {
  requests: [
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
        { name: 'survey_plan_draft.pdf', type: 'PDF', url: '/documents/survey_plan_draft.pdf' },
        { name: 'site_photos.zip', type: 'ZIP', url: '/documents/site_photos.zip' },
        { name: 'coordinates.txt', type: 'TXT', url: '/documents/coordinates.txt' },
      ],
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-07-10T11:00:00Z',
      notes: [],
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
        { name: 'deed_of_assignment.pdf', type: 'PDF', url: '/documents/deed_of_assignment.pdf' },
        { name: 'governors_consent.pdf', type: 'PDF', url: '/documents/governors_consent.pdf' },
        { name: 'registered_survey.pdf', type: 'PDF', url: '/documents/registered_survey.pdf' },
      ],
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-07-09T15:00:00Z',
      reviewStartedAt: '2024-07-09T15:00:00Z',
      notes: [
        {
          id: 'n-001',
          author: 'Sarah Johnson',
          message: 'Started review of deed of assignment. Document appears authentic.',
          createdAt: '2024-07-09T15:30:00Z',
        },
      ],
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
        { name: 'allocation_letter.pdf', type: 'PDF', url: '/documents/allocation_letter.pdf' },
      ],
      assignedTo: null,
      assignedDate: null,
      notes: [],
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
        { name: 'c_of_o.pdf', type: 'PDF', url: '/documents/c_of_o.pdf' },
        { name: 'land_use_charge.pdf', type: 'PDF', url: '/documents/land_use_charge.pdf' },
        { name: 'ground_rent_receipt.pdf', type: 'PDF', url: '/documents/ground_rent_receipt.pdf' },
      ],
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-07-08T09:00:00Z',
      completedAt: '2024-07-08T10:00:00Z',
      verifiedBy: 'Sarah Johnson',
      verificationNotes: 'All documents verified successfully. Certificate of Occupancy is valid and authentic. Land use charge payments are up to date.',
      notes: [
        {
          id: 'n-002',
          author: 'Sarah Johnson',
          message: 'Verified C of O with official records. Document is authentic.',
          createdAt: '2024-07-08T09:30:00Z',
        },
        {
          id: 'n-003',
          author: 'Sarah Johnson',
          message: 'Land use charge receipts verified. All payments current.',
          createdAt: '2024-07-08T09:45:00Z',
        },
      ],
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
        { name: 'survey_plan.pdf', type: 'PDF', url: '/documents/survey_plan.pdf' },
      ],
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-07-06T12:00:00Z',
      rejectedAt: '2024-07-07T09:00:00Z',
      rejectedBy: 'Sarah Johnson',
      rejectionReason: 'Survey plan does not match official records from the Surveyor General\'s Office. Coordinates are incorrect. Please submit corrected version.',
      notes: [
        {
          id: 'n-004',
          author: 'Sarah Johnson',
          message: 'Discrepancy found in survey coordinates. Official records show different coordinates.',
          createdAt: '2024-07-06T14:00:00Z',
        },
        {
          id: 'n-005',
          author: 'Sarah Johnson',
          message: 'Request rejected due to coordinate mismatch.',
          createdAt: '2024-07-07T09:00:00Z',
        },
      ],
    },
    {
      id: 'ver-006',
      requestNumber: 'VOR-VER-2024-07-006',
      type: 'GOVERNORS_CONSENT',
      property: 'Lekki Phase 1 Residential',
      location: 'Lekki Phase 1, Lagos',
      submittedBy: 'Robert Taylor',
      submittedDate: '2024-07-05T08:30:00Z',
      status: 'completed',
      priority: 'medium',
      documents: [
        { name: 'governors_consent.pdf', type: 'PDF', url: '/documents/governors_consent.pdf' },
        { name: 'deed_of_assignment.pdf', type: 'PDF', url: '/documents/deed_of_assignment.pdf' },
      ],
      assignedTo: 'Sarah Johnson',
      assignedDate: '2024-07-05T09:00:00Z',
      completedAt: '2024-07-06T11:00:00Z',
      verifiedBy: 'Sarah Johnson',
      verificationNotes: 'Governor\'s consent verified with Lagos State Land Registry. Document is valid and properly registered.',
      notes: [],
    },
  ],
};

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

export default function LegalVerifications() {
  const pendingRequests = verificationData.requests.filter(r => r.status === 'pending');
  const inProgressRequests = verificationData.requests.filter(r => r.status === 'in_progress');
  const completedRequests = verificationData.requests.filter(r => r.status === 'completed');
  const rejectedRequests = verificationData.requests.filter(r => r.status === 'rejected');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Verification Requests
          </h1>
          <p className="mt-2 text-vor-slate">
            Review and manage document verification requests
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
          placeholder="Search requests by number, property, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending"
          value={pendingRequests.length.toString()}
          icon={Clock}
          color="bg-vor-gold"
        />
        <StatCard
          title="In Progress"
          value={inProgressRequests.length.toString()}
          icon={FileCheck}
          color="bg-blue-500"
        />
        <StatCard
          title="Verified"
          value={completedRequests.length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Rejected"
          value={rejectedRequests.length.toString()}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <section>
          <SectionHeader
            title="Pending Requests"
            subtitle={`Awaiting assignment: ${pendingRequests.length} requests`}
          />
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}

      {/* In Progress Requests */}
      {inProgressRequests.length > 0 && (
        <section>
          <SectionHeader
            title="In Progress"
            subtitle={`Currently reviewing: ${inProgressRequests.length} requests`}
          />
          <div className="space-y-4">
            {inProgressRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Requests */}
      {completedRequests.length > 0 && (
        <section>
          <SectionHeader
            title="Verified Requests"
            subtitle={`Successfully verified: ${completedRequests.length} requests`}
          />
          <div className="space-y-4">
            {completedRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}

      {/* Rejected Requests */}
      {rejectedRequests.length > 0 && (
        <section>
          <SectionHeader
            title="Rejected Requests"
            subtitle={`Rejected: ${rejectedRequests.length} requests`}
          />
          <div className="space-y-4">
            {rejectedRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}
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

function VerificationRequestCard({ request }: { request: any }) {
  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons] || Clock;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${statusColors[request.status as keyof typeof statusColors]}`}>
          <StatusIcon className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
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

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <Detail label="Type" value={typeLabels[request.type as keyof typeof typeLabels] || request.type} icon={FileCheck} />
            <Detail label="Submitted By" value={request.submittedBy} icon={Scale} />
            <Detail label="Submitted Date" value={formatDate(request.submittedDate)} icon={Calendar} />
            <Detail label="Assigned To" value={request.assignedTo || 'Unassigned'} icon={Scale} />
          </div>

          {/* Documents */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-vor-navy mb-2">Documents</p>
            <div className="flex flex-wrap gap-2">
              {request.documents.map((doc: any, index: number) => (
                <button
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border"
                >
                  <Download className="h-3 w-3" />
                  {doc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          {request.notes && request.notes.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-vor-navy mb-2">Review Notes</p>
              <div className="space-y-2">
                {request.notes.map((note: any) => (
                  <div key={note.id} className="p-2 rounded-lg bg-vor-cream">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-vor-navy">{note.author}</span>
                      <span className="text-xs text-vor-slate">{formatDateTime(note.createdAt)}</span>
                    </div>
                    <p className="text-xs text-vor-slate">{note.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Notes */}
          {request.verificationNotes && (
            <div className="mb-3 p-3 rounded-lg bg-vor-trust/10 border border-vor-trust/20">
              <p className="text-xs font-semibold text-vor-trust mb-1">Verification Result</p>
              <p className="text-sm text-vor-navy">{request.verificationNotes}</p>
            </div>
          )}

          {/* Rejection Reason */}
          {request.rejectionReason && (
            <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-xs font-semibold text-red-600 mb-1">Rejection Reason</p>
              <p className="text-sm text-red-700">{request.rejectionReason}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-vor-border">
            <div className="flex items-center gap-4 text-xs text-vor-slate">
              {request.reviewStartedAt && (
                <span>Review started: {formatDateTime(request.reviewStartedAt)}</span>
              )}
              {request.completedAt && (
                <span>Completed: {formatDateTime(request.completedAt)}</span>
              )}
              {request.rejectedAt && (
                <span>Rejected: {formatDateTime(request.rejectedAt)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {request.status === 'pending' && (
                <>
                  <button className="rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
                    Assign
                  </button>
                  <button className="rounded-lg bg-vor-gold px-3 py-1.5 text-xs font-semibold text-vor-navy hover:bg-vor-gold-light">
                    Start Review
                  </button>
                </>
              )}
              {request.status === 'in_progress' && (
                <>
                  <button className="rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
                    Add Note
                  </button>
                  <button className="rounded-lg bg-vor-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-vor-navy-light">
                    Continue Review
                  </button>
                </>
              )}
              {request.status === 'completed' && (
                <button className="rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
                  <Eye className="h-3 w-3 inline mr-1" />
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

function Detail({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <Icon className="h-3 w-3 text-vor-slate" />
        <p className="text-xs text-vor-slate">{label}</p>
      </div>
      <p className="text-sm font-medium text-vor-navy">{value}</p>
    </div>
  );
}
