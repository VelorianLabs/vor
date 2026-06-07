/**
 * VOR Phase 2 - Client Support Page
 *
 * Client's support center for tickets and help
 */

import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ClientSupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Support Center</h1>
          <p className="mt-2 text-vor-slate">Get help with your property investments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Open Tickets"
          value="1"
          icon={MessageSquare}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="In Progress"
          value="2"
          icon={Clock}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <StatCard
          title="Resolved"
          value="5"
          icon={CheckCircle}
          color="bg-vor-trust/10 text-vor-trust"
        />
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Your Tickets</h2>
        <div className="space-y-4">
          <TicketRow
            id="TKT-001"
            subject="Payment confirmation not received"
            property="VOR-LAG-001"
            date="June 1, 2026"
            status="open"
            priority="high"
          />
          <TicketRow
            id="TKT-002"
            subject="Question about development timeline"
            property="VOR-ABJ-002"
            date="May 28, 2026"
            status="in_progress"
            priority="medium"
          />
          <TicketRow
            id="TKT-003"
            subject="Document download issue"
            property="VOR-LAG-001"
            date="May 20, 2026"
            status="resolved"
            priority="low"
          />
        </div>
      </div>
    </div>
  );
}

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
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-vor-navy">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TicketRow({
  id,
  subject,
  property,
  date,
  status,
  priority,
}: {
  id: string;
  subject: string;
  property: string;
  date: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
}) {
  const statusConfig = {
    open: { label: 'Open', color: 'bg-vor-gold/10 text-vor-gold' },
    in_progress: { label: 'In Progress', color: 'bg-vor-navy/10 text-vor-navy' },
    resolved: { label: 'Resolved', color: 'bg-vor-trust/10 text-vor-trust' },
  };

  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-700' },
    medium: { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
    low: { label: 'Low', color: 'bg-slate-100 text-slate-700' },
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig[priority].color}`}>
              {priorityConfig[priority].label}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{subject}</p>
          <p className="text-sm text-vor-slate">{property} • {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
          {statusConfig[status].label}
        </span>
      </div>
    </div>
  );
}
