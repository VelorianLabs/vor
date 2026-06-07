/**
 * VOR Phase 2 - Legal Compliance
 * 
 * Track regulatory compliance, audit trails, certifications,
 * and legal requirements.
 */

import { Scale, CheckCircle, AlertTriangle, Clock, TrendingUp, FileText, Calendar, Search, Filter } from 'lucide-react';

// Mock data
const complianceData = {
  overallScore: 94,
  categories: [
    {
      id: 'cat-001',
      name: 'Document Verification',
      score: 98,
      status: 'compliant',
      lastChecked: '2024-07-10T08:00:00Z',
      nextDue: '2024-08-10',
      requirements: [
        { name: 'Survey Plan Verification', status: 'compliant' },
        { name: 'Title Deed Verification', status: 'compliant' },
        { name: 'C of O Verification', status: 'compliant' },
      ],
    },
    {
      id: 'cat-002',
      name: 'Regulatory Filings',
      score: 92,
      status: 'compliant',
      lastChecked: '2024-07-08T14:00:00Z',
      nextDue: '2024-10-08',
      requirements: [
        { name: 'Lagos State Land Registry Filing', status: 'compliant' },
        { name: 'FCT Land Registry Filing', status: 'compliant' },
        { name: 'Ogun State Land Registry Filing', status: 'pending' },
      ],
    },
    {
      id: 'cat-003',
      name: 'Contract Compliance',
      score: 95,
      status: 'compliant',
      lastChecked: '2024-07-05T10:00:00Z',
      nextDue: '2024-08-05',
      requirements: [
        { name: 'Purchase Agreement Templates', status: 'compliant' },
        { name: 'Investment Agreement Reviews', status: 'compliant' },
        { name: 'Construction Contract Audits', status: 'compliant' },
      ],
    },
    {
      id: 'cat-004',
      name: 'Data Protection',
      score: 90,
      status: 'compliant',
      lastChecked: '2024-07-01T09:00:00Z',
      nextDue: '2024-10-01',
      requirements: [
        { name: 'Privacy Policy Review', status: 'compliant' },
        { name: 'Data Processing Agreement', status: 'compliant' },
        { name: 'GDPR Compliance Check', status: 'in_progress' },
      ],
    },
    {
      id: 'cat-005',
      name: 'Financial Compliance',
      score: 96,
      status: 'compliant',
      lastChecked: '2024-07-09T11:00:00Z',
      nextDue: '2024-08-09',
      requirements: [
        { name: 'Payment Gateway Compliance', status: 'compliant' },
        { name: 'Anti-Money Laundering Checks', status: 'compliant' },
        { name: 'Tax Compliance', status: 'compliant' },
      ],
    },
  ],
  recentAudits: [
    {
      id: 'audit-001',
      title: 'Q2 2024 Compliance Audit',
      type: 'quarterly',
      conductedBy: 'External Auditor',
      conductedAt: '2024-07-01T09:00:00Z',
      status: 'completed',
      score: 94,
      findings: [
        { severity: 'low', description: 'Minor documentation gaps in Ogun State filings' },
        { severity: 'info', description: 'All major compliance requirements met' },
      ],
      reportUrl: '/audits/q2_2024_compliance_audit.pdf',
    },
    {
      id: 'audit-002',
      title: 'Document Verification Audit',
      type: 'targeted',
      conductedBy: 'Internal Audit Team',
      conductedAt: '2024-06-15T14:30:00Z',
      status: 'completed',
      score: 98,
      findings: [
        { severity: 'info', description: 'All verification processes operating correctly' },
      ],
      reportUrl: '/audits/document_verification_audit.pdf',
    },
    {
      id: 'audit-003',
      title: 'Q1 2024 Compliance Audit',
      type: 'quarterly',
      conductedBy: 'External Auditor',
      conductedAt: '2024-04-01T10:00:00Z',
      status: 'completed',
      score: 91,
      findings: [
        { severity: 'medium', description: 'GDPR compliance documentation needs update' },
        { severity: 'low', description: 'Minor delays in some regulatory filings' },
      ],
      reportUrl: '/audits/q1_2024_compliance_audit.pdf',
    },
  ],
  upcomingDeadlines: [
    {
      id: 'deadline-001',
      category: 'Document Verification',
      requirement: 'Ogun State Land Registry Filing',
      dueDate: '2024-08-15',
      daysRemaining: 36,
      status: 'pending',
    },
    {
      id: 'deadline-002',
      category: 'Data Protection',
      requirement: 'GDPR Compliance Check',
      dueDate: '2024-09-01',
      daysRemaining: 53,
      status: 'in_progress',
    },
    {
      id: 'deadline-003',
      category: 'Regulatory Filings',
      requirement: 'Q3 2024 Filing',
      dueDate: '2024-10-01',
      daysRemaining: 83,
      status: 'pending',
    },
  ],
  certifications: [
    {
      id: 'cert-001',
      name: 'Lagos State Real Estate License',
      issuedBy: 'Lagos State Ministry of Physical Planning',
      issuedDate: '2023-06-15',
      expiryDate: '2025-06-15',
      status: 'active',
      documentUrl: '/certificates/lagos_license.pdf',
    },
    {
      id: 'cert-002',
      name: 'FCT Real Estate Registration',
      issuedBy: 'FCT Ministry of Lands',
      issuedDate: '2023-08-20',
      expiryDate: '2025-08-20',
      status: 'active',
      documentUrl: '/certificates/fct_registration.pdf',
    },
    {
      id: 'cert-003',
      name: 'ISO 27001 Certification',
      issuedBy: 'ISO',
      issuedDate: '2023-12-01',
      expiryDate: '2026-12-01',
      status: 'active',
      documentUrl: '/certificates/iso_27001.pdf',
    },
  ],
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

export default function LegalCompliance() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Compliance Center
          </h1>
          <p className="mt-2 text-vor-slate">
            Track regulatory compliance and legal requirements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="rounded-xl border border-vor-border bg-white p-8 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-vor-navy">Overall Compliance Score</h2>
            <p className="text-sm text-vor-slate">Based on all compliance categories</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-vor-trust">{complianceData.overallScore}%</p>
            <p className="text-sm text-vor-slate">Compliant</p>
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-vor-cream">
          <div
            className="h-3 rounded-full bg-vor-trust transition-all"
            style={{ width: `${complianceData.overallScore}%` }}
          />
        </div>
      </div>

      {/* Compliance Categories */}
      <section>
        <SectionHeader
          title="Compliance Categories"
          subtitle={`Total: ${complianceData.categories.length} categories`}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {complianceData.categories.map((category) => (
            <ComplianceCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Audits */}
        <section>
          <SectionHeader
            title="Recent Audits"
            subtitle={`Total: ${complianceData.recentAudits.length} audits`}
          />
          <div className="space-y-4">
            {complianceData.recentAudits.map((audit) => (
              <AuditCard key={audit.id} audit={audit} />
            ))}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section>
          <SectionHeader
            title="Upcoming Deadlines"
            subtitle={`Total: ${complianceData.upcomingDeadlines.length} deadlines`}
          />
          <div className="space-y-4">
            {complianceData.upcomingDeadlines.map((deadline) => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}
          </div>
        </section>
      </div>

      {/* Certifications */}
      <section>
        <SectionHeader
          title="Active Certifications"
          subtitle={`Total: ${complianceData.certifications.length} certifications`}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {complianceData.certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

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

function ComplianceCategoryCard({ category }: { category: any }) {
  const scoreColor = category.score >= 90 ? 'bg-vor-trust' : category.score >= 70 ? 'bg-vor-gold' : 'bg-red-500';

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-vor-navy mb-1">{category.name}</h3>
          <div className="flex items-center gap-2 text-sm text-vor-slate">
            <span>Last checked: {formatDate(category.lastChecked)}</span>
            <span>•</span>
            <span>Next due: {formatDate(category.nextDue)}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-vor-trust">{category.score}%</p>
          <p className="text-xs text-vor-slate capitalize">{category.status}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-vor-cream mb-4">
        <div
          className={`h-2 rounded-full ${scoreColor} transition-all`}
          style={{ width: `${category.score}%` }}
        />
      </div>

      {/* Requirements */}
      <div className="space-y-2">
        {category.requirements.map((req: any, index: number) => (
          <RequirementItem key={index} requirement={req} />
        ))}
      </div>
    </div>
  );
}

function RequirementItem({ requirement }: { requirement: any }) {
  const statusColors = {
    compliant: 'bg-vor-trust/10 text-vor-trust',
    pending: 'bg-vor-gold/10 text-vor-gold',
    in_progress: 'bg-blue-500/10 text-blue-500',
    non_compliant: 'bg-red-100 text-red-600',
  };

  const statusIcons = {
    compliant: CheckCircle,
    pending: Clock,
    in_progress: TrendingUp,
    non_compliant: AlertTriangle,
  };

  const StatusIcon = statusIcons[requirement.status as keyof typeof statusIcons] || Clock;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          statusColors[requirement.status as keyof typeof statusColors]
        }`}
      >
        <StatusIcon className="h-3 w-3 text-white" />
      </div>
      <span className="text-vor-slate">{requirement.name}</span>
    </div>
  );
}

function AuditCard({ audit }: { audit: any }) {
  const severityColors = {
    low: 'bg-vor-gold/10 text-vor-gold',
    medium: 'bg-orange-500/10 text-orange-500',
    high: 'bg-red-100 text-red-600',
    info: 'bg-vor-slate/10 text-vor-slate',
  };

  return (
    <div className="rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-4 w-4 text-vor-navy" />
            <span className="font-medium text-vor-navy">{audit.title}</span>
          </div>
          <p className="text-xs text-vor-slate">
            {audit.conductedBy} • {formatDate(audit.conductedAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-vor-trust">{audit.score}%</p>
          <p className="text-xs text-vor-slate capitalize">{audit.status}</p>
        </div>
      </div>

      {/* Findings */}
      {audit.findings && audit.findings.length > 0 && (
        <div className="space-y-2 mb-3">
          {audit.findings.map((finding: any, index: number) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                severityColors[finding.severity as keyof typeof severityColors]
              }`}
            >
              <p className="text-xs">{finding.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-vor-border">
        <span className="text-xs text-vor-slate capitalize">{audit.type} audit</span>
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
          <FileText className="h-3 w-3" />
          View Report
        </button>
      </div>
    </div>
  );
}

function DeadlineCard({ deadline }: { deadline: any }) {
  const isUrgent = deadline.daysRemaining <= 7;
  const statusColors = {
    pending: 'bg-vor-gold/10 text-vor-gold',
    in_progress: 'bg-blue-500/10 text-blue-500',
    completed: 'bg-vor-trust/10 text-vor-trust',
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        isUrgent ? 'border-vor-gold bg-vor-cream' : 'border-vor-border bg-white'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isUrgent ? 'bg-vor-gold' : 'bg-vor-cream'}`}>
          <Calendar className="h-5 w-5 text-vor-navy" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-vor-navy">{deadline.requirement}</p>
          <p className="text-xs text-vor-slate">{deadline.category}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-vor-slate">Due: {formatDate(deadline.dueDate)}</span>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              statusColors[deadline.status as keyof typeof statusColors]
            }`}
          >
            {deadline.status}
          </span>
          <span
            className={`text-sm font-medium ${
              isUrgent ? 'text-vor-gold' : 'text-vor-trust'
            }`}
          >
            {deadline.daysRemaining} days
          </span>
        </div>
      </div>
    </div>
  );
}

function CertificationCard({ certification }: { certification: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-trust">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-vor-navy mb-1">{certification.name}</h3>
          <p className="text-xs text-vor-slate">{certification.issuedBy}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-vor-slate">Issued</span>
          <span className="font-medium text-vor-navy">{formatDate(certification.issuedDate)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-vor-slate">Expires</span>
          <span className="font-medium text-vor-navy">{formatDate(certification.expiryDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <span className="text-xs text-vor-slate capitalize">{certification.status}</span>
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-3 py-1.5 text-xs font-medium text-vor-navy hover:bg-vor-border">
          <FileText className="h-3 w-3" />
          View Certificate
        </button>
      </div>
    </div>
  );
}
