/**
 * VOR Phase 2 - Contractor Uploads Page
 *
 * Contractor's media upload page for project documentation
 */

'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, FileText, Download, Trash2, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function ContractorUploadsPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">Media Uploads</h1>
        <p className="mt-2 text-vor-slate">Upload project photos and documents</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging ? 'border-vor-gold bg-vor-cream' : 'border-vor-border hover:border-vor-gold'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vor-cream">
            <Upload className="h-8 w-8 text-vor-navy" />
          </div>
          <div>
            <p className="text-lg font-medium text-vor-navy">Drop files here or click to upload</p>
            <p className="text-sm text-vor-slate mt-1">PNG, JPG, PDF up to 10MB</p>
          </div>
          <button className="px-6 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
            Select Files
          </button>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UploadCard
            name="Foundation Progress - Phase 1"
            project="VOR-LAG-001"
            date="June 5, 2026"
            type="image"
            status="approved"
          />
          <UploadCard
            name="Electrical Installation Photos"
            project="VOR-ABJ-002"
            date="June 4, 2026"
            type="image"
            status="approved"
          />
          <UploadCard
            name="Site Inspection Report"
            project="VOR-LAG-001"
            date="June 3, 2026"
            type="document"
            status="approved"
          />
        </div>
      </div>
    </div>
  );
}

function UploadCard({
  name,
  project,
  date,
  type,
  status,
}: {
  name: string;
  project: string;
  date: string;
  type: 'image' | 'document';
  status: 'approved' | 'pending' | 'rejected';
}) {
  return (
    <div className="border border-vor-border rounded-lg p-4 hover:bg-vor-cream transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          {type === 'image' ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          status === 'approved' ? 'bg-vor-trust/10 text-vor-trust' : 'bg-vor-gold/10 text-vor-gold'
        }`}>
          {status}
        </span>
      </div>
      <h3 className="font-medium text-vor-navy text-sm mb-1">{name}</h3>
      <p className="text-xs text-vor-slate mb-3">{project}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-vor-slate">{date}</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-red-100 text-vor-slate hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
