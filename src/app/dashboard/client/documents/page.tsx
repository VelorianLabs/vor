/**
 * VOR Phase 2 - Client Documents Page
 *
 * Client's document vault showing all property-related documents
 */

import { FileText, Download, Eye, Calendar, FileCheck } from 'lucide-react';

export default function ClientDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Document Vault</h1>
        <p className="mt-2 text-vor-slate">Access your property documents</p>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocumentCategory
          title="Title Documents"
          count={3}
          icon={FileText}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <DocumentCategory
          title="Payment Receipts"
          count={8}
          icon={FileCheck}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <DocumentCategory
          title="Agreements"
          count={2}
          icon={FileText}
          color="bg-vor-navy/10 text-vor-navy"
        />
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">All Documents</h2>
        <div className="space-y-4">
          <DocumentRow
            name="Certificate of Occupancy - VOR-LAG-001"
            type="PDF"
            size="2.4 MB"
            date="January 20, 2024"
            status="verified"
          />
          <DocumentRow
            name="Purchase Agreement - VOR-LAG-001"
            type="PDF"
            size="1.8 MB"
            date="January 15, 2024"
            status="verified"
          />
          <DocumentRow
            name="Survey Plan - VOR-ABJ-002"
            type="PDF"
            size="3.2 MB"
            date="March 25, 2024"
            status="verified"
          />
          <DocumentRow
            name="Receipt - Initial Payment VOR-LAG-001"
            type="PDF"
            size="0.5 MB"
            date="January 15, 2024"
            status="verified"
          />
          <DocumentRow
            name="Receipt - Monthly Installment May 2026"
            type="PDF"
            size="0.4 MB"
            date="May 15, 2026"
            status="verified"
          />
        </div>
      </div>
    </div>
  );
}

function DocumentCategory({
  title,
  count,
  icon: Icon,
  color,
}: {
  title: string;
  count: number;
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
          <p className="mt-1 text-2xl font-bold text-vor-navy">{count}</p>
        </div>
      </div>
    </div>
  );
}

function DocumentRow({
  name,
  type,
  size,
  date,
  status,
}: {
  name: string;
  type: string;
  size: string;
  date: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-vor-navy">{name}</p>
          <div className="flex items-center gap-2 text-sm text-vor-slate mt-1">
            <span>{type}</span>
            <span>•</span>
            <span>{size}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-vor-trust/10 text-vor-trust">
          {status}
        </span>
        <button className="p-2 rounded-lg hover:bg-vor-cream text-vor-slate hover:text-vor-navy">
          <Eye className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-vor-cream text-vor-slate hover:text-vor-navy">
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
