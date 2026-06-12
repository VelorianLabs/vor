/**
 * VOR Admin - Content Management (Phase 1)
 *
 * Content management page for admin to manage all site content
 */

'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Search, MoreVertical, Edit, Trash2, Calendar, Eye } from 'lucide-react';

export default function AdminContentPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Mock data for content management
      const mockContent = [
        { id: '1', title: 'Home Page', type: 'page', status: 'published', updated_at: new Date().toISOString() },
        { id: '2', title: 'About Us', type: 'page', status: 'published', updated_at: new Date().toISOString() },
        { id: '3', title: 'Market Updates', type: 'blog', status: 'draft', updated_at: new Date().toISOString() },
      ];
      setContent(mockContent);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const publishedCount = content.filter(c => c.status === 'published').length;
  const draftCount = content.filter(c => c.status === 'draft').length;
  const updatedThisWeek = content.filter(c => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(c.updated_at) > weekAgo;
  }).length;

  const getFilteredContent = () => {
    return content.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

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
        <StatCard title="Total Pages" value={content.length.toString()} icon={FileText} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Published" value={publishedCount.toString()} icon={Eye} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Drafts" value={draftCount.toString()} icon={Edit} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Updated This Week" value={updatedThisWeek.toString()} icon={Calendar} color="bg-vor-navy/10 text-vor-navy" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        </div>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
        >
          <option value="all">All Types</option>
          <option value="page">Page</option>
          <option value="blog">Blog Post</option>
          <option value="news">News</option>
        </select>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
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
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-vor-slate">Loading content...</td></tr>
            ) : getFilteredContent().length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-vor-slate">No content found</td></tr>
            ) : (
              getFilteredContent().map((item) => (
                <ContentRow
                  key={item.id}
                  title={item.title}
                  type={item.type || 'Page'}
                  status={item.status || 'published'}
                  lastUpdated={item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}
                />
              ))
            )}
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
