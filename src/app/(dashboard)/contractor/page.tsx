/**
 * VOR Phase 2 - Contractor Dashboard Overview
 * 
 * Track assigned projects, submit reports, upload deliverables,
 * submit requests, and track approvals.
 */

import { HardHat, FolderKanban, Upload, FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

// Mock data
const contractorStats = {
  activeProjects: 3,
  pendingDeliverables: 5,
  pendingApprovals: 2,
  completedMilestones: 8,
  totalBudget: 250000000,
  spentAmount: 87500000,
  overallProgress: 35,
};

const assignedProjects = [
  {
    id: 'proj-001',
    name: 'VOR Green Courts — Epe',
    location: 'Epe, Lagos',
    state: 'Lagos',
    progress: 68,
    units: 48,
    completionDate: 'Q3 2026',
    budget: 150000000,
    spent: 52500000,
    status: 'IN_PROGRESS',
    startDate: '2024-01-15',
    role: 'Lead Contractor',
    milestones: [
      { name: 'Foundation Complete', progress: 100, status: 'completed' },
      { name: 'Structure Frame', progress: 85, status: 'in_progress' },
      { name: 'Roofing', progress: 30, status: 'in_progress' },
      { name: 'Interior Finishing', progress: 0, status: 'upcoming' },
      { name: 'Final Inspection', progress: 0, status: 'upcoming' },
    ],
  },
  {
    id: 'proj-002',
    name: 'Abuja Gateway Terraces',
    location: 'Lugbe, FCT',
    state: 'Abuja',
    progress: 42,
    units: 24,
    completionDate: 'Q1 2027',
    budget: 75000000,
    spent: 25000000,
    status: 'IN_PROGRESS',
    startDate: '2024-03-22',
    role: 'Sub-Contractor',
    milestones: [
      { name: 'Site Preparation', progress: 100, status: 'completed' },
      { name: 'Foundation', progress: 75, status: 'in_progress' },
      { name: 'Superstructure', progress: 20, status: 'in_progress' },
      { name: 'MEP Installation', progress: 0, status: 'upcoming' },
      { name: 'Finishing', progress: 0, status: 'upcoming' },
    ],
  },
  {
    id: 'proj-003',
    name: 'Ogun Smart Homes Phase 1',
    location: 'Mowe, Ogun',
    state: 'Ogun',
    progress: 85,
    units: 36,
    completionDate: 'Q4 2025',
    budget: 25000000,
    spent: 10000000,
    status: 'IN_PROGRESS',
    startDate: '2023-08-15',
    role: 'Lead Contractor',
    milestones: [
      { name: 'Infrastructure', progress: 100, status: 'completed' },
      { name: 'Foundation', progress: 100, status: 'completed' },
      { name: 'Superstructure', progress: 95, status: 'in_progress' },
      { name: 'Roofing', progress: 80, status: 'in_progress' },
      { name: 'Finishing', progress: 60, status: 'in_progress' },
    ],
  },
];

const pendingDeliverables = [
  {
    id: 'del-001',
    project: 'VOR Green Courts — Epe',
    title: 'Monthly Progress Report - June 2024',
    type: 'report',
    dueDate: '2024-07-05',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'del-002',
    project: 'VOR Green Courts — Epe',
    title: 'Structural Inspection Photos',
    type: 'media',
    dueDate: '2024-07-10',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'del-003',
    project: 'Abuja Gateway Terraces',
    title: 'Foundation Completion Certificate',
    type: 'document',
    dueDate: '2024-07-15',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'del-004',
    project: 'Ogun Smart Homes Phase 1',
    title: 'MEP Installation Progress',
    type: 'report',
    dueDate: '2024-07-20',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'del-005',
    project: 'Ogun Smart Homes Phase 1',
    title: 'Quality Assurance Report',
    type: 'report',
    dueDate: '2024-07-25',
    status: 'pending',
    priority: 'low',
  },
];

const recentApprovals = [
  {
    id: 'appr-001',
    project: 'VOR Green Courts — Epe',
    title: 'Foundation Completion Approval',
    submittedDate: '2024-06-20',
    status: 'approved',
    approvedBy: 'Project Manager',
    approvedDate: '2024-06-22',
  },
  {
    id: 'appr-002',
    project: 'Ogun Smart Homes Phase 1',
    title: 'Budget Adjustment Request',
    submittedDate: '2024-06-25',
    status: 'pending',
    submittedTo: 'Finance Officer',
  },
];

const upcomingDeadlines = [
  {
    id: 'deadline-001',
    project: 'VOR Green Courts — Epe',
    milestone: 'Structure Frame Completion',
    dueDate: '2024-07-15',
    daysRemaining: 5,
  },
  {
    id: 'deadline-002',
    project: 'Abuja Gateway Terraces',
    milestone: 'Foundation Completion',
    dueDate: '2024-07-20',
    daysRemaining: 10,
  },
  {
    id: 'deadline-003',
    project: 'Ogun Smart Homes Phase 1',
    milestone: 'Superstructure Completion',
    dueDate: '2024-08-15',
    daysRemaining: 36,
  },
];

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

export default function ContractorDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Contractor Dashboard
        </h1>
        <p className="mt-2 text-vor-slate">
          Overview of your assigned construction projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Active Projects"
          value={contractorStats.activeProjects.toString()}
          icon={HardHat}
          color="bg-vor-trust"
        />
        <StatCard
          title="Pending Deliverables"
          value={contractorStats.pendingDeliverables.toString()}
          icon={FolderKanban}
          color="bg-vor-gold"
        />
        <StatCard
          title="Pending Approvals"
          value={contractorStats.pendingApprovals.toString()}
          icon={FileText}
          color="bg-orange-500"
        />
        <StatCard
          title="Completed Milestones"
          value={contractorStats.completedMilestones.toString()}
          icon={CheckCircle}
          color="bg-vor-navy"
        />
        <StatCard
          title="Total Budget"
          value={formatCurrency(contractorStats.totalBudget)}
          icon={TrendingUp}
          color="bg-vor-slate"
        />
        <StatCard
          title="Overall Progress"
          value={`${contractorStats.overallProgress}%`}
          icon={TrendingUp}
          color="bg-vor-trust"
        />
      </div>

      {/* Assigned Projects */}
      <section>
        <SectionHeader
          title="Assigned Projects"
          subtitle={`Active: ${assignedProjects.length} projects`}
          link="/dashboard/contractor/projects"
          linkText="View All"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {assignedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Pending Deliverables */}
        <section>
          <SectionHeader
            title="Pending Deliverables"
            subtitle={`Due soon: ${pendingDeliverables.length} items`}
            link="/dashboard/contractor/deliverables"
            linkText="View All"
          />
          <div className="space-y-4">
            {pendingDeliverables.slice(0, 3).map((deliverable) => (
              <DeliverableCard key={deliverable.id} deliverable={deliverable} />
            ))}
          </div>
        </section>

        {/* Recent Approvals */}
        <section>
          <SectionHeader
            title="Recent Approvals"
            subtitle={`Pending: ${recentApprovals.filter(a => a.status === 'pending').length} requests`}
            link="/dashboard/contractor/requests"
            linkText="View All"
          />
          <div className="space-y-4">
            {recentApprovals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
        </section>
      </div>

      {/* Upcoming Deadlines */}
      <section>
        <SectionHeader
          title="Upcoming Deadlines"
          subtitle="Key project milestones approaching"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {upcomingDeadlines.map((deadline) => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
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

function ProjectCard({ project }: { project: any }) {
  const budgetUtilization = ((project.spent / project.budget) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <HardHat className="h-5 w-5 text-vor-trust" />
            <span className="text-sm font-medium text-vor-trust">{project.role}</span>
          </div>
          <h3 className="text-lg font-semibold text-vor-navy">{project.name}</h3>
          <p className="mt-1 text-sm text-vor-slate">{project.location}, {project.state}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-trust">{project.progress}%</p>
          <p className="text-xs text-vor-slate">Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-vor-cream">
          <div
            className="h-2 rounded-full bg-vor-trust transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Metric label="Units" value={project.units} />
        <Metric label="Budget" value={formatCurrency(project.budget)} />
        <Metric label="Spent" value={formatCurrency(project.spent)} />
      </div>

      {/* Milestones */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-vor-navy mb-3">Milestones</h4>
        <div className="space-y-2">
          {project.milestones.slice(0, 3).map((milestone: any, index: number) => (
            <MilestoneItem key={index} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          <span>ETA: {project.completionDate}</span>
        </div>
        <button className="rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
          View Details
        </button>
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

function MilestoneItem({ milestone }: { milestone: any }) {
  const statusColors = {
    completed: 'bg-vor-trust',
    in_progress: 'bg-vor-gold',
    upcoming: 'bg-vor-slate',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          statusColors[milestone.status as keyof typeof statusColors]
        }`}
      >
        {milestone.status === 'completed' && <CheckCircle className="h-3 w-3 text-white" />}
        {milestone.status === 'in_progress' && <Clock className="h-3 w-3 text-white" />}
        {milestone.status === 'upcoming' && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-vor-navy">{milestone.name}</p>
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-vor-cream">
            <div
              className="h-1.5 rounded-full bg-vor-trust"
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
          <span className="text-xs text-vor-slate">{milestone.progress}%</span>
        </div>
      </div>
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

  const priorityColors = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-vor-gold/10 text-vor-gold',
    low: 'bg-vor-slate/10 text-vor-slate',
  };

  const typeIcons = {
    report: FileText,
    media: Upload,
    document: FileText,
  };

  const Icon = typeIcons[deliverable.type as keyof typeof typeIcons] || FileText;

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border p-4 ${
        isOverdue
          ? 'border-red-200 bg-red-50'
          : isUrgent
          ? 'border-vor-gold bg-vor-cream'
          : 'border-vor-border bg-white'
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-cream">
        <Icon className="h-5 w-5 text-vor-navy" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-medium text-vor-navy">{deliverable.title}</h4>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              priorityColors[deliverable.priority as keyof typeof priorityColors]
            }`}
          >
            {deliverable.priority}
          </span>
        </div>
        <p className="text-sm text-vor-slate">{deliverable.project}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3 text-vor-slate" />
          <span
            className={
              isOverdue
                ? 'text-red-600 font-medium'
                : isUrgent
                ? 'text-vor-gold font-medium'
                : 'text-vor-slate'
            }
          >
            {isOverdue
              ? `${Math.abs(daysUntilDue)} days overdue`
              : `${daysUntilDue} days remaining`}
          </span>
        </div>
      </div>
      <button className="rounded-lg bg-vor-gold px-3 py-1.5 text-xs font-semibold text-vor-navy hover:bg-vor-gold-light">
        Submit
      </button>
    </div>
  );
}

function ApprovalCard({ approval }: { approval: any }) {
  const statusColors = {
    approved: 'bg-vor-trust/10 text-vor-trust',
    pending: 'bg-vor-gold/10 text-vor-gold',
    rejected: 'bg-red-100 text-red-600',
  };

  return (
    <div className="flex items-start gap-4 rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-cream">
        <FileText className="h-5 w-5 text-vor-navy" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-vor-navy">{approval.title}</h4>
        <p className="text-sm text-vor-slate">{approval.project}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-vor-slate">
          <span>Submitted: {formatDate(approval.submittedDate)}</span>
          {approval.status === 'approved' && (
            <>
              <span>•</span>
              <span>Approved by: {approval.approvedBy}</span>
            </>
          )}
        </div>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          statusColors[approval.status as keyof typeof statusColors]
        }`}
      >
        {approval.status}
      </span>
    </div>
  );
}

function DeadlineCard({ deadline }: { deadline: any }) {
  const isUrgent = deadline.daysRemaining <= 7;

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
          <h4 className="font-medium text-vor-navy">{deadline.milestone}</h4>
          <p className="text-sm text-vor-slate">{deadline.project}</p>
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
