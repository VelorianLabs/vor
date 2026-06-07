/**
 * VOR Admin Dashboard - Main Overview
 *
 * Comprehensive admin dashboard showing stats for all 3 phases
 */

import { Users, Map, BarChart3, TrendingUp, DollarSign, Shield, Building2, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">Admin Dashboard</h1>
        <p className="mt-2 text-vor-slate">Complete system overview for all phases</p>
      </div>

      {/* Phase 1 Stats */}
      <div>
        <h2 className="text-lg font-semibold text-vor-navy mb-4 flex items-center gap-2">
          <span className="px-2 py-1 bg-vor-trust/10 text-vor-trust text-xs font-medium rounded">Phase 1</span>
          Core Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="1,247"
            icon={Users}
            trend="+23 this week"
            color="bg-vor-trust/10 text-vor-trust"
          />
          <StatCard
            title="Properties"
            value="156"
            icon={Map}
            trend="+12 this month"
            color="bg-vor-navy/10 text-vor-navy"
          />
          <StatCard
            title="Content Pages"
            value="45"
            icon={BarChart3}
            trend="+3 this week"
            color="bg-vor-gold/10 text-vor-gold"
          />
          <StatCard
            title="Active Projects"
            value="8"
            icon={Building2}
            trend="2 on schedule"
            color="bg-vor-trust/10 text-vor-trust"
          />
        </div>
      </div>

      {/* Phase 2 Stats */}
      <div>
        <h2 className="text-lg font-semibold text-vor-navy mb-4 flex items-center gap-2">
          <span className="px-2 py-1 bg-vor-gold/10 text-vor-gold text-xs font-medium rounded">Phase 2</span>
          Advanced Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Roles Defined"
            value="9"
            icon={Shield}
            trend="All configured"
            color="bg-vor-navy/10 text-vor-navy"
          />
          <StatCard
            title="Monthly Revenue"
            value="₦45.2M"
            icon={DollarSign}
            trend="+18% this month"
            color="bg-vor-trust/10 text-vor-trust"
          />
          <StatCard
            title="Pending Verifications"
            value="12"
            icon={Activity}
            trend="5 urgent"
            color="bg-vor-gold/10 text-vor-gold"
          />
          <StatCard
            title="System Health"
            value="98%"
            icon={CheckCircle}
            trend="All systems operational"
            color="bg-vor-trust/10 text-vor-trust"
          />
        </div>
      </div>

      {/* Phase 3 Stats */}
      <div>
        <h2 className="text-lg font-semibold text-vor-navy mb-4 flex items-center gap-2">
          <span className="px-2 py-1 bg-vor-navy/10 text-vor-navy text-xs font-medium rounded text-white">Phase 3</span>
          Growth Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Investment Pools"
            value="6"
            icon={TrendingUp}
            trend="2 open for investment"
            color="bg-vor-trust/10 text-vor-trust"
          />
          <StatCard
            title="Active Loans"
            value="23"
            icon={DollarSign}
            trend="₦125M outstanding"
            color="bg-vor-navy/10 text-vor-navy"
          />
          <StatCard
            title="Reports Generated"
            value="156"
            icon={BarChart3}
            trend="24 this month"
            color="bg-vor-gold/10 text-vor-gold"
          />
          <StatCard
            title="System Alerts"
            value="2"
            icon={AlertTriangle}
            trend="Requires attention"
            color="bg-red-100 text-red-700"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent System Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            type="user"
            title="New user registered"
            description="John Doe joined as Client"
            time="2 minutes ago"
            phase="Phase 1"
          />
          <ActivityItem
            type="property"
            title="Property verified"
            description="VOR-LAG-001 verification completed"
            time="15 minutes ago"
            phase="Phase 2"
          />
          <ActivityItem
            type="investment"
            title="Investment made"
            description="₦2M invested in Lekki Pool"
            time="1 hour ago"
            phase="Phase 3"
          />
          <ActivityItem
            type="system"
            title="System backup completed"
            description="Daily backup successful"
            time="2 hours ago"
            phase="System"
          />
          <ActivityItem
            type="finance"
            title="Payment received"
            description="Client payment for VOR-ABJ-002"
            time="3 hours ago"
            phase="Phase 2"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Add New User"
          description="Create user accounts with role assignments"
          icon={Users}
          href="/admin/users"
          phase="Phase 1"
        />
        <QuickActionCard
          title="Manage Roles"
          description="Configure permissions and access control"
          icon={Shield}
          href="/admin/roles"
          phase="Phase 2"
        />
        <QuickActionCard
          title="View Reports"
          description="Access comprehensive system reports"
          icon={BarChart3}
          href="/admin/reports"
          phase="Phase 3"
        />
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
  type,
  title,
  description,
  time,
  phase,
}: {
  type: 'user' | 'property' | 'investment' | 'system' | 'finance';
  title: string;
  description: string;
  time: string;
  phase: string;
}) {
  const typeIcons = {
    user: Users,
    property: Map,
    investment: TrendingUp,
    system: Shield,
    finance: DollarSign,
  };

  const Icon = typeIcons[type];

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-vor-navy">{title}</p>
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-vor-navy/10 text-vor-navy">
            {phase}
          </span>
        </div>
        <p className="text-sm text-vor-slate">{description}</p>
      </div>
      <p className="text-xs text-vor-slate">{time}</p>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  phase,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  phase: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-xl border border-vor-border p-6 shadow-card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-navy text-white">
          <Icon className="h-6 w-6" />
        </div>
        <span className="px-2 py-1 rounded text-xs font-medium bg-vor-navy/10 text-vor-navy">
          {phase}
        </span>
      </div>
      <h3 className="font-semibold text-vor-navy mb-1">{title}</h3>
      <p className="text-sm text-vor-slate">{description}</p>
    </a>
  );
}