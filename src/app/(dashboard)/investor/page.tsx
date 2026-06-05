/**
 * VOR Phase 2 - Investor Dashboard Overview
 * 
 * Display total investments, current portfolio value, expected returns,
 * active projects, and completed projects.
 */

import { DollarSign, TrendingUp, PieChart, Clock, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data
const investorStats = {
  totalInvestments: 50000000,
  portfolioValue: 54250000,
  expectedReturns: 8500000,
  activeProjects: 3,
  completedProjects: 2,
  totalROI: 8.5,
};

const portfolioSummary = [
  {
    id: 'inv-001',
    projectName: 'Lekki Corridor Land Fund II',
    amountInvested: 25000000,
    currentValue: 27125000,
    expectedReturn: 4500000,
    roi: 8.5,
    status: 'active',
    investmentDate: '2024-01-15',
    maturityDate: '2026-01-15',
  },
  {
    id: 'inv-002',
    projectName: 'FCT Residential Development Pool',
    amountInvested: 15000000,
    currentValue: 16125000,
    expectedReturn: 2700000,
    roi: 7.5,
    status: 'active',
    investmentDate: '2024-03-22',
    maturityDate: '2025-09-22',
  },
  {
    id: 'inv-003',
    projectName: 'Ogun Affordable Housing Fund',
    amountInvested: 10000000,
    currentValue: 11000000,
    expectedReturn: 1300000,
    roi: 10.0,
    status: 'active',
    investmentDate: '2024-05-10',
    maturityDate: '2027-05-10',
  },
  {
    id: 'inv-004',
    projectName: 'Lagos Island Commercial Fund',
    amountInvested: 5000000,
    currentValue: 5250000,
    expectedReturn: 750000,
    roi: 15.0,
    status: 'completed',
    investmentDate: '2023-06-01',
    maturityDate: '2024-06-01',
    completedDate: '2024-06-01',
  },
  {
    id: 'inv-005',
    projectName: 'Abuja Smart City Phase 1',
    amountInvested: 3000000,
    currentValue: 3150000,
    expectedReturn: 450000,
    roi: 15.0,
    status: 'completed',
    investmentDate: '2023-08-15',
    maturityDate: '2024-02-15',
    completedDate: '2024-02-15',
  },
];

const recentActivity = [
  {
    id: 'act-001',
    type: 'investment',
    title: 'New Investment',
    description: 'Invested ₦10,000,000 in Ogun Affordable Housing Fund',
    amount: 10000000,
    date: '2024-05-10T10:30:00Z',
  },
  {
    id: 'act-002',
    type: 'return',
    title: 'ROI Payout',
    description: 'Received ₦750,000 ROI from Lagos Island Commercial Fund',
    amount: 750000,
    date: '2024-06-01T14:20:00Z',
  },
  {
    id: 'act-003',
    type: 'milestone',
    title: 'Project Milestone',
    description: 'FCT Residential Development Pool reached 75% funding',
    amount: null,
    date: '2024-06-15T09:00:00Z',
  },
  {
    id: 'act-004',
    type: 'return',
    title: 'ROI Payout',
    description: 'Received ₦450,000 ROI from Abuja Smart City Phase 1',
    amount: 450000,
    date: '2024-02-15T16:45:00Z',
  },
];

const upcomingMilestones = [
  {
    id: 'mile-001',
    project: 'Lekki Corridor Land Fund II',
    milestone: 'Funding Target Reached',
    targetDate: '2024-08-15',
    status: 'upcoming',
  },
  {
    id: 'mile-002',
    project: 'FCT Residential Development Pool',
    milestone: 'Construction Phase 1 Complete',
    targetDate: '2024-09-30',
    status: 'upcoming',
  },
  {
    id: 'mile-003',
    project: 'Ogun Affordable Housing Fund',
    milestone: 'Foundation Complete',
    targetDate: '2024-10-15',
    status: 'upcoming',
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

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function InvestorDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Investor Dashboard
        </h1>
        <p className="mt-2 text-vor-slate">
          Overview of your investment portfolio and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Investments"
          value={formatCurrency(investorStats.totalInvestments)}
          icon={DollarSign}
          color="bg-vor-trust"
          trend="+₦5M this quarter"
        />
        <StatCard
          title="Portfolio Value"
          value={formatCurrency(investorStats.portfolioValue)}
          icon={PieChart}
          color="bg-vor-gold"
          trend="+8.5% ROI"
        />
        <StatCard
          title="Expected Returns"
          value={formatCurrency(investorStats.expectedReturns)}
          icon={TrendingUp}
          color="bg-vor-navy"
          trend="Across all projects"
        />
        <StatCard
          title="Active Projects"
          value={investorStats.activeProjects.toString()}
          icon={Clock}
          color="bg-vor-gold"
          trend="3 ongoing"
        />
        <StatCard
          title="Completed Projects"
          value={investorStats.completedProjects.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
          trend="2 completed"
        />
        <StatCard
          title="Total ROI"
          value={`${investorStats.totalROI}%`}
          icon={ArrowUpRight}
          color="bg-vor-trust"
          trend="Above average"
        />
      </div>

      {/* Portfolio Summary */}
      <section>
        <SectionHeader
          title="Portfolio Summary"
          subtitle="Your active and completed investments"
          link="/dashboard/investor/portfolio"
          linkText="View All"
        />
        <div className="rounded-xl border border-vor-border bg-white overflow-hidden shadow-card">
          <table className="w-full">
            <thead className="bg-vor-cream">
              <tr>
                <TableHeader>Project</TableHeader>
                <TableHeader>Invested</TableHeader>
                <TableHeader>Current Value</TableHeader>
                <TableHeader>Expected Return</TableHeader>
                <TableHeader>ROI</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Maturity</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {portfolioSummary.map((investment) => (
                <PortfolioRow key={investment.id} investment={investment} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <section>
          <SectionHeader
            title="Recent Activity"
            subtitle="Your latest investment activities"
          />
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>

        {/* Upcoming Milestones */}
        <section>
          <SectionHeader
            title="Upcoming Milestones"
            subtitle="Key project milestones to watch"
          />
          <div className="space-y-4">
            {upcomingMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </section>
      </div>

      {/* Performance Overview */}
      <section>
        <SectionHeader
          title="Performance Overview"
          subtitle="Your investment performance over time"
        />
        <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
          <div className="grid gap-6 sm:grid-cols-3">
            <PerformanceCard
              title="Total Invested"
              value={formatCurrency(investorStats.totalInvestments)}
              change="+₦10M"
              changeType="positive"
            />
            <PerformanceCard
              title="Total Returns"
              value={formatCurrency(investorStats.portfolioValue - investorStats.totalInvestments)}
              change="+₦4.25M"
              changeType="positive"
            />
            <PerformanceCard
              title="Average ROI"
              value={`${investorStats.totalROI}%`}
              change="+2.5%"
              changeType="positive"
            />
          </div>
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
  trend,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-2xl font-bold text-vor-navy">{value}</p>
          <p className="mt-1 text-xs text-vor-slate">{trend}</p>
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

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-vor-slate">
      {children}
    </th>
  );
}

function PortfolioRow({ investment }: { investment: any }) {
  const statusColors = {
    active: 'bg-vor-trust/10 text-vor-trust',
    completed: 'bg-vor-gold/10 text-vor-gold',
    pending: 'bg-vor-slate/10 text-vor-slate',
  };

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-vor-navy">{investment.projectName}</p>
          <p className="text-xs text-vor-slate">Invested {formatDate(investment.investmentDate)}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-navy">
        {formatCurrency(investment.amountInvested)}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-vor-trust">
        {formatCurrency(investment.currentValue)}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {formatCurrency(investment.expectedReturn)}
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-1 text-sm font-semibold text-vor-trust">
          <ArrowUpRight className="h-4 w-4" />
          {investment.roi}%
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[investment.status as keyof typeof statusColors]
          }`}
        >
          {investment.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {formatDate(investment.maturityDate)}
      </td>
    </tr>
  );
}

function ActivityCard({ activity }: { activity: any }) {
  const typeIcons = {
    investment: DollarSign,
    return: TrendingUp,
    milestone: CheckCircle,
  };

  const Icon = typeIcons[activity.type as keyof typeof typeIcons] || AlertCircle;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-cream">
        <Icon className="h-5 w-5 text-vor-navy" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-vor-navy">{activity.title}</h4>
            <p className="mt-1 text-sm text-vor-slate">{activity.description}</p>
          </div>
          {activity.amount && (
            <span className="font-semibold text-vor-trust">
              {formatCurrency(activity.amount)}
            </span>
          )}
        </div>
        <p className="mt-2 text-xs text-vor-slate">
          {formatDateTime(activity.date)}
        </p>
      </div>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: any }) {
  const daysUntil = Math.ceil(
    (new Date(milestone.targetDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex items-start gap-4 rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold">
        <Clock className="h-5 w-5 text-vor-navy" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-vor-navy">{milestone.milestone}</h4>
        <p className="mt-1 text-sm text-vor-slate">{milestone.project}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-vor-slate">
          <span>Target: {formatDate(milestone.targetDate)}</span>
          <span>•</span>
          <span className="font-medium text-vor-gold">{daysUntil} days</span>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard({
  title,
  value,
  change,
  changeType,
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}) {
  return (
    <div className="rounded-lg bg-vor-cream p-6">
      <p className="text-sm font-medium text-vor-slate">{title}</p>
      <p className="mt-2 text-2xl font-bold text-vor-navy">{value}</p>
      <div className="mt-2 flex items-center gap-1 text-sm">
        {changeType === 'positive' ? (
          <ArrowUpRight className="h-4 w-4 text-vor-trust" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-600" />
        )}
        <span
          className={
            changeType === 'positive' ? 'text-vor-trust' : 'text-red-600'
          }
        >
          {change}
        </span>
      </div>
    </div>
  );
}
