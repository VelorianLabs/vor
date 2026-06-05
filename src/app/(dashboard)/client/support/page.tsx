/**
 * VOR Phase 2 - Client Support Center
 * 
 * Ticketing system with categories: Legal, Verification, Construction, Payment, Technical Support.
 * Features: Ticket Status, Internal Notes, Attachments, User Responses.
 */

import { MessageSquare, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, Paperclip, Send } from 'lucide-react';
import React from 'react';

// Mock data
const supportData = {
  tickets: [
    {
      id: 'ticket-001',
      ticketNumber: 'VOR-TKT-2024-07-001',
      category: 'VERIFICATION',
      subject: 'Survey Plan Verification Delay',
      description: 'I submitted my survey plan for verification on June 25th but haven\'t received an update yet. The status still shows pending.',
      priority: 'high',
      status: 'IN_PROGRESS',
      createdAt: '2024-07-05T10:30:00Z',
      updatedAt: '2024-07-10T14:20:00Z',
      assignedTo: 'Officer Sarah Johnson',
      messages: [
        {
          id: 'msg-001',
          userId: 'user-001',
          userName: 'John Doe',
          isInternal: false,
          message: 'I submitted my survey plan for verification on June 25th but haven\'t received an update yet.',
          createdAt: '2024-07-05T10:30:00Z',
          attachments: [],
        },
        {
          id: 'msg-002',
          userId: 'officer-001',
          userName: 'Officer Sarah Johnson',
          isInternal: true,
          message: 'Thank you for your patience. We are currently reviewing your survey plan. The verification process typically takes 5-7 business days. You should receive an update by July 2nd.',
          createdAt: '2024-07-06T09:15:00Z',
          attachments: [],
        },
        {
          id: 'msg-003',
          userId: 'user-001',
          userName: 'John Doe',
          isInternal: false,
          message: 'Thank you for the update. I\'ll wait until July 2nd.',
          createdAt: '2024-07-06T10:45:00Z',
          attachments: [],
        },
      ],
    },
    {
      id: 'ticket-002',
      ticketNumber: 'VOR-TKT-2024-06-002',
      category: 'PAYMENT',
      subject: 'Payment Confirmation Not Received',
      description: 'I made a payment of ₦2,500,000 on June 15th but haven\'t received the confirmation receipt yet.',
      priority: 'medium',
      status: 'RESOLVED',
      createdAt: '2024-06-16T14:20:00Z',
      updatedAt: '2024-06-17T09:00:00Z',
      assignedTo: 'Finance Officer Michael Brown',
      messages: [
        {
          id: 'msg-004',
          userId: 'user-001',
          userName: 'John Doe',
          isInternal: false,
          message: 'I made a payment of ₦2,500,000 on June 15th but haven\'t received the confirmation receipt yet.',
          createdAt: '2024-06-16T14:20:00Z',
          attachments: [],
        },
        {
          id: 'msg-005',
          userId: 'finance-001',
          userName: 'Finance Officer Michael Brown',
          isInternal: true,
          message: 'Your payment has been confirmed. I have generated and sent the receipt to your email. Please check your inbox.',
          createdAt: '2024-06-17T09:00:00Z',
          attachments: [],
        },
      ],
    },
    {
      id: 'ticket-003',
      ticketNumber: 'VOR-TKT-2024-05-003',
      category: 'CONSTRUCTION',
      subject: 'Construction Progress Inquiry',
      description: 'I would like to know the current progress of my home construction at VOR Green Courts.',
      priority: 'low',
      status: 'CLOSED',
      createdAt: '2024-05-20T11:00:00Z',
      updatedAt: '2024-05-21T15:30:00Z',
      assignedTo: 'Project Manager David Wilson',
      messages: [
        {
          id: 'msg-006',
          userId: 'user-001',
          userName: 'John Doe',
          isInternal: false,
          message: 'I would like to know the current progress of my home construction at VOR Green Courts.',
          createdAt: '2024-05-20T11:00:00Z',
          attachments: [],
        },
        {
          id: 'msg-007',
          userId: 'pm-001',
          userName: 'Project Manager David Wilson',
          isInternal: true,
          message: 'Your home construction is currently at 68% completion. We are on track to meet the Q3 2026 completion date. I\'ve attached the latest progress report.',
          createdAt: '2024-05-21T15:30:00Z',
          attachments: [
            { name: 'progress_report_may_2024.pdf', url: '/documents/progress_report.pdf' },
          ],
        },
      ],
    },
  ],
};

const categoryLabels = {
  LEGAL: 'Legal',
  VERIFICATION: 'Verification',
  CONSTRUCTION: 'Construction',
  PAYMENT: 'Payment',
  TECHNICAL: 'Technical Support',
  GENERAL: 'General',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

const statusLabels = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING_CUSTOMER: 'Waiting for Customer',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const statusColors = {
  OPEN: 'bg-vor-gold/10 text-vor-gold',
  IN_PROGRESS: 'bg-blue-100 text-blue-600',
  WAITING_CUSTOMER: 'bg-orange-100 text-orange-600',
  RESOLVED: 'bg-vor-trust/10 text-vor-trust',
  CLOSED: 'bg-vor-slate/10 text-vor-slate',
};

const priorityColors = {
  low: 'bg-vor-slate/10 text-vor-slate',
  medium: 'bg-vor-gold/10 text-vor-gold',
  high: 'bg-orange-100 text-orange-600',
  urgent: 'bg-red-100 text-red-600',
};

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

export default function ClientSupportCenter() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Support Center
          </h1>
          <p className="mt-2 text-vor-slate">
            Get help with your account, properties, payments, and more
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Open Tickets"
          value={supportData.tickets.filter(t => t.status === 'OPEN').length}
          icon={MessageSquare}
          color="bg-vor-gold"
        />
        <StatCard
          title="In Progress"
          value={supportData.tickets.filter(t => t.status === 'IN_PROGRESS').length}
          icon={Clock}
          color="bg-blue-500"
        />
        <StatCard
          title="Resolved"
          value={supportData.tickets.filter(t => t.status === 'RESOLVED').length}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Total Tickets"
          value={supportData.tickets.length}
          icon={MessageSquare}
          color="bg-vor-navy"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
          <input
            type="text"
            placeholder="Search tickets by subject, ticket number, or category..."
            className="w-full rounded-lg border border-vor-border py-2.5 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Tickets List */}
      <section>
        <SectionHeader
          title="Your Tickets"
          subtitle={`Total: ${supportData.tickets.length} tickets`}
        />
        <div className="space-y-4">
          {supportData.tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
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
  value: string | number;
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

function TicketCard({ ticket }: { ticket: any }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="rounded-xl border border-vor-border bg-white shadow-card">
      {/* Ticket Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm font-medium text-vor-slate">
              {ticket.ticketNumber}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[ticket.status as keyof typeof statusColors]
              }`}
            >
              {statusLabels[ticket.status as keyof typeof statusLabels]}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                priorityColors[ticket.priority as keyof typeof priorityColors]
              }`}
            >
              {priorityLabels[ticket.priority as keyof typeof priorityLabels]}
            </span>
          </div>
          <h3 className="font-semibold text-vor-navy mb-1">{ticket.subject}</h3>
          <div className="flex items-center gap-4 text-sm text-vor-slate">
            <span>{categoryLabels[ticket.category as keyof typeof categoryLabels]}</span>
            <span>•</span>
            <span>Assigned to: {ticket.assignedTo}</span>
            <span>•</span>
            <span>Updated {formatDate(ticket.updatedAt)}</span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border"
        >
          {isExpanded ? 'Collapse' : 'View Details'}
        </button>
      </div>

      {/* Ticket Details (Expanded) */}
      {isExpanded && (
        <div className="border-t border-vor-border p-6">
          <div className="mb-6">
            <h4 className="font-medium text-vor-navy mb-2">Description</h4>
            <p className="text-sm text-vor-slate">{ticket.description}</p>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            <h4 className="font-medium text-vor-navy">Conversation</h4>
            {ticket.messages.map((message: any) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Reply Form */}
          <div className="mt-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-vor-border px-4 py-2.5 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
              />
              <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-4 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
                <Paperclip className="h-4 w-4" />
                Attach
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-vor-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-vor-navy-light">
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: any }) {
  return (
    <div
      className={`flex gap-3 ${
        message.isInternal ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div
        className={`flex max-w-[70%] flex-col ${
          message.isInternal ? 'items-start' : 'items-end'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-vor-navy">{message.userName}</span>
          {message.isInternal && (
            <span className="rounded-full bg-vor-gold/10 px-2 py-0.5 text-xs text-vor-gold">
              Support Team
            </span>
          )}
        </div>
        <div
          className={`rounded-lg p-4 ${
            message.isInternal
              ? 'bg-vor-cream text-vor-navy'
              : 'bg-vor-navy text-white'
          }`}
        >
          <p className="text-sm">{message.message}</p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs underline"
                >
                  <Paperclip className="h-3 w-3" />
                  {attachment.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="mt-1 text-xs text-vor-slate">
          {formatDateTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
