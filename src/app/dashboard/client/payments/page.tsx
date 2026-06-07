/**
 * VOR Phase 2 - Client Payments Page
 *
 * Client's payment center showing payment history and upcoming payments
 */

import { CreditCard, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ClientPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Payment Center</h1>
        <p className="mt-2 text-vor-slate">Manage your property payments</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Paid"
          value="₦32,000,000"
          icon={CheckCircle}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <SummaryCard
          title="Outstanding"
          value="₦8,500,000"
          icon={Clock}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <SummaryCard
          title="Next Payment"
          value="₦1,225,000"
          icon={Calendar}
          color="bg-vor-navy/10 text-vor-navy"
        />
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Upcoming Payments</h2>
        <div className="space-y-4">
          <PaymentRow
            property="VOR-LAG-001"
            description="Monthly installment - Phase 2"
            dueDate="June 15, 2026"
            amount="₦1,225,000"
            status="due"
          />
          <PaymentRow
            property="VOR-ABJ-002"
            description="Quarterly payment"
            dueDate="July 1, 2026"
            amount="₦2,500,000"
            status="upcoming"
          />
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Payment History</h2>
        <div className="space-y-4">
          <PaymentRow
            property="VOR-LAG-001"
            description="Monthly installment - Phase 1"
            dueDate="May 15, 2026"
            amount="₦1,225,000"
            status="paid"
          />
          <PaymentRow
            property="VOR-ABJ-002"
            description="Quarterly payment"
            dueDate="April 1, 2026"
            amount="₦2,500,000"
            status="paid"
          />
          <PaymentRow
            property="VOR-LAG-001"
            description="Initial deposit"
            dueDate="January 15, 2024"
            amount="₦6,000,000"
            status="paid"
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
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

function PaymentRow({
  property,
  description,
  dueDate,
  amount,
  status,
}: {
  property: string;
  description: string;
  dueDate: string;
  amount: string;
  status: 'paid' | 'due' | 'upcoming';
}) {
  const statusConfig = {
    paid: { icon: CheckCircle, color: 'text-vor-trust', bg: 'bg-vor-trust/10', label: 'Paid' },
    due: { icon: AlertCircle, color: 'text-vor-gold', bg: 'bg-vor-gold/10', label: 'Due Soon' },
    upcoming: { icon: Clock, color: 'text-vor-navy', bg: 'bg-vor-navy/10', label: 'Upcoming' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border">
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg} ${config.color}`}>
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-vor-navy">{property}</p>
          <p className="text-sm text-vor-slate">{description}</p>
          <p className="text-xs text-vor-slate mt-1">Due: {dueDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-vor-navy">{amount}</p>
          <div className={`flex items-center gap-1 text-xs ${config.color}`}>
            <StatusIcon className="h-3 w-3" />
            <span>{config.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
