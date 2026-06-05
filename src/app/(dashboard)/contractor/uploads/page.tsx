/**
 * VOR Phase 2 - Contractor Uploads
 * 
 * Upload project media including images, videos, reports,
 * and inspection records organized chronologically.
 */

import { Upload, Image as ImageIcon, Video, FileText, Calendar, Download, Trash2, Search, Filter, Plus } from 'lucide-react';

// Mock data
const uploadsData = {
  uploads: [
    {
      id: 'upl-001',
      project: 'VOR Green Courts — Epe',
      type: 'image',
      title: 'Foundation Progress - June 2024',
      description: 'Progress photos showing foundation work completion',
      url: '/uploads/foundation_june_2024.zip',
      thumbnailUrl: '/uploads/thumbnails/foundation_thumb.jpg',
      fileSize: 15678901,
      uploadedAt: '2024-06-30T14:30:00Z',
      uploadedBy: 'John Smith',
      category: 'progress',
    },
    {
      id: 'upl-002',
      project: 'VOR Green Courts — Epe',
      type: 'video',
      title: 'Site Walkthrough - June 2024',
      description: 'Video walkthrough of the construction site',
      url: '/uploads/site_walkthrough_june_2024.mp4',
      thumbnailUrl: '/uploads/thumbnails/walkthrough_thumb.jpg',
      fileSize: 256789012,
      uploadedAt: '2024-06-28T10:15:00Z',
      uploadedBy: 'Jane Doe',
      category: 'progress',
    },
    {
      id: 'upl-003',
      project: 'Abuja Gateway Terraces',
      type: 'report',
      title: 'Site Preparation Report',
      description: 'Detailed report on site preparation work',
      url: '/uploads/site_preparation_report.pdf',
      thumbnailUrl: null,
      fileSize: 2345678,
      uploadedAt: '2024-06-25T16:45:00Z',
      uploadedBy: 'David Wilson',
      category: 'report',
    },
    {
      id: 'upl-004',
      project: 'Ogun Smart Homes Phase 1',
      type: 'image',
      title: 'Infrastructure Completion',
      description: 'Photos showing completed infrastructure work',
      url: '/uploads/infrastructure_completion.zip',
      thumbnailUrl: '/uploads/thumbnails/infra_thumb.jpg',
      fileSize: 12345678,
      uploadedAt: '2024-06-20T09:00:00Z',
      uploadedBy: 'Robert Taylor',
      category: 'milestone',
    },
    {
      id: 'upl-005',
      project: 'VOR Green Courts — Epe',
      type: 'image',
      title: 'Structural Frame Progress',
      description: 'Progress photos of structural frame installation',
      url: '/uploads/structural_frame_progress.zip',
      thumbnailUrl: '/uploads/thumbnails/structural_thumb.jpg',
      fileSize: 18765432,
      uploadedAt: '2024-06-15T11:30:00Z',
      uploadedBy: 'John Smith',
      category: 'progress',
    },
    {
      id: 'upl-006',
      project: 'Abuja Gateway Terraces',
      type: 'inspection',
      title: 'Foundation Inspection Record',
      description: 'Inspection record for foundation work',
      url: '/uploads/foundation_inspection.pdf',
      thumbnailUrl: null,
      fileSize: 1234567,
      uploadedAt: '2024-06-10T14:20:00Z',
      uploadedBy: 'Sarah Brown',
      category: 'inspection',
    },
    {
      id: 'upl-007',
      project: 'Ogun Smart Homes Phase 1',
      type: 'video',
      title: 'MEP Installation Progress',
      description: 'Video showing MEP installation work',
      url: '/uploads/mep_installation_progress.mp4',
      thumbnailUrl: '/uploads/thumbnails/mep_thumb.jpg',
      fileSize: 189456789,
      uploadedAt: '2024-06-05T08:45:00Z',
      uploadedBy: 'Chris Martin',
      category: 'progress',
    },
    {
      id: 'upl-008',
      project: 'VOR Green Courts — Epe',
      type: 'report',
      title: 'Monthly Progress Report - May 2024',
      description: 'Monthly progress report for May 2024',
      url: '/uploads/may_progress_report.pdf',
      thumbnailUrl: null,
      fileSize: 3456789,
      uploadedAt: '2024-05-30T15:00:00Z',
      uploadedBy: 'John Smith',
      category: 'report',
    },
  ],
};

const typeLabels = {
  image: 'Image',
  video: 'Video',
  report: 'Report',
  inspection: 'Inspection Record',
};

const typeIcons = {
  image: ImageIcon,
  video: Video,
  report: FileText,
  inspection: FileText,
};

const typeColors = {
  image: 'bg-vor-trust/10 text-vor-trust',
  video: 'bg-vor-gold/10 text-vor-gold',
  report: 'bg-vor-navy/10 text-vor-navy',
  inspection: 'bg-orange-500/10 text-orange-500',
};

const categoryLabels = {
  progress: 'Progress',
  report: 'Report',
  milestone: 'Milestone',
  inspection: 'Inspection',
};

const categoryColors = {
  progress: 'bg-vor-trust/10 text-vor-trust',
  report: 'bg-vor-navy/10 text-vor-navy',
  milestone: 'bg-vor-gold/10 text-vor-gold',
  inspection: 'bg-orange-500/10 text-orange-500',
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

export default function ContractorUploads() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Uploads
          </h1>
          <p className="mt-2 text-vor-slate">
            Manage project media, reports, and documentation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
            <Plus className="h-4 w-4" />
            Upload Files
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-vor-slate" />
        <input
          type="text"
          placeholder="Search uploads by title, project, or type..."
          className="w-full rounded-lg border border-vor-border py-3 pl-10 pr-4 text-sm focus:border-vor-gold focus:outline-none focus:ring-1 focus:ring-vor-gold"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Uploads"
          value={uploadsData.uploads.length.toString()}
          icon={Upload}
          color="bg-vor-navy"
        />
        <StatCard
          title="Images"
          value={uploadsData.uploads.filter(u => u.type === 'image').length.toString()}
          icon={ImageIcon}
          color="bg-vor-trust"
        />
        <StatCard
          title="Videos"
          value={uploadsData.uploads.filter(u => u.type === 'video').length.toString()}
          icon={Video}
          color="bg-vor-gold"
        />
        <StatCard
          title="Reports"
          value={uploadsData.uploads.filter(u => u.type === 'report' || u.type === 'inspection').length.toString()}
          icon={FileText}
          color="bg-vor-slate"
        />
      </div>

      {/* Uploads Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {uploadsData.uploads.map((upload) => (
          <UploadCard key={upload.id} upload={upload} />
        ))}
      </div>
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

function UploadCard({ upload }: { upload: any }) {
  const Icon = typeIcons[upload.type as keyof typeof typeIcons] || FileText;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {upload.thumbnailUrl ? (
            <div className="h-24 w-24 rounded-lg bg-vor-cream overflow-hidden">
              <img
                src={upload.thumbnailUrl}
                alt={upload.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className={`flex h-24 w-24 items-center justify-center rounded-lg ${typeColors[upload.type as keyof typeof typeColors]}`}>
              <Icon className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    typeColors[upload.type as keyof typeof typeColors]
                  }`}
                >
                  {typeLabels[upload.type as keyof typeof typeLabels]}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    categoryColors[upload.category as keyof typeof categoryColors]
                  }`}
                >
                  {categoryLabels[upload.category as keyof typeof categoryLabels]}
                </span>
              </div>
              <h3 className="font-semibold text-vor-navy truncate">{upload.title}</h3>
              <p className="text-sm text-vor-slate truncate">{upload.project}</p>
            </div>
          </div>

          <p className="text-sm text-vor-slate line-clamp-2 mb-3">{upload.description}</p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-vor-slate mb-3">
            <span>{formatFileSize(upload.fileSize)}</span>
            <span>•</span>
            <span>Uploaded by {upload.uploadedBy}</span>
            <span>•</span>
            <span>{formatDate(upload.uploadedAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
              <Download className="h-3 w-3" />
              Download
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
              <Calendar className="h-3 w-3" />
              View Details
            </button>
            <button className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
