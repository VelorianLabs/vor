/**
 * VOR Admin - Content Management (Phase 1)
 *
 * Content management page for admin to manage all site content
 */

import { FileText, Plus, Search, MoreVertical, Edit, Trash2, Calendar, Eye } from 'lucide-react';

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Content Management</h1>
          <p className="mt-2 text-vor-slate">Manage all site content and pages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Add Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Pages" value="45" icon={FileText} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Published" value="42" icon={Eye} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Drafts" value="3" icon={Edit} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Updated This Week" value="8" icon={Calendar} color="bg-vor-navy/10 text-vor-navy" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        </div>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Types</option>
          <option>Page</option>
          <option>Blog Post</option>
          <option>News</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl border border-vor-border shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-vor-cream border-b border-vor-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vor-border">
            <ContentRow
              title="About VOR"
              type="Page"
              status="published"
              lastUpdated="June 1, 2026"
            />
            <ContentRow
              title="Investment Opportunities"
              type="Page"
              status="published"
              lastUpdated="May 28, 2026"
            />
            <ContentRow
              title="Q2 2026 Market Update"
              type="Blog Post"
              status="published"
              lastUpdated="June 5, 2026"
            />
            <ContentRow
              title="New Partnership Announcement"
              type="News"
              status="draft"
              lastUpdated="June 4, 2026"
            />
            <ContentRow
              title="Fraud Prevention Guidelines"
              type="Page"
              status="published"
              lastUpdated="May 15, 2026"
            />
          </tbody>
        </table>
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

function ContentRow({
  title,
  type,
  status,
  lastUpdated,
}: {
  title: string;
  type: string;
  status: 'published' | 'draft' | 'archived';
  lastUpdated: string;
}) {
  const statusConfig = {
    published: { label: 'Published', color: 'bg-vor-trust/10 text-vor-trust' },
    draft: { label: 'Draft', color: 'bg-vor-gold/10 text-vor-gold' },
    archived: { label: 'Archived', color: 'bg-slate-100 text-slate-600' },
  };

  const config = statusConfig[status];

  return (
    <tr className="hover:bg-vor-cream transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
            <FileText className="h-5 w-5" />
          </div>
          <p className="font-medium text-vor-navy">{title}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-vor-slate">{type}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          {lastUpdated}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-red-100 text-vor-slate hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
