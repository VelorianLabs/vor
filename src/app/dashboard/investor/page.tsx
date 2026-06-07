/**
 * VOR Phase 2 - Investor Dashboard Overview
 *
 * Main dashboard page for investors showing portfolio summary and investment opportunities
 */

import { TrendingUp, Wallet, BarChart3, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';

export default function InvestorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">Welcome back</h1>
        <p className="mt-2 text-vor-slate">Here&apos;s an overview of your investment portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Investment"
          value="₦25,000,000"
          icon={Wallet}
          trend="+₦5,000,000 this quarter"
          color="bg-vor-trust/10 text-vor-trust"
        />
        <StatCard
          title="Current Value"
          value="₦28,750,000"
          icon={DollarSign}
          trend="+15% ROI"
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="Active Investments"
          value="4"
          icon={TrendingUp}
          trend="2 performing well"
          color="bg-vor-navy/10 text-vor-navy"
        />
        <StatCard
          title="Reports Available"
          value="12"
          icon={BarChart3}
          trend="3 new this month"
          color="bg-vor-trust/10 text-vor-trust"
        />
      </div>

      {/* Investment Opportunities */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-vor-navy">Investment Opportunities</h2>
          <a href="/dashboard/investor/marketplace" className="text-sm font-medium text-vor-gold hover:text-vor-gold-light">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InvestmentCard
            name="Lekki Peninsula Development Pool"
            location="Lekki, Lagos"
            targetAmount="₦100,000,000"
            raisedAmount="₦75,000,000"
            roi={18}
            minInvestment="₦1,000,000"
            status="open"
          />
          <InvestmentCard
            name="Abuja Prime Estate Fund"
            location="Katampe, Abuja"
            targetAmount="₦150,000,000"
            raisedAmount="₦45,000,000"
            roi={22}
            minInvestment="₦2,000,000"
            status="open"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="Investment Made"
              description="Lekki Peninsula Development Pool"
              date="2 days ago"
              amount="₦2,000,000"
              icon={TrendingUp}
            />
            <ActivityItem
              title="Dividend Received"
              description="Q1 2026 dividend payout"
              date="1 week ago"
              amount="₦180,000"
              icon={DollarSign}
            />
            <ActivityItem
              title="Report Generated"
              description="Monthly portfolio performance"
              date="2 weeks ago"
              amount="N/A"
              icon={BarChart3}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <EventItem
              title="Q2 Investor Meeting"
              date="June 15, 2026"
              time="2:00 PM WAT"
              icon={Calendar}
            />
            <EventItem
              title="Dividend Payout"
              date="June 30, 2026"
              time="End of day"
              icon={DollarSign}
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

function InvestmentCard({
  name,
  location,
  targetAmount,
  raisedAmount,
  roi,
  minInvestment,
  status,
}: {
  name: string;
  location: string;
  targetAmount: string;
  raisedAmount: string;
  roi: number;
  minInvestment: string;
  status: string;
}) {
  const progress = (parseInt(raisedAmount.replace(/[₦,]/g, '')) / parseInt(targetAmount.replace(/[₦,]/g, ''))) * 100;

  return (
    <div className="border border-vor-border rounded-lg p-4 hover:bg-vor-cream transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-vor-navy">{name}</h3>
          <p className="text-sm text-vor-slate">{location}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-vor-trust/10 text-vor-trust">
          {status}
        </span>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-vor-slate">Raised</span>
          <span className="font-medium">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-vor-cream rounded-full overflow-hidden">
          <div className="h-full bg-vor-trust rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-vor-slate">Min. Investment</p>
          <p className="text-sm font-semibold text-vor-navy">{minInvestment}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-vor-slate">Projected ROI</p>
          <p className="text-sm font-semibold text-vor-trust">{roi}%</p>
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
          {amount !== 'N/A' && (
            <>
              <span className="text-vor-slate">•</span>
              <p className="text-sm font-semibold text-vor-navy">{amount}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EventItem({
  title,
  date,
  time,
  icon: Icon,
}: {
  title: string;
  date: string;
  time: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-vor-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <div className="flex items-center gap-2 text-sm text-vor-slate mt-1">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-vor-gold" />
    </div>
  );
}
