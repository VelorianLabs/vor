/**
 * VOR Phase 2 - Contractor Dashboard Overview
 *
 * Main dashboard page for contractors showing projects, deliverables, and activity
 */

import { HardHat, FolderOpen, Upload, FileCheck, TrendingUp, Clock } from 'lucide-react';

export default function ContractorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">Welcome back</h1>
        <p className="mt-2 text-vor-slate">Here&apos;s an overview of your construction projects</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value="3"
          icon={HardHat}
          trend="2 on schedule"
          color="bg-vor-trust/10 text-vor-trust"
        />
        <StatCard
          title="Pending Deliverables"
          value="5"
          icon={FolderOpen}
          trend="3 due this week"
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="Uploads"
          value="12"
          icon={Upload}
          trend="All approved"
          color="bg-vor-navy/10 text-vor-navy"
        />
        <StatCard
          title="Approval Requests"
          value="2"
          icon={FileCheck}
          trend="Awaiting review"
          color="bg-vor-gold/10 text-vor-gold"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="Deliverable Approved"
              description="Foundation work for VOR-LAG-001"
              date="2 hours ago"
              icon={FileCheck}
            />
            <ActivityItem
              title="Upload Completed"
              description="Progress photos for Phase 2"
              date="1 day ago"
              icon={Upload}
            />
            <ActivityItem
              title="Project Update"
              description="Milestone 3 completed ahead of schedule"
              date="3 days ago"
              icon={HardHat}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-vor-navy mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            <DeadlineItem
              title="Foundation Completion"
              date="June 15, 2026"
              project="VOR-LAG-001"
              icon={Clock}
            />
            <DeadlineItem
              title="Deliverable Submission"
              date="June 20, 2026"
              project="VOR-ABJ-002"
              icon={FolderOpen}
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
  icon: Icon,
}: {
  title: string;
  description: string;
  date: string;
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
        <p className="text-xs text-vor-slate mt-1">{date}</p>
      </div>
    </div>
  );
}

function DeadlineItem({
  title,
  date,
  project,
  icon: Icon,
}: {
  title: string;
  date: string;
  project: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-vor-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{project}</p>
        <p className="text-sm font-semibold text-vor-navy mt-1">{date}</p>
      </div>
    </div>
  );
}
