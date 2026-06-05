/**
 * VOR Phase 2 - Contractor Projects
 * 
 * View assigned projects, track progress, manage milestones,
 * and view project details.
 */

import { HardHat, MapPin, Calendar, TrendingUp, DollarSign, Clock, CheckCircle, Filter, Search } from 'lucide-react';

// Mock data
const projectsData = {
  projects: [
    {
      id: 'proj-001',
      name: 'VOR Green Courts — Epe',
      location: 'Epe, Lagos',
      state: 'Lagos',
      progress: 68,
      units: 48,
      completionDate: '2026-09-30',
      budget: 150000000,
      spent: 52500000,
      status: 'IN_PROGRESS',
      startDate: '2024-01-15',
      role: 'Lead Contractor',
      description: 'Residential development project featuring 48 luxury terrace homes in Epe, Lagos. Project includes infrastructure development, construction of residential units, and landscaping.',
      milestones: [
        { id: 'm-001', name: 'Foundation Complete', progress: 100, status: 'completed', completedDate: '2024-04-15' },
        { id: 'm-002', name: 'Structure Frame', progress: 85, status: 'in_progress', targetDate: '2024-08-15' },
        { id: 'm-003', name: 'Roofing', progress: 30, status: 'in_progress', targetDate: '2024-11-30' },
        { id: 'm-004', name: 'MEP Installation', progress: 15, status: 'in_progress', targetDate: '2025-02-28' },
        { id: 'm-005', name: 'Interior Finishing', progress: 0, status: 'upcoming', targetDate: '2025-06-30' },
        { id: 'm-006', name: 'Final Inspection', progress: 0, status: 'upcoming', targetDate: '2026-08-15' },
      ],
      team: [
        { name: 'John Smith', role: 'Site Manager' },
        { name: 'Jane Doe', role: 'Architect' },
        { name: 'Mike Johnson', role: 'Engineer' },
      ],
    },
    {
      id: 'proj-002',
      name: 'Abuja Gateway Terraces',
      location: 'Lugbe, FCT',
      state: 'Abuja',
      progress: 42,
      units: 24,
      completionDate: '2027-03-31',
      budget: 75000000,
      spent: 25000000,
      status: 'IN_PROGRESS',
      startDate: '2024-03-22',
      role: 'Sub-Contractor',
      description: 'Mixed-use development in Lugbe, Abuja featuring 24 residential units and commercial spaces. Focus on affordable housing with modern amenities.',
      milestones: [
        { id: 'm-007', name: 'Site Preparation', progress: 100, status: 'completed', completedDate: '2024-05-15' },
        { id: 'm-008', name: 'Foundation', progress: 75, status: 'in_progress', targetDate: '2024-08-30' },
        { id: 'm-009', name: 'Superstructure', progress: 20, status: 'in_progress', targetDate: '2025-01-31' },
        { id: 'm-010', name: 'MEP Installation', progress: 0, status: 'upcoming', targetDate: '2025-06-30' },
        { id: 'm-011', name: 'Finishing', progress: 0, status: 'upcoming', targetDate: '2026-09-30' },
      ],
      team: [
        { name: 'David Wilson', role: 'Project Manager' },
        { name: 'Sarah Brown', role: 'Site Engineer' },
      ],
    },
    {
      id: 'proj-003',
      name: 'Ogun Smart Homes Phase 1',
      location: 'Mowe, Ogun',
      state: 'Ogun',
      progress: 85,
      units: 36,
      completionDate: '2025-12-31',
      budget: 25000000,
      spent: 10000000,
      status: 'IN_PROGRESS',
      startDate: '2023-08-15',
      role: 'Lead Contractor',
      description: 'Smart homes development in Mowe-Ofada corridor with 36 residential units featuring modern smart home technology and sustainable design.',
      milestones: [
        { id: 'm-012', name: 'Infrastructure', progress: 100, status: 'completed', completedDate: '2023-12-15' },
        { id: 'm-013', name: 'Foundation', progress: 100, status: 'completed', completedDate: '2024-03-15' },
        { id: 'm-014', name: 'Superstructure', progress: 95, status: 'in_progress', targetDate: '2024-09-30' },
        { id: 'm-015', name: 'Roofing', progress: 80, status: 'in_progress', targetDate: '2025-02-28' },
        { id: 'm-016', name: 'MEP Installation', progress: 60, status: 'in_progress', targetDate: '2025-06-30' },
        { id: 'm-017', name: 'Smart Home Integration', progress: 40, status: 'in_progress', targetDate: '2025-09-30' },
        { id: 'm-018', name: 'Finishing', progress: 30, status: 'in_progress', targetDate: '2025-12-15' },
      ],
      team: [
        { name: 'Robert Taylor', role: 'Site Manager' },
        { name: 'Emily Davis', role: 'Smart Home Specialist' },
        { name: 'Chris Martin', role: 'Electrical Engineer' },
      ],
    },
  ],
};

const statusLabels = {
  PLANNING: 'Planning',
  APPROVED: 'Approved',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const statusColors = {
  PLANNING: 'bg-vor-slate/10 text-vor-slate',
  APPROVED: 'bg-blue-100 text-blue-600',
  IN_PROGRESS: 'bg-vor-trust/10 text-vor-trust',
  ON_HOLD: 'bg-vor-gold/10 text-vor-gold',
  COMPLETED: 'bg-vor-navy/10 text-vor-navy',
  CANCELLED: 'bg-red-100 text-red-600',
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

export default function ContractorProjects() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            My Projects
          </h1>
          <p className="mt-2 text-vor-slate">
            View and manage your assigned construction projects
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
          placeholder="Search projects by name, location, or status..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {projectsData.projects.map((project) => (
          <ProjectDetailCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function ProjectDetailCard({ project }: { project: any }) {
  const budgetUtilization = ((project.spent / project.budget) * 100).toFixed(1);
  const completedMilestones = project.milestones.filter((m: any) => m.status === 'completed').length;
  const totalMilestones = project.milestones.length;

  return (
    <div className="rounded-xl border border-vor-border bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-vor-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <HardHat className="h-5 w-5 text-vor-trust" />
              <span className="text-sm font-medium text-vor-trust">{project.role}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusColors[project.status as keyof typeof statusColors]
                }`}
              >
                {statusLabels[project.status as keyof typeof statusLabels]}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-vor-navy">{project.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-vor-slate">
              <MapPin className="h-4 w-4" />
              <span>{project.location}, {project.state}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-vor-trust">{project.progress}%</p>
            <p className="text-xs text-vor-slate">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-3 w-full rounded-full bg-vor-cream">
            <div
              className="h-3 rounded-full bg-vor-trust transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-vor-slate line-clamp-2">{project.description}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-vor-border">
        <Metric label="Units" value={project.units} icon={HardHat} />
        <Metric label="Budget" value={formatCurrency(project.budget)} icon={DollarSign} />
        <Metric label="Spent" value={formatCurrency(project.spent)} icon={TrendingUp} />
        <Metric label="Utilization" value={`${budgetUtilization}%`} icon={TrendingUp} />
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-2 gap-4 p-6 border-b border-vor-border">
        <TimelineItem label="Start Date" value={formatDate(project.startDate)} icon={Calendar} />
        <TimelineItem label="Completion" value={formatDate(project.completionDate)} icon={Calendar} />
      </div>

      {/* Milestones */}
      <div className="p-6 border-b border-vor-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-vor-navy">Milestones</h4>
          <span className="text-xs text-vor-slate">
            {completedMilestones}/{totalMilestones} completed
          </span>
        </div>
        <div className="space-y-3">
          {project.milestones.map((milestone: any) => (
            <MilestoneRow key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="p-6 border-b border-vor-border">
        <h4 className="text-sm font-semibold text-vor-navy mb-3">Project Team</h4>
        <div className="flex flex-wrap gap-2">
          {project.team.map((member: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-vor-navy text-xs font-medium text-white">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-vor-navy">{member.name}</p>
                <p className="text-xs text-vor-slate">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-vor-cream flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-vor-slate">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-vor-trust" />
            <span>{completedMilestones} milestones completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {Math.ceil((new Date(project.completionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-vor-navy px-4 py-2 text-sm font-semibold text-white hover:bg-vor-navy-light">
          View Details
        </button>
      </div>
    </div>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
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

function TimelineItem({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-vor-slate" />
      <div>
        <p className="text-xs text-vor-slate">{label}</p>
        <p className="text-sm font-medium text-vor-navy">{value}</p>
      </div>
    </div>
  );
}

function MilestoneRow({ milestone }: { milestone: any }) {
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
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2 flex-1">
            <div className="h-1.5 flex-1 rounded-full bg-vor-cream">
              <div
                className="h-1.5 rounded-full bg-vor-trust"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
            <span className="text-xs text-vor-slate">{milestone.progress}%</span>
          </div>
          <span className="text-xs text-vor-slate">
            {milestone.completedDate
              ? `Completed: ${formatDate(milestone.completedDate)}`
              : milestone.targetDate
              ? `Target: ${formatDate(milestone.targetDate)}`
              : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
