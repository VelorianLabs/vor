/**
 * VOR Phase 2 - Finance Officer Dashboard Overview
 *
 * Main dashboard page for finance officers showing transactions, invoices, and reports
 */

import { ArrowRightLeft, FileText, BarChart3, TrendingUp, DollarSign, Clock } from 'lucide-react';

export default function FinanceOfficerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">Welcome back</h1>
        <p className="mt-2 text-vor-slate">Here&apos;s an overview of financial operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Transactions"
          value="156"
          icon={ArrowRightLeft}
          trend="+12% this month"
          color="bg-vor-trust/10 text-vor-trust"
        />
        <StatCard
          title="Pending Invoices"
          value="8"
          icon={FileText}
          trend="₦4.2M outstanding"
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="Revenue"
          value="₦125.8M"
          icon={DollarSign}
          trend="+18% this quarter"
          color="bg-vor-trust/10 text-vor-trust"
        />
        <StatCard
          title="Reports Generated"
          value="24"
          icon={BarChart3}
          trend="5 this week"
          color="bg-vor-navy/10 text-vor-navy"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <ActivityItem
              title="Payment Received"
              description="Client payment for VOR-LAG-001"
              date="2 hours ago"
              amount="₦1,225,000"
              icon={ArrowRightLeft}
            />
            <ActivityItem
              title="Invoice Generated"
              description="Monthly service invoice for contractor"
              date="1 day ago"
              amount="₦850,000"
              icon={FileText}
            />
            <ActivityItem
              title="Investment Deposit"
              description="New investor funding received"
              date="3 days ago"
              amount="₦5,000,000"
              icon={DollarSign}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Pending Actions</h2>
          <div className="space-y-4">
            <ActionItem
              title="Invoice Approval"
              description="3 invoices awaiting review"
              date="Due today"
              icon={FileText}
            />
            <ActionItem
              title="Report Generation"
              description="Monthly financial report"
              date="Due in 2 days"
              icon={BarChart3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-3xl font-bold text-vor-navy">{value}</p>
          <p className="mt-2 text-sm text-vor-slate">{trend}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  date,
  amount,
  icon: Icon,
}: {
  title: string;
  description: string;
  date: string;
  amount: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-vor-cream">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{description}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-vor-slate">{date}</p>
          <span className="text-vor-slate">•</span>
          <p className="text-sm font-semibold text-vor-navy">{amount}</p>
        </div>
      </div>
    </div>
  );
}

function ActionItem({
  title,
  description,
  date,
  icon: Icon,
}: {
  title: string;
  description: string;
  date: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-vor-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{description}</p>
        <p className="text-sm font-semibold text-vor-navy mt-1">{date}</p>
      </div>
      <Clock className="h-5 w-5 text-vor-gold" />
    </div>
  );
}
