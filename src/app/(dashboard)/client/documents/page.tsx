/**
 * VOR Phase 2 - Client Document Vault
 * 
 * Store and manage survey plans, allocation letters, deeds, verification reports, and agreements.
 * Features: Upload, Download, Preview, Version Tracking
 */

import { FileText, Upload, Download, Eye, Search, Filter, Plus, Folder, File, Calendar, Clock, AlertCircle } from 'lucide-react';

// Mock data
const documentData = {
  documents: [
    {
      id: 'doc-001',
      type: 'SURVEY_PLAN',
      title: 'Survey Plan - Ndukego Housing Parcels',
      property: 'Ndukego Housing Parcels',
      fileName: 'survey_plan_ndukego_red_copy.pdf',
      fileSize: 2456789,
      mimeType: 'application/pdf',
      url: '/documents/survey_plan_ndukego.pdf',
      version: 1,
      isLatest: true,
      uploadedAt: '2024-01-15T10:30:00Z',
      verified: true,
      verifiedAt: '2024-01-20T14:00:00Z',
    },
    {
      id: 'doc-002',
      type: 'ALLOCATION_LETTER',
      title: 'Allocation Letter - Ndukego Housing Parcels',
      property: 'Ndukego Housing Parcels',
      fileName: 'allocation_letter_ndukego.pdf',
      fileSize: 1234567,
      mimeType: 'application/pdf',
      url: '/documents/allocation_letter_ndukego.pdf',
      version: 1,
      isLatest: true,
      uploadedAt: '2024-01-15T10:35:00Z',
      verified: true,
      verifiedAt: '2024-01-20T14:05:00Z',
    },
    {
      id: 'doc-003',
      type: 'DEED',
      title: 'Deed of Assignment - Ibeju-Lekki',
      property: 'Ibeju-Lekki Industrial Zone Parcel',
      fileName: 'deed_assignment_ibeju_lekki.pdf',
      fileSize: 3456789,
      mimeType: 'application/pdf',
      url: '/documents/deed_assignment_ibeju_lekki.pdf',
      version: 1,
      isLatest: true,
      uploadedAt: '2024-03-22T14:20:00Z',
      verified: true,
      verifiedAt: '2024-03-25T09:00:00Z',
    },
    {
      id: 'doc-004',
      type: 'VERIFICATION_REPORT',
      title: 'Verification Report - Lugbe Extension',
      property: 'Lugbe Residential Extension Plot',
      fileName: 'verification_report_lugbe.pdf',
      fileSize: 1876543,
      mimeType: 'application/pdf',
      url: '/documents/verification_report_lugbe.pdf',
      version: 2,
      isLatest: true,
      uploadedAt: '2024-06-25T09:15:00Z',
      verified: false,
      verifiedAt: null,
    },
    {
      id: 'doc-005',
      type: 'AGREEMENT',
      title: 'Sale Agreement - Lekki Terrace',
      property: '4-Bed Terrace — Lekki Phase 1',
      fileName: 'sale_agreement_lekki_terrace.pdf',
      fileSize: 2890123,
      mimeType: 'application/pdf',
      url: '/documents/sale_agreement_lekki_terrace.pdf',
      version: 1,
      isLatest: true,
      uploadedAt: '2024-06-10T16:45:00Z',
      verified: true,
      verifiedAt: '2024-06-12T11:00:00Z',
    },
    {
      id: 'doc-006',
      type: 'CERTIFICATE',
      title: 'Certificate of Occupancy - Ndukego',
      property: 'Ndukego Housing Parcels',
      fileName: 'c_of_o_ndukego.pdf',
      fileSize: 4567890,
      mimeType: 'application/pdf',
      url: '/documents/c_of_o_ndukego.pdf',
      version: 1,
      isLatest: true,
      uploadedAt: '2024-01-15T10:40:00Z',
      verified: true,
      verifiedAt: '2024-01-20T14:10:00Z',
    },
  ],
  folders: [
    {
      id: 'folder-001',
      name: 'Ndukego Housing Parcels',
      propertyId: 'vor-lag-001',
      documentCount: 3,
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 'folder-002',
      name: 'Ibeju-Lekki Industrial Zone',
      propertyId: 'vor-lag-002',
      documentCount: 1,
      createdAt: '2024-03-22T14:20:00Z',
    },
    {
      id: 'folder-003',
      name: 'Lugbe Residential Extension',
      propertyId: 'vor-abj-003',
      documentCount: 1,
      createdAt: '2024-06-25T09:15:00Z',
    },
    {
      id: 'folder-004',
      name: '4-Bed Terrace — Lekki Phase 1',
      propertyId: 'home-001',
      documentCount: 1,
      createdAt: '2024-06-10T16:45:00Z',
    },
  ],
};

const documentTypeLabels = {
  SURVEY_PLAN: 'Survey Plan',
  ALLOCATION_LETTER: 'Allocation Letter',
  DEED: 'Deed',
  VERIFICATION_REPORT: 'Verification Report',
  AGREEMENT: 'Agreement',
  CERTIFICATE: 'Certificate',
  CONTRACT: 'Contract',
  OTHER: 'Other',
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

export default function ClientDocumentVault() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Document Vault
          </h1>
          <p className="mt-2 text-vor-slate">
            Store and manage all your property documents securely
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Documents"
          value={documentData.documents.length}
          icon={FileText}
          color="bg-vor-trust"
        />
        <StatCard
          title="Verified Documents"
          value={documentData.documents.filter(d => d.verified).length}
          icon={File}
          color="bg-vor-navy"
        />
        <StatCard
          title="Pending Verification"
          value={documentData.documents.filter(d => !d.verified).length}
          icon={AlertCircle}
          color="bg-vor-gold"
        />
        <StatCard
          title="Total Storage"
          value="16.5 MB"
          icon={Folder}
          color="bg-vor-slate"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
          <input
            type="text"
            placeholder="Search documents by name, type, or property..."
            className="w-full rounded-lg border border-vor-border py-2.5 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Folders */}
      <section>
        <SectionHeader
          title="Property Folders"
          subtitle="Documents organized by property"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {documentData.folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      </section>

      {/* Documents List */}
      <section>
        <SectionHeader
          title="All Documents"
          subtitle={`Total: ${documentData.documents.length} documents`}
        />
        <div className="rounded-xl border border-vor-border bg-white overflow-hidden shadow-card">
          <table className="w-full">
            <thead className="bg-vor-cream">
              <tr>
                <TableHeader>Document</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Property</TableHeader>
                <TableHeader>Size</TableHeader>
                <TableHeader>Version</TableHeader>
                <TableHeader>Uploaded</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-vor-border">
              {documentData.documents.map((document) => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </tbody>
          </table>
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

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-vor-slate">
      {children}
    </th>
  );
}

function FolderCard({ folder }: { folder: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card hover:border-vor-gold transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-cream">
          <Folder className="h-6 w-6 text-vor-navy" />
        </div>
        <span className="rounded-full bg-vor-slate/10 px-3 py-1 text-xs font-medium text-vor-slate">
          {folder.documentCount} docs
        </span>
      </div>
      <h3 className="font-semibold text-vor-navy mb-1">{folder.name}</h3>
      <p className="text-xs text-vor-slate">Created {formatDate(folder.createdAt)}</p>
    </div>
  );
}

function DocumentRow({ document }: { document: any }) {
  const typeIcons = {
    SURVEY_PLAN: FileText,
    ALLOCATION_LETTER: FileText,
    DEED: FileText,
    VERIFICATION_REPORT: FileText,
    AGREEMENT: FileText,
    CERTIFICATE: FileText,
    CONTRACT: FileText,
    OTHER: File,
  };

  const Icon = typeIcons[document.type as keyof typeof typeIcons] || File;

  return (
    <tr className="hover:bg-vor-cream">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-cream">
            <Icon className="h-5 w-5 text-vor-navy" />
          </div>
          <div>
            <p className="font-medium text-vor-navy">{document.title}</p>
            <p className="text-xs text-vor-slate">{document.fileName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        {documentTypeLabels[document.type as keyof typeof documentTypeLabels] || document.type}
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">{document.property}</td>
      <td className="px-6 py-4 text-sm text-vor-slate">{formatFileSize(document.fileSize)}</td>
      <td className="px-6 py-4">
        <span className="rounded-full bg-vor-cream px-3 py-1 text-xs font-medium text-vor-navy">
          v{document.version}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-vor-slate">
        <div className="flex flex-col">
          <span>{formatDate(document.uploadedAt)}</span>
          <span className="text-xs text-vor-slate">{formatDateTime(document.uploadedAt).split(',')[1]}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        {document.verified ? (
          <span className="flex items-center gap-1 rounded-full bg-vor-trust/10 px-3 py-1 text-xs font-medium text-vor-trust">
            <Clock className="h-3 w-3" />
            Verified
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-vor-gold/10 px-3 py-1 text-xs font-medium text-vor-gold">
            <AlertCircle className="h-3 w-3" />
            Pending
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-vor-cream p-2 text-vor-navy hover:bg-vor-border" title="Preview">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-lg bg-vor-cream p-2 text-vor-navy hover:bg-vor-border" title="Download">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
