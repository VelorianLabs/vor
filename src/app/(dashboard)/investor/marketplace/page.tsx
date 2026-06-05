/**
 * VOR Phase 2 - Investor Marketplace
 * 
 * Display projects available for funding with funding goal, amount raised,
 * ROI projection, risk score, development timeline, and project documents.
 */

import { DollarSign, TrendingUp, AlertTriangle, Calendar, FileText, Filter, Search, MapPin, Building2, Clock } from 'lucide-react';

// Mock data
const investmentProjects = [
  {
    id: 'proj-001',
    name: 'Lekki Corridor Land Fund III',
    description: 'Strategic land acquisition in the rapidly developing Lekki-Epe corridor. This fund focuses on acquiring prime parcels near the Lekki Free Trade Zone and Dangote Refinery for future residential and commercial development.',
    state: 'Lagos',
    location: 'Ibeju-Lekki',
    fundingGoal: 750000000,
    amountRaised: 525000000,
    minInvestment: 5000000,
    roiProjection: 22,
    riskScore: 4,
    termMonths: 24,
    status: 'OPEN_FOR_INVESTMENT',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    developmentTimeline: 'Land acquisition (Q3 2024) → Title verification (Q4 2024) → Infrastructure planning (Q1 2025) → Development launch (Q2 2025)',
    documents: [
      { name: 'Investment Memorandum', type: 'PDF' },
      { name: 'Financial Projections', type: 'PDF' },
      { name: 'Risk Assessment', type: 'PDF' },
    ],
    highlights: [
      'Strategic location near Lekki Free Trade Zone',
      'High growth potential (22% ROI)',
      'Professional title verification included',
      'Exit strategy via development or resale',
    ],
  },
  {
    id: 'proj-002',
    name: 'Abuja Satellite Towns Development',
    description: 'Residential development project in Lugbe and Kuje areas of Abuja. Targeting the growing demand for affordable housing from civil servants and private sector workers in the FCT.',
    state: 'Abuja',
    location: 'Lugbe/Kuje',
    fundingGoal: 400000000,
    amountRaised: 320000000,
    minInvestment: 2000000,
    roiProjection: 18,
    riskScore: 3,
    termMonths: 18,
    status: 'OPEN_FOR_INVESTMENT',
    startDate: '2024-05-01',
    endDate: '2024-10-31',
    developmentTimeline: 'Site acquisition (Q2 2024) → Permits (Q3 2024) → Construction (Q4 2024) → Completion (Q2 2025)',
    documents: [
      { name: 'Project Blueprint', type: 'PDF' },
      { name: 'Market Analysis', type: 'PDF' },
      { name: 'Construction Timeline', type: 'PDF' },
    ],
    highlights: [
      'High demand area in Abuja',
      'Government-backed infrastructure',
      'Affordable housing focus',
      '18-month term for quick returns',
    ],
  },
  {
    id: 'proj-003',
    name: 'Ogun Smart City Phase 2',
    description: 'Mixed-use development in Mowe-Ofada corridor. Combining residential, commercial, and industrial spaces to create a self-sustaining community along the Lagos-Ogun expressway.',
    state: 'Ogun',
    location: 'Mowe-Ofada',
    fundingGoal: 600000000,
    amountRaised: 540000000,
    minInvestment: 3000000,
    roiProjection: 20,
    riskScore: 5,
    termMonths: 36,
    status: 'CLOSING_SOON',
    startDate: '2024-03-01',
    endDate: '2024-07-31',
    developmentTimeline: 'Infrastructure (Q3 2024) → Residential units (Q4 2024) → Commercial spaces (Q1 2025) → Industrial zone (Q2 2025)',
    documents: [
      { name: 'Master Plan', type: 'PDF' },
      { name: 'Feasibility Study', type: 'PDF' },
      { name: 'Environmental Impact Assessment', type: 'PDF' },
    ],
    highlights: [
      'Mixed-use development model',
      'Strategic Lagos-Ogun location',
      'Long-term value appreciation',
      'Diversified revenue streams',
    ],
  },
  {
    id: 'proj-004',
    name: 'Victoria Island Commercial Fund',
    description: 'Acquisition and renovation of commercial properties in Victoria Island, Lagos. Focus on Grade A office spaces with high rental yields and capital appreciation potential.',
    state: 'Lagos',
    location: 'Victoria Island',
    fundingGoal: 1000000000,
    amountRaised: 200000000,
    minInvestment: 10000000,
    roiProjection: 15,
    riskScore: 6,
    termMonths: 48,
    status: 'OPEN_FOR_INVESTMENT',
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    developmentTimeline: 'Property acquisition (Q3 2024) → Renovation (Q4 2024) → Tenant acquisition (Q1 2025) → Stabilization (Q2 2025)',
    documents: [
      { name: 'Property Portfolio', type: 'PDF' },
      { name: 'Rental Market Analysis', type: 'PDF' },
      { name: 'Renovation Budget', type: 'PDF' },
    ],
    highlights: [
      'Prime Victoria Island location',
      'Grade A office spaces',
      'Stable rental income',
      'Long-term capital appreciation',
    ],
  },
];

const statusLabels = {
  DRAFT: 'Draft',
  REVIEW: 'In Review',
  APPROVED: 'Approved',
  OPEN_FOR_INVESTMENT: 'Open for Investment',
  CLOSING_SOON: 'Closing Soon',
  FUNDED: 'Funded',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const statusColors = {
  DRAFT: 'bg-vor-slate/10 text-vor-slate',
  REVIEW: 'bg-vor-gold/10 text-vor-gold',
  APPROVED: 'bg-blue-100 text-blue-600',
  OPEN_FOR_INVESTMENT: 'bg-vor-trust/10 text-vor-trust',
  CLOSING_SOON: 'bg-orange-100 text-orange-600',
  FUNDED: 'bg-vor-navy/10 text-vor-navy',
  ACTIVE: 'bg-vor-trust/10 text-vor-trust',
  COMPLETED: 'bg-vor-slate/10 text-vor-slate',
  CANCELLED: 'bg-red-100 text-red-600',
};

const riskLabels = {
  1: 'Very Low',
  2: 'Low',
  3: 'Low-Medium',
  4: 'Medium',
  5: 'Medium-High',
  6: 'High',
  7: 'High',
  8: 'Very High',
  9: 'Very High',
  10: 'Extreme',
};

const riskColors = {
  1: 'bg-vor-trust',
  2: 'bg-vor-trust',
  3: 'bg-vor-trust/80',
  4: 'bg-vor-gold',
  5: 'bg-vor-gold/80',
  6: 'bg-orange-500',
  7: 'bg-orange-500',
  8: 'bg-orange-500/80',
  9: 'bg-red-600',
  10: 'bg-red-600',
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

function calculateProgress(raised: number, goal: number): number {
  return Math.round((raised / goal) * 100);
}

export default function InvestorMarketplace() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Investment Marketplace
          </h1>
          <p className="mt-2 text-vor-slate">
            Discover and invest in verified real estate projects
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          <Filter className="h-4 w-4" />
          Filter Projects
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search projects by name, location, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Available Projects"
          value={investmentProjects.length.toString()}
          icon={Building2}
          color="bg-vor-trust"
        />
        <StatCard
          title="Total Funding Goal"
          value={formatCurrency(investmentProjects.reduce((sum, p) => sum + p.fundingGoal, 0))}
          icon={DollarSign}
          color="bg-vor-gold"
        />
        <StatCard
          title="Amount Raised"
          value={formatCurrency(investmentProjects.reduce((sum, p) => sum + p.amountRaised, 0))}
          icon={TrendingUp}
          color="bg-vor-navy"
        />
        <StatCard
          title="Average ROI"
          value={`${Math.round(investmentProjects.reduce((sum, p) => sum + p.roiProjection, 0) / investmentProjects.length)}%`}
          icon={TrendingUp}
          color="bg-vor-trust"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {investmentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
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

function ProjectCard({ project }: { project: any }) {
  const progress = calculateProgress(project.amountRaised, project.fundingGoal);
  const remaining = project.fundingGoal - project.amountRaised;

  return (
    <div className="rounded-xl border border-vor-border bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-vor-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-vor-slate" />
              <span className="text-sm text-vor-slate">
                {project.location}, {project.state}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-vor-navy">{project.name}</h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusColors[project.status as keyof typeof statusColors]
            }`}
          >
            {statusLabels[project.status as keyof typeof statusLabels]}
          </span>
        </div>
        <p className="text-sm text-vor-slate line-clamp-2">{project.description}</p>
      </div>

      {/* Funding Progress */}
      <div className="p-6 bg-vor-cream">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-vor-navy">Funding Progress</span>
          <span className="text-sm font-semibold text-vor-trust">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-vor-border mb-3">
          <div
            className="h-2 rounded-full bg-vor-trust transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-vor-slate">Raised</p>
            <p className="font-semibold text-vor-navy">{formatCurrency(project.amountRaised)}</p>
          </div>
          <div className="text-right">
            <p className="text-vor-slate">Goal</p>
            <p className="font-semibold text-vor-navy">{formatCurrency(project.fundingGoal)}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-vor-border">
        <MetricCard
          label="Min Investment"
          value={formatCurrency(project.minInvestment)}
          icon={DollarSign}
        />
        <MetricCard
          label="ROI Projection"
          value={`${project.roiProjection}%`}
          icon={TrendingUp}
          color="text-vor-trust"
        />
        <MetricCard
          label="Risk Score"
          value={project.riskScore.toString()}
          icon={AlertTriangle}
          color="text-vor-slate"
        />
        <MetricCard
          label="Term"
          value={`${project.termMonths} mo`}
          icon={Calendar}
        />
      </div>

      {/* Highlights */}
      <div className="p-6 border-b border-vor-border">
        <h4 className="text-sm font-semibold text-vor-navy mb-3">Key Highlights</h4>
        <ul className="space-y-2">
          {project.highlights.slice(0, 3).map((highlight: string, index: number) => (
            <li key={index} className="flex items-start gap-2 text-sm text-vor-slate">
              <span className="text-vor-gold mt-0.5">•</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div className="p-6 border-b border-vor-border">
        <h4 className="text-sm font-semibold text-vor-navy mb-2">Development Timeline</h4>
        <p className="text-sm text-vor-slate">{project.developmentTimeline}</p>
      </div>

      {/* Documents */}
      <div className="p-6 border-b border-vor-border">
        <h4 className="text-sm font-semibold text-vor-navy mb-3">Project Documents</h4>
        <div className="flex flex-wrap gap-2">
          {project.documents.map((doc: any, index: number) => (
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

      {/* Footer */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Clock className="h-4 w-4" />
          <span>Closes {formatDate(project.endDate)}</span>
        </div>
        <button className="rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          Invest Now
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  color = 'text-vor-navy',
}: {
  label: string;
  value: string;
  icon: any;
  color?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <Icon className="h-3 w-3 text-vor-slate" />
        <p className="text-xs text-vor-slate">{label}</p>
      </div>
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
}
