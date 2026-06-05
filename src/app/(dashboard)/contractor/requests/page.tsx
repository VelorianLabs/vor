/**
 * VOR Phase 2 - Contractor Requests
 * 
 * Submit requests, track approvals, and manage change orders,
 * budget adjustments, and material requests.
 */

import { FileText, Clock, CheckCircle, XCircle, AlertTriangle, Plus, Filter, Search, Calendar, DollarSign } from 'lucide-react';

// Mock data
const requestsData = {
  requests: [
    {
      id: 'req-001',
      project: 'VOR Green Courts — Epe',
      title: 'Budget Adjustment Request',
      type: 'budget',
      description: 'Request for additional budget allocation due to increased material costs and unexpected site conditions.',
      amount: 15000000,
      currentBudget: 150000000,
      requestedBudget: 165000000,
      reason: 'Material cost increase and additional excavation work required',
      submittedDate: '2024-06-25T10:30:00Z',
      status: 'pending',
      submittedTo: 'Finance Officer',
      documents: [
        { name: 'cost_breakdown.pdf', url: '/requests/cost_breakdown.pdf' },
        { name: 'material_quotes.pdf', url: '/requests/material_quotes.pdf' },
      ],
      comments: [],
    },
    {
      id: 'req-002',
      project: 'VOR Green Courts — Epe',
      title: 'Material Approval Request',
      type: 'material',
      description: 'Request approval for alternative material supplier with better pricing and availability.',
      amount: null,
      materialType: 'Cement',
      currentSupplier: 'Dangote Cement',
      proposedSupplier: 'BUA Cement',
      reason: 'Better pricing and faster delivery timeline',
      submittedDate: '2024-06-20T14:15:00Z',
      status: 'approved',
      submittedTo: 'Project Manager',
      approvedBy: 'Project Manager',
      approvedDate: '2024-06-22T09:00:00Z',
      documents: [
        { name: 'supplier_comparison.pdf', url: '/requests/supplier_comparison.pdf' },
      ],
      comments: [
        {
          id: 'c-001',
          author: 'Project Manager',
          message: 'Approved. Please proceed with BUA Cement.',
          createdAt: '2024-06-22T09:00:00Z',
        },
      ],
    },
    {
      id: 'req-003',
      project: 'Abuja Gateway Terraces',
      title: 'Schedule Extension Request',
      type: 'schedule',
      description: 'Request for schedule extension due to rainy season delays and permit processing time.',
      amount: null,
      currentCompletionDate: '2027-03-31',
      requestedCompletionDate: '2027-06-30',
      reason: 'Rainy season delays and extended permit processing',
      submittedDate: '2024-06-15T11:00:00Z',
      status: 'under_review',
      submittedTo: 'Project Manager',
      documents: [
        { name: 'delay_analysis.pdf', url: '/requests/delay_analysis.pdf' },
      ],
      comments: [],
    },
    {
      id: 'req-004',
      project: 'Ogun Smart Homes Phase 1',
      title: 'Change Order Request',
      type: 'change_order',
      description: 'Request for design change in MEP layout to accommodate smart home integration requirements.',
      amount: 2500000,
      reason: 'Smart home integration requires additional conduits and wiring',
      submittedDate: '2024-06-10T16:45:00Z',
      status: 'approved',
      submittedTo: 'Project Manager',
      approvedBy: 'Project Manager',
      approvedDate: '2024-06-12T14:30:00Z',
      documents: [
        { name: 'design_change_mep.pdf', url: '/requests/design_change_mep.pdf' },
      ],
      comments: [
        {
          id: 'c-002',
          author: 'Project Manager',
          message: 'Approved. Ensure all changes are documented.',
          createdAt: '2024-06-12T14:30:00Z',
        },
      ],
    },
    {
      id: 'req-005',
      project: 'VOR Green Courts — Epe',
      title: 'Additional Equipment Request',
      type: 'equipment',
      description: 'Request for additional crane rental to accelerate structural work timeline.',
      amount: 5000000,
      duration: '3 months',
      reason: 'Accelerate structural frame completion',
      submittedDate: '2024-06-05T09:30:00Z',
      status: 'rejected',
      submittedTo: 'Project Manager',
      rejectedBy: 'Project Manager',
      rejectedDate: '2024-06-07T11:00:00Z',
      rejectionReason: 'Current equipment sufficient. No additional allocation approved.',
      documents: [
        { name: 'equipment_quote.pdf', url: '/requests/equipment_quote.pdf' },
      ],
      comments: [
        {
          id: 'c-003',
          author: 'Project Manager',
          message: 'Rejected. Current equipment allocation is sufficient for the project timeline.',
          createdAt: '2024-06-07T11:00:00Z',
        },
      ],
    },
  ],
};

const typeLabels = {
  budget: 'Budget Adjustment',
  material: 'Material Approval',
  schedule: 'Schedule Extension',
  change_order: 'Change Order',
  equipment: 'Equipment Request',
};

const typeIcons = {
  budget: DollarSign,
  material: FileText,
  schedule: Calendar,
  change_order: FileText,
  equipment: FileText,
};

const typeColors = {
  budget: 'bg-vor-gold/10 text-vor-gold',
  material: 'bg-vor-trust/10 text-vor-trust',
  schedule: 'bg-blue-500/10 text-blue-500',
  change_order: 'bg-orange-500/10 text-orange-500',
  equipment: 'bg-vor-navy/10 text-vor-navy',
};

const statusLabels = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

const statusIcons = {
  pending: Clock,
  under_review: FileText,
  approved: CheckCircle,
  rejected: XCircle,
  cancelled: XCircle,
};

const statusColors = {
  pending: 'bg-vor-gold/10 text-vor-gold',
  under_review: 'bg-blue-500/10 text-blue-500',
  approved: 'bg-vor-trust/10 text-vor-trust',
  rejected: 'bg-red-100 text-red-600',
  cancelled: 'bg-vor-slate/10 text-vor-slate',
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

export default function ContractorRequests() {
  const pendingRequests = requestsData.requests.filter(r => r.status === 'pending');
  const approvedRequests = requestsData.requests.filter(r => r.status === 'approved');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Requests
          </h1>
          <p className="mt-2 text-vor-slate">
            Submit and track approval requests
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <Plus className="h-4 w-4" />
            New Request
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search requests by title, project, or type..."
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
          title="Under Review"
          value={requestsData.requests.filter(r => r.status === 'under_review').length.toString()}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Approved"
          value={approvedRequests.length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Rejected"
          value={requestsData.requests.filter(r => r.status === 'rejected').length.toString()}
          icon={XCircle}
          color="bg-red-500"
        />
      </div>

      {/* Pending Requests */}
      <section>
        <SectionHeader
          title="Pending Requests"
          subtitle={`Awaiting approval: ${pendingRequests.length} requests`}
        />
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </section>

      {/* Other Requests */}
      <section>
        <SectionHeader
          title="All Requests"
          subtitle={`Total: ${requestsData.requests.length} requests`}
        />
        <div className="space-y-4">
          {requestsData.requests.map((request) => (
            <RequestCard key={request.id} request={request} />
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

function RequestCard({ request }: { request: any }) {
  const Icon = typeIcons[request.type as keyof typeof typeIcons] || FileText;
  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons] || Clock;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${typeColors[request.type as keyof typeof typeColors]}`}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    typeColors[request.type as keyof typeof typeColors]
                  }`}
                >
                  {typeLabels[request.type as keyof typeof typeLabels]}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[request.status as keyof typeof statusColors]
                  }`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusLabels[request.status as keyof typeof statusLabels]}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-vor-navy">{request.title}</h3>
              <p className="text-sm text-vor-slate">{request.project}</p>
            </div>
          </div>

          <p className="text-sm text-vor-slate mb-4">{request.description}</p>

          {/* Request Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {request.amount && (
              <Detail label="Amount" value={formatCurrency(request.amount)} icon={DollarSign} />
            )}
            {request.currentBudget && request.requestedBudget && (
              <>
                <Detail label="Current Budget" value={formatCurrency(request.currentBudget)} icon={DollarSign} />
                <Detail label="Requested Budget" value={formatCurrency(request.requestedBudget)} icon={DollarSign} />
              </>
            )}
            {request.materialType && (
              <Detail label="Material Type" value={request.materialType} icon={FileText} />
            )}
            {request.currentSupplier && request.proposedSupplier && (
              <>
                <Detail label="Current Supplier" value={request.currentSupplier} icon={FileText} />
                <Detail label="Proposed Supplier" value={request.proposedSupplier} icon={FileText} />
              </>
            )}
            {request.currentCompletionDate && request.requestedCompletionDate && (
              <>
                <Detail label="Current Date" value={formatDate(request.currentCompletionDate)} icon={Calendar} />
                <Detail label="Requested Date" value={formatDate(request.requestedCompletionDate)} icon={Calendar} />
              </>
            )}
          </div>

          {/* Reason */}
          <div className="mb-4 p-3 rounded-lg bg-vor-cream">
            <h4 className="text-sm font-semibold text-vor-navy mb-1">Reason</h4>
            <p className="text-sm text-vor-slate">{request.reason}</p>
          </div>

          {/* Documents */}
          {request.documents && request.documents.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-vor-navy mb-2">Documents</h4>
              <div className="flex flex-wrap gap-2">
                {request.documents.map((doc: any, index: number) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border"
                  >
                    <FileText className="h-3 w-3" />
                    {doc.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          {request.comments && request.comments.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-vor-navy mb-2">Comments</h4>
              <div className="space-y-2">
                {request.comments.map((comment: any) => (
                  <div key={comment.id} className="p-3 rounded-lg bg-vor-cream">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-vor-navy">{comment.author}</span>
                      <span className="text-xs text-vor-slate">{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-vor-slate">{comment.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {request.rejectionReason && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <h4 className="text-sm font-semibold text-red-600 mb-1">Rejection Reason</h4>
              <p className="text-sm text-red-700">{request.rejectionReason}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-vor-border">
            <div className="flex items-center gap-4 text-sm text-vor-slate">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Submitted: {formatDate(request.submittedDate)}</span>
              </div>
              <span>•</span>
              <span>To: {request.submittedTo}</span>
              {request.approvedBy && (
                <>
                  <span>•</span>
                  <span>Approved by: {request.approvedBy}</span>
                </>
              )}
              {request.rejectedBy && (
                <>
                  <span>•</span>
                  <span>Rejected by: {request.rejectedBy}</span>
                </>
              )}
            </div>
            {request.status === 'pending' && (
              <button className="rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
                Withdraw
              </button>
            )}
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
