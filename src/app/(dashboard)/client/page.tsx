/**
 * VOR Phase 2 - Client Dashboard Overview
 * 
 * Main dashboard showing purchased properties, active installments,
 * outstanding balances, verification requests, construction projects, and notifications.
 */

import { Building2, CreditCard, FileText, HardHat, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

// Mock data for dashboard
const dashboardStats = {
  purchasedProperties: 3,
  activeInstallments: 2,
  outstandingBalance: 12500000,
  verificationRequests: 1,
  activeConstructionProjects: 1,
  unreadNotifications: 4,
};

const recentProperties = [
  {
    id: 'vor-lag-001',
    title: 'Ndukego Housing Parcels',
    type: 'Land',
    location: 'Kuje, Abuja',
    status: 'verified',
    purchaseDate: '2024-01-15',
    value: 950000000,
  },
  {
    id: 'vor-lag-002',
    title: 'Ibeju-Lekki Industrial Zone',
    type: 'Land',
    location: 'Ibeju-Lekki, Lagos',
    status: 'verified',
    purchaseDate: '2024-03-22',
    value: 42000000,
  },
  {
    id: 'home-001',
    title: '4-Bed Terrace — Lekki Phase 1',
    type: 'Home',
    location: 'Lekki Phase 1, Lagos',
    status: 'in-progress',
    purchaseDate: '2024-06-10',
    value: 95000000,
  },
];

const upcomingPayments = [
  {
    id: 'pay-001',
    property: 'Ndukego Housing Parcels',
    amount: 2500000,
    dueDate: '2024-07-15',
    status: 'pending',
  },
  {
    id: 'pay-002',
    property: '4-Bed Terrace — Lekki Phase 1',
    amount: 5000000,
    dueDate: '2024-07-20',
    status: 'pending',
  },
];

const recentNotifications = [
  {
    id: 'notif-001',
    title: 'Payment Reminder',
    message: 'Your installment payment for Ndukego Housing Parcels is due in 5 days.',
    type: 'payment',
    createdAt: '2024-07-10T10:30:00Z',
    read: false,
  },
  {
    id: 'notif-002',
    title: 'Construction Update',
    message: 'Your home construction has reached 68% completion.',
    type: 'construction',
    createdAt: '2024-07-09T14:20:00Z',
    read: false,
  },
  {
    id: 'notif-003',
    title: 'Document Verified',
    message: 'Your survey plan has been verified successfully.',
    type: 'document',
    createdAt: '2024-07-08T09:15:00Z',
    read: true,
  },
];

const constructionProjects = [
  {
    id: 'proj-001',
    name: 'VOR Green Courts — Epe',
    location: 'Epe, Lagos',
    progress: 68,
    units: 48,
    completionDate: 'Q3 2026',
    status: 'in-progress',
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ClientDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-vor-navy">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-vor-slate">
          Welcome back! Here's an overview of your real estate portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Purchased Properties"
          value={dashboardStats.purchasedProperties}
          icon={Building2}
          color="bg-vor-trust"
          trend="+2 this year"
        />
        <StatCard
          title="Active Installments"
          value={dashboardStats.activeInstallments}
          icon={CreditCard}
          color="bg-vor-gold"
          trend="On track"
        />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(dashboardStats.outstandingBalance)}
          icon={TrendingUp}
          color="bg-vor-navy"
          trend="₦2.5M due soon"
        />
        <StatCard
          title="Verification Requests"
          value={dashboardStats.verificationRequests}
          icon={FileText}
          color="bg-vor-gold"
          trend="1 pending"
        />
        <StatCard
          title="Construction Projects"
          value={dashboardStats.activeConstructionProjects}
          icon={HardHat}
          color="bg-vor-trust"
          trend="68% complete"
        />
        <StatCard
          title="Notifications"
          value={dashboardStats.unreadNotifications}
          icon={AlertCircle}
          color="bg-vor-gold"
          trend="4 unread"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Properties */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader
            title="Recent Properties"
            subtitle="Your latest property acquisitions"
            link="/dashboard/client/portfolio"
            linkText="View All"
          />
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="space-y-6">
          <SectionHeader
            title="Upcoming Payments"
            subtitle="Payments due in the next 30 days"
            link="/dashboard/client/payments"
            linkText="View All"
          />
          <div className="space-y-4">
            {upcomingPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </div>
      </div>

      {/* Construction Progress */}
      <div className="space-y-6">
        <SectionHeader
          title="Construction Progress"
          subtitle="Track your ongoing construction projects"
          link="/dashboard/client/portfolio"
          linkText="View Details"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {constructionProjects.map((project) => (
            <ConstructionCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="space-y-6">
        <SectionHeader
          title="Recent Notifications"
          subtitle="Stay updated with your account activities"
        />
        <div className="space-y-4">
          {recentNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
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
  trend,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-2xl font-bold text-vor-navy">{value}</p>
          <p className="mt-1 text-xs text-vor-slate">{trend}</p>
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
  link,
  linkText,
}: {
  title: string;
  subtitle: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
        <p className="mt-1 text-sm text-vor-slate">{subtitle}</p>
      </div>
      {link && linkText && (
        <a
          href={link}
          className="text-sm font-medium text-vor-gold hover:text-vor-gold-light"
        >
          {linkText} →
        </a>
      )}
    </div>
  );
}

function PropertyCard({ property }: { property: any }) {
  const statusColors = {
    verified: 'bg-vor-trust/10 text-vor-trust',
    'in-progress': 'bg-vor-gold/10 text-vor-gold',
    pending: 'bg-vor-slate/10 text-vor-slate',
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-vor-cream">
        <Building2 className="h-8 w-8 text-vor-navy" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-vor-navy">{property.title}</h3>
            <p className="text-sm text-vor-slate">{property.location}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusColors[property.status as keyof typeof statusColors]
            }`}
          >
            {property.status}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-vor-slate">
          <span>{property.type}</span>
          <span>•</span>
          <span>Purchased {formatDate(property.purchaseDate)}</span>
          <span>•</span>
          <span className="font-medium text-vor-navy">
            {formatCurrency(property.value)}
          </span>
        </div>
      </div>
    </div>
  );
}

function PaymentCard({ payment }: { payment: any }) {
  const daysUntilDue = Math.ceil(
    (new Date(payment.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isUrgent = daysUntilDue <= 5;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-vor-navy">{payment.property}</h3>
          <p className="mt-1 text-2xl font-bold text-vor-navy">
            {formatCurrency(payment.amount)}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-vor-slate" />
            <span className={isUrgent ? 'text-vor-gold font-medium' : 'text-vor-slate'}>
              Due in {daysUntilDue} days
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-vor-navy px-4 py-2 text-sm font-medium text-white hover:bg-vor-navy-light">
          Pay Now
        </button>
      </div>
    </div>
  );
}

function ConstructionCard({ project }: { project: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-vor-navy">{project.name}</h3>
          <p className="text-sm text-vor-slate">{project.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <HardHat className="h-5 w-5 text-vor-gold" />
          <span className="text-sm font-medium text-vor-gold">
            {project.progress}%
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-vor-cream">
          <div
            className="h-2 rounded-full bg-vor-trust transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-vor-slate">{project.units} units</span>
        <span className="text-vor-slate">ETA: {project.completionDate}</span>
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: any }) {
  const typeIcons = {
    payment: CreditCard,
    construction: HardHat,
    document: FileText,
  };

  const Icon = typeIcons[notification.type as keyof typeof typeIcons] || AlertCircle;

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border p-4 ${
        notification.read
          ? 'border-vor-border bg-white'
          : 'border-vor-gold bg-vor-cream'
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          notification.read ? 'bg-vor-slate/10' : 'bg-vor-gold'
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            notification.read ? 'text-vor-slate' : 'text-vor-navy'
          }`}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-vor-navy">{notification.title}</h4>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-vor-gold" />
          )}
        </div>
        <p className="mt-1 text-sm text-vor-slate">{notification.message}</p>
        <p className="mt-2 text-xs text-vor-slate">
          {formatDate(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}
