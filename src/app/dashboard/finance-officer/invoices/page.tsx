/**
 * VOR Phase 2 - Finance Officer Invoices Page
 *
 * Finance officer's invoice management page
 */

import { FileText, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Download, Send } from 'lucide-react';

export default function FinanceOfficerInvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Invoices</h1>
          <p className="mt-2 text-vor-slate">Manage billing and invoices</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <FileText className="h-4 w-4" />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Invoices" value="45" icon={FileText} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Outstanding" value="₦4.2M" icon={DollarSign} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Overdue" value="₦850,000" icon={AlertCircle} color="bg-red-100 text-red-700" />
        <StatCard title="Paid This Month" value="₦12.5M" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">All Invoices</h2>
        <div className="space-y-4">
          <InvoiceRow
            id="INV-001"
            client="John Doe"
            description="Monthly installment - VOR-LAG-001"
            amount="₦1,225,000"
            dueDate="June 15, 2026"
            status="pending"
            type="installment"
          />
          <InvoiceRow
            id="INV-002"
            client="Jane Smith"
            description="Quarterly payment - VOR-ABJ-002"
            amount="₦2,500,000"
            dueDate="June 20, 2026"
            status="pending"
            type="quarterly"
          />
          <InvoiceRow
            id="INV-003"
            client="BuildRight Construction"
            description="Phase 1 completion payment"
            amount="₦5,000,000"
            dueDate="June 10, 2026"
            status="overdue"
            type="contractor"
          />
          <InvoiceRow
            id="INV-004"
            client="Michael Johnson"
            description="Monthly installment - VOR-LAG-001"
            amount="₦1,225,000"
            dueDate="May 15, 2026"
            status="paid"
            type="installment"
          />
          <InvoiceRow
            id="INV-005"
            client="Sarah Williams"
            description="Initial deposit - VOR-LAG-003"
            amount="₦8,000,000"
            dueDate="May 1, 2026"
            status="paid"
            type="deposit"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
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

function InvoiceRow({
  id,
  client,
  description,
  amount,
  dueDate,
  status,
  type,
}: {
  id: string;
  client: string;
  description: string;
  amount: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  type: 'installment' | 'quarterly' | 'contractor' | 'deposit';
}) {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold', icon: Clock },
    paid: { label: 'Paid', color: 'bg-vor-trust/10 text-vor-trust', icon: CheckCircle },
    overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-700', icon: AlertCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-vor-navy/10 text-vor-navy">
              {type}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{description}</p>
          <p className="text-sm text-vor-slate">{client}</p>
          <div className="flex items-center gap-1 text-xs text-vor-slate mt-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {dueDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-vor-navy">{amount}</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded hover:bg-vor-cream text-vor-slate hover:text-vor-navy">
            <Download className="h-4 w-4" />
          </button>
          {status === 'pending' && (
            <button className="p-2 rounded hover:bg-vor-cream text-vor-slate hover:text-vor-navy">
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
