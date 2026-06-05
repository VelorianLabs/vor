/**
 * VOR Phase 2 - Investor Portfolio
 * 
 * View detailed portfolio with active and completed investments,
 * performance metrics, and project details.
 */

import { PieChart, TrendingUp, DollarSign, Calendar, CheckCircle, Clock, Download, Filter } from 'lucide-react';

// Mock data
const portfolioData = {
  totalInvested: 50000000,
  currentValue: 54250000,
  totalReturns: 4250000,
  averageROI: 8.5,
  activeInvestments: 3,
  completedInvestments: 2,
  investments: [
    {
      id: 'inv-001',
      projectId: 'proj-001',
      projectName: 'Lekki Corridor Land Fund II',
      projectDescription: 'Strategic land acquisition in the rapidly developing Lekki-Epe corridor',
      state: 'Lagos',
      location: 'Ibeju-Lekki',
      amountInvested: 25000000,
      currentValue: 27125000,
      expectedReturn: 4500000,
      roi: 8.5,
      status: 'active',
      investmentDate: '2024-01-15',
      maturityDate: '2026-01-15',
      termMonths: 24,
      shares: 5000,
      sharePrice: 5000,
      documents: [
        { name: 'Investment Certificate', type: 'PDF' },
        { name: 'Project Updates', type: 'PDF' },
      ],
      milestones: [
        { name: 'Funding Complete', date: '2024-03-15', status: 'completed' },
        { name: 'Land Acquisition', date: '2024-06-15', status: 'in_progress' },
        { name: 'Title Verification', date: '2024-09-15', status: 'upcoming' },
        { name: 'Development Launch', date: '2025-01-15', status: 'upcoming' },
      ],
    },
    {
      id: 'inv-002',
      projectId: 'proj-002',
      projectName: 'FCT Residential Development Pool',
      projectDescription: 'Residential development project in Lugbe and Kuje areas of Abuja',
      state: 'Abuja',
      location: 'Lugbe/Kuje',
      amountInvested: 15000000,
      currentValue: 16125000,
      expectedReturn: 2700000,
      roi: 7.5,
      status: 'active',
      investmentDate: '2024-03-22',
      maturityDate: '2025-09-22',
      termMonths: 18,
      shares: 3000,
      sharePrice: 5000,
      documents: [
        { name: 'Investment Certificate', type: 'PDF' },
        { name: 'Construction Progress', type: 'PDF' },
      ],
      milestones: [
        { name: 'Site Acquisition', date: '2024-04-15', status: 'completed' },
        { name: 'Permits Approved', date: '2024-07-15', status: 'in_progress' },
        { name: 'Construction Start', date: '2024-10-15', status: 'upcoming' },
        { name: 'Project Completion', date: '2025-09-22', status: 'upcoming' },
      ],
    },
    {
      id: 'inv-003',
      projectId: 'proj-003',
      projectName: 'Ogun Affordable Housing Fund',
      projectDescription: 'Mixed-use development in Mowe-Ofada corridor',
      state: 'Ogun',
      location: 'Mowe-Ofada',
      amountInvested: 10000000,
      currentValue: 11000000,
      expectedReturn: 1300000,
      roi: 10.0,
      status: 'active',
      investmentDate: '2024-05-10',
      maturityDate: '2027-05-10',
      termMonths: 36,
      shares: 2000,
      sharePrice: 5000,
      documents: [
        { name: 'Investment Certificate', type: 'PDF' },
        { name: 'Master Plan', type: 'PDF' },
      ],
      milestones: [
        { name: 'Infrastructure Start', date: '2024-08-15', status: 'upcoming' },
        { name: 'Residential Units', date: '2024-12-15', status: 'upcoming' },
        { name: 'Commercial Spaces', date: '2025-04-15', status: 'upcoming' },
        { name: 'Project Completion', date: '2027-05-10', status: 'upcoming' },
      ],
    },
    {
      id: 'inv-004',
      projectId: 'proj-004',
      projectName: 'Lagos Island Commercial Fund',
      projectDescription: 'Acquisition and renovation of commercial properties in Victoria Island',
      state: 'Lagos',
      location: 'Victoria Island',
      amountInvested: 5000000,
      currentValue: 5250000,
      expectedReturn: 750000,
      roi: 15.0,
      status: 'completed',
      investmentDate: '2023-06-01',
      maturityDate: '2024-06-01',
      termMonths: 12,
      shares: 1000,
      sharePrice: 5000,
      documents: [
        { name: 'Investment Certificate', type: 'PDF' },
        { name: 'Final Report', type: 'PDF' },
        { name: 'ROI Statement', type: 'PDF' },
      ],
      milestones: [
        { name: 'Property Acquisition', date: '2023-08-15', status: 'completed' },
        { name: 'Renovation Complete', date: '2023-12-15', status: 'completed' },
        { name: 'Tenant Acquisition', date: '2024-02-15', status: 'completed' },
        { name: 'Project Maturity', date: '2024-06-01', status: 'completed' },
      ],
      completedDate: '2024-06-01',
      actualROI: 15.0,
    },
    {
      id: 'inv-005',
      projectId: 'proj-005',
      projectName: 'Abuja Smart City Phase 1',
      projectDescription: 'Smart city development in Abuja with modern infrastructure',
      state: 'Abuja',
      location: 'Airport Road',
      amountInvested: 3000000,
      currentValue: 3150000,
      expectedReturn: 450000,
      roi: 15.0,
      status: 'completed',
      investmentDate: '2023-08-15',
      maturityDate: '2024-02-15',
      termMonths: 6,
      shares: 600,
      sharePrice: 5000,
      documents: [
        { name: 'Investment Certificate', type: 'PDF' },
        { name: 'Final Report', type: 'PDF' },
        { name: 'ROI Statement', type: 'PDF' },
      ],
      milestones: [
        { name: 'Infrastructure Complete', date: '2023-10-15', status: 'completed' },
        { name: 'Phase 1 Launch', date: '2023-12-15', status: 'completed' },
        { name: 'Stabilization', date: '2024-01-15', status: 'completed' },
        { name: 'Project Maturity', date: '2024-02-15', status: 'completed' },
      ],
      completedDate: '2024-02-15',
      actualROI: 15.0,
    },
  ],
};

const statusLabels = {
  active: 'Active',
  completed: 'Completed',
  pending: 'Pending',
  cancelled: 'Cancelled',
};

const statusColors = {
  active: 'bg-vor-trust/10 text-vor-trust',
  completed: 'bg-vor-gold/10 text-vor-gold',
  pending: 'bg-vor-slate/10 text-vor-slate',
  cancelled: 'bg-red-100 text-red-600',
};

const milestoneStatusColors = {
  completed: 'bg-vor-trust',
  in_progress: 'bg-vor-gold',
  upcoming: 'bg-vor-slate',
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

export default function InvestorPortfolio() {
  const activeInvestments = portfolioData.investments.filter(i => i.status === 'active');
  const completedInvestments = portfolioData.investments.filter(i => i.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Investment Portfolio
          </h1>
          <p className="mt-2 text-vor-slate">
            Track your investments and monitor performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Download className="h-4 w-4" />
            Export Portfolio
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invested"
          value={formatCurrency(portfolioData.totalInvested)}
          icon={DollarSign}
          color="bg-vor-navy"
        />
        <StatCard
          title="Current Value"
          value={formatCurrency(portfolioData.currentValue)}
          icon={PieChart}
          color="bg-vor-trust"
        />
        <StatCard
          title="Total Returns"
          value={formatCurrency(portfolioData.totalReturns)}
          icon={TrendingUp}
          color="bg-vor-gold"
        />
        <StatCard
          title="Average ROI"
          value={`${portfolioData.averageROI}%`}
          icon={TrendingUp}
          color="bg-vor-trust"
        />
      </div>

      {/* Active Investments */}
      <section>
        <SectionHeader
          title="Active Investments"
          subtitle={`Currently active: ${activeInvestments.length} projects`}
        />
        <div className="space-y-6">
          {activeInvestments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      </section>

      {/* Completed Investments */}
      <section>
        <SectionHeader
          title="Completed Investments"
          subtitle={`Successfully completed: ${completedInvestments.length} projects`}
        />
        <div className="space-y-6">
          {completedInvestments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
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

function InvestmentCard({ investment }: { investment: any }) {
  const profit = investment.currentValue - investment.amountInvested;
  const profitPercentage = ((profit / investment.amountInvested) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-vor-border bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-vor-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-vor-slate">
                {investment.location}, {investment.state}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusColors[investment.status as keyof typeof statusColors]
                }`}
              >
                {statusLabels[investment.status as keyof typeof statusLabels]}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-vor-navy">{investment.projectName}</h3>
            <p className="mt-2 text-sm text-vor-slate">{investment.projectDescription}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Metric
            label="Invested"
            value={formatCurrency(investment.amountInvested)}
          />
          <Metric
            label="Current Value"
            value={formatCurrency(investment.currentValue)}
            highlight
          />
          <Metric
            label="Profit/Loss"
            value={formatCurrency(profit)}
            color={profit >= 0 ? 'text-vor-trust' : 'text-red-600'}
          />
          <Metric
            label="ROI"
            value={`${profitPercentage}%`}
            color={parseFloat(profitPercentage) >= 0 ? 'text-vor-trust' : 'text-red-600'}
          />
        </div>
      </div>

      {/* Investment Details */}
      <div className="grid grid-cols-2 gap-6 p-6 border-b border-vor-border">
        <div>
          <h4 className="text-sm font-semibold text-vor-navy mb-3">Investment Details</h4>
          <div className="space-y-2 text-sm">
            <DetailRow label="Investment Date" value={formatDate(investment.investmentDate)} />
            <DetailRow label="Maturity Date" value={formatDate(investment.maturityDate)} />
            <DetailRow label="Term" value={`${investment.termMonths} months`} />
            <DetailRow label="Shares" value={investment.shares.toLocaleString()} />
            <DetailRow label="Share Price" value={formatCurrency(investment.sharePrice)} />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-vor-navy mb-3">Documents</h4>
          <div className="space-y-2">
            {investment.documents.map((doc: any, index: number) => (
              <button
                key={index}
                className="flex items-center gap-2 w-full rounded-lg bg-vor-cream px-3 py-2 text-sm text-vor-navy hover:bg-vor-border text-left"
              >
                <Download className="h-4 w-4" />
                {doc.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-vor-navy mb-4">Project Milestones</h4>
        <div className="space-y-3">
          {investment.milestones.map((milestone: any, index: number) => (
            <MilestoneItem key={index} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Footer */}
      {investment.status === 'active' && (
        <div className="p-6 bg-vor-cream flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-vor-slate">
            <Calendar className="h-4 w-4" />
            <span>Matures in {Math.ceil((new Date(investment.maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
          </div>
          <button className="rounded-lg bg-vor-navy px-4 py-2 text-sm font-semibold text-white hover:bg-vor-navy-light">
            View Details
          </button>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  highlight = false,
  color = 'text-vor-navy',
}: {
  label: string;
  value: string;
  highlight?: boolean;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs text-vor-slate">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? 'text-lg' : ''} ${color}`}>
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-vor-slate">{label}</span>
      <span className="font-medium text-vor-navy">{value}</span>
    </div>
  );
}

function MilestoneItem({ milestone }: { milestone: any }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          milestoneStatusColors[milestone.status as keyof typeof milestoneStatusColors]
        }`}
      >
        {milestone.status === 'completed' && <CheckCircle className="h-3 w-3 text-white" />}
        {milestone.status === 'in_progress' && <Clock className="h-3 w-3 text-white" />}
        {milestone.status === 'upcoming' && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-vor-navy">{milestone.name}</p>
        <p className="text-xs text-vor-slate">{formatDate(milestone.date)}</p>
      </div>
    </div>
  );
}
