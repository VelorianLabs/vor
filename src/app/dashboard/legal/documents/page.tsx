/**
 * VOR Phase 2 - Legal Documents
 * 
 * Manage legal documents including contracts, agreements,
 * compliance certificates, and regulatory filings.
 */

import { FileText, Upload, Download, Search, Filter, Plus, Scale, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock data
const documentsData = {
  documents: [
    {
      id: 'doc-001',
      title: 'Standard Purchase Agreement Template',
      type: 'TEMPLATE',
      category: 'CONTRACT',
      version: '2.1',
      status: 'active',
      uploadedAt: '2024-01-15T10:00:00Z',
      uploadedBy: 'Legal Team',
      fileSize: 567890,
      url: '/documents/purchase_agreement_template.pdf',
      description: 'Standard template for property purchase agreements used across all VOR transactions.',
    },
    {
      id: 'doc-002',
      title: 'Investment Agreement - Lekki Corridor Fund III',
      type: 'AGREEMENT',
      category: 'INVESTMENT',
      version: '1.0',
      status: 'active',
      uploadedAt: '2024-06-01T14:30:00Z',
      uploadedBy: 'Sarah Johnson',
      fileSize: 1234567,
      url: '/documents/investment_agreement_lekki_fund.pdf',
      description: 'Investment agreement for Lekki Corridor Land Fund III project.',
    },
    {
      id: 'doc-003',
      title: 'Compliance Certificate - Q2 2024',
      type: 'CERTIFICATE',
      category: 'COMPLIANCE',
      version: '1.0',
      status: 'active',
      uploadedAt: '2024-07-01T09:00:00Z',
      uploadedBy: 'Legal Team',
      fileSize: 345678,
      url: '/documents/compliance_certificate_q2_2024.pdf',
      description: 'Quarterly compliance certificate for Q2 2024 operations.',
    },
    {
      id: 'doc-004',
      title: 'Regulatory Filing - Lagos State',
      type: 'FILING',
      category: 'REGULATORY',
      version: '1.0',
      status: 'active',
      uploadedAt: '2024-06-15T11:00:00Z',
      uploadedBy: 'Sarah Johnson',
      fileSize: 789012,
      url: '/documents/regulatory_filing_lagos.pdf',
      description: 'Annual regulatory filing with Lagos State Land Registry.',
    },
    {
      id: 'doc-005',
      title: 'Construction Contract - VOR Green Courts',
      type: 'CONTRACT',
      category: 'CONSTRUCTION',
      version: '1.2',
      status: 'active',
      uploadedAt: '2024-03-22T16:45:00Z',
      uploadedBy: 'Legal Team',
      fileSize: 2345678,
      url: '/documents/construction_contract_green_courts.pdf',
      description: 'Construction contract for VOR Green Courts development project.',
    },
    {
      id: 'doc-006',
      title: 'Service Level Agreement - Paystack',
      type: 'AGREEMENT',
      category: 'VENDOR',
      version: '1.0',
      status: 'active',
      uploadedAt: '2024-02-10T10:00:00Z',
      uploadedBy: 'Finance Team',
      fileSize: 890123,
      url: '/documents/sla_paystack.pdf',
      description: 'Service level agreement with Paystack for payment processing.',
    },
    {
      id: 'doc-007',
      title: 'Privacy Policy',
      type: 'POLICY',
      category: 'LEGAL',
      version: '3.0',
      status: 'active',
      uploadedAt: '2024-01-01T08:00:00Z',
      uploadedBy: 'Legal Team',
      fileSize: 456789,
      url: '/documents/privacy_policy.pdf',
      description: 'Company privacy policy governing data collection and usage.',
    },
    {
      id: 'doc-008',
      title: 'Terms of Service',
      type: 'POLICY',
      category: 'LEGAL',
      version: '3.0',
      status: 'active',
      uploadedAt: '2024-01-01T08:00:00Z',
      uploadedBy: 'Legal Team',
      fileSize: 567890,
      url: '/documents/terms_of_service.pdf',
      description: 'Terms of service governing use of VOR platform.',
    },
  ],
};

const typeLabels = {
  TEMPLATE: 'Template',
  AGREEMENT: 'Agreement',
  CERTIFICATE: 'Certificate',
  FILING: 'Filing',
  CONTRACT: 'Contract',
  POLICY: 'Policy',
};

const categoryLabels = {
  CONTRACT: 'Contract',
  INVESTMENT: 'Investment',
  COMPLIANCE: 'Compliance',
  REGULATORY: 'Regulatory',
  CONSTRUCTION: 'Construction',
  VENDOR: 'Vendor',
  LEGAL: 'Legal',
};

const statusLabels = {
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
  expired: 'Expired',
};

const statusColors = {
  active: 'bg-vor-trust/10 text-vor-trust',
  draft: 'bg-vor-gold/10 text-vor-gold',
  archived: 'bg-vor-slate/10 text-vor-slate',
  expired: 'bg-red-100 text-red-600',
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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

export default function LegalDocuments() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Legal Documents
          </h1>
          <p className="mt-2 text-vor-slate">
            Manage contracts, agreements, and compliance documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <Plus className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search documents by title, type, or category..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Documents"
          value={documentsData.documents.length.toString()}
          icon={FileText}
          color="bg-vor-navy"
        />
        <StatCard
          title="Active Documents"
          value={documentsData.documents.filter(d => d.status === 'active').length.toString()}
          icon={CheckCircle}
          color="bg-vor-trust"
        />
        <StatCard
          title="Templates"
          value={documentsData.documents.filter(d => d.type === 'TEMPLATE').length.toString()}
          icon={FileText}
          color="bg-vor-gold"
        />
        <StatCard
          title="Total Storage"
          value="9.2 MB"
          icon={Scale}
          color="bg-vor-slate"
        />
      </div>

      {/* Documents Grid */}
      <section>
        <SectionHeader
          title="All Documents"
          subtitle={`Total: ${documentsData.documents.length} documents`}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {documentsData.documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
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
  value: string;
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

function DocumentCard({ document }: { document: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-cream">
          <FileText className="h-6 w-6 text-vor-navy" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="rounded-full bg-vor-navy/10 px-3 py-1 text-xs font-medium text-vor-navy"
                >
                  {typeLabels[document.type as keyof typeof typeLabels] || document.type}
                </span>
                <span
                  className="rounded-full bg-vor-cream px-3 py-1 text-xs font-medium text-vor-navy"
                >
                  {categoryLabels[document.category as keyof typeof categoryLabels] || document.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColors[document.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[document.status as keyof typeof statusLabels]}
                </span>
              </div>
              <h3 className="font-semibold text-vor-navy">{document.title}</h3>
            </div>
            <span className="text-xs text-vor-slate">v{document.version}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-vor-slate mb-3 line-clamp-2">{document.description}</p>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-3 text-xs text-vor-slate">
            <span>Size: {formatFileSize(document.fileSize)}</span>
            <span>•</span>
            <span>Uploaded by: {document.uploadedBy}</span>
            <span>•</span>
            <span>{formatDate(document.uploadedAt)}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-vor-border">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
                <Download className="h-3 w-3" />
                Download
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
                <Calendar className="h-3 w-3" />
                View History
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-vor-cream p-1.5 text-vor-navy hover:bg-vor-border" title="Edit">
                <FileText className="h-4 w-4" />
              </button>
              <button className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100" title="Archive">
                <Scale className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
