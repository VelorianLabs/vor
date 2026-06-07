/**
 * VOR Phase 2 - Client Dashboard Overview
 *
 * Main dashboard page for clients showing portfolio summary, payments, and activity
 */

'use client';

import { useEffect, useState } from 'react';
import { Building2, CreditCard, FileText, TrendingUp, Calendar, Clock, Plus, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: string;
  created_at: string;
}

interface Property {
  id: string;
  title: string;
  status: string;
  value: number;
  image: string;
}

interface Payment {
  id: string;
  amount: number;
  due_date: string;
  status: string;
  property_id: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

export default function ClientDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Get current user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profile) setUser(profile);

      // Load user's properties (will be from real database once set up)
      // For now, showing empty state
      setProperties([]);

      // Load user's payments
      setPayments([]);

      // Load user's activities
      setActivities([]);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vor-navy"></div>
      </div>
    );
  }

  const totalProperties = properties.length;
  const activePayments = payments.filter(p => p.status === 'pending').length;
  const portfolioValue = properties.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Welcome back, {user?.full_name || 'User'}
          </h1>
          <p className="mt-2 text-vor-slate">Here&apos;s an overview of your VOR portfolio</p>
        </div>
        <div className="flex gap-3">
          <Button href="/dashboard/client/portfolio" variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
          <Button href="/terrain" variant="primary" size="sm">
            Browse Properties
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={totalProperties.toString()}
          icon={Building2}
          trend={totalProperties > 0 ? `${totalProperties} active` : 'No properties yet'}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <StatCard
          title="Active Payments"
          value={activePayments.toString()}
          icon={CreditCard}
          trend={activePayments > 0 ? `${payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()} due` : 'No pending payments'}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="Documents"
          value="0"
          icon={FileText}
          trend="No documents yet"
          color="bg-vor-navy/10 text-vor-navy"
        />
        <StatCard
          title="Portfolio Value"
          value={portfolioValue > 0 ? `₦${(portfolioValue / 1000000).toFixed(1)}M` : '₦0'}
          icon={TrendingUp}
          trend={portfolioValue > 0 ? 'Growing' : 'Start investing'}
          color="bg-vor-trust/10 text-vor-trust"
        />
      </div>

      {/* Empty State for New Users */}
      {totalProperties === 0 && (
        <div className="bg-white rounded-xl border border-vor-border p-12 shadow-card text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-vor-cream mx-auto mb-6">
            <Building2 className="h-10 w-10 text-vor-navy" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-vor-navy mb-2">
            Start Your VOR Journey
          </h2>
          <p className="text-vor-slate mb-6 max-w-md mx-auto">
            Browse our verified land properties and construction projects to begin building your portfolio.
          </p>
          <div className="flex gap-3 justify-center">
            <Button href="/terrain" variant="primary">
              Browse Land Properties
            </Button>
            <Button href="/home-construct" variant="outline">
              View Homes
            </Button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {activities.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <h2 className="text-xl font-semibold text-vor-navy mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  date={activity.date}
                  icon={activity.type === 'payment' ? CreditCard : activity.type === 'document' ? FileText : Building2}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <h2 className="text-xl font-semibold text-vor-navy mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {payments.filter(p => p.status === 'pending').map((payment) => (
                <DeadlineItem
                  key={payment.id}
                  title="Payment Due"
                  date={new Date(payment.due_date).toLocaleDateString()}
                  amount={`₦${payment.amount.toLocaleString()}`}
                  icon={Calendar}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/terrain"
            className="flex items-center gap-3 p-4 rounded-lg border border-vor-border hover:border-vor-trust hover:bg-vor-cream transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-trust/10 text-vor-trust">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-vor-navy">Browse Land</p>
              <p className="text-xs text-vor-slate">View verified properties</p>
            </div>
          </Link>
          <Link
            href="/home-construct"
            className="flex items-center gap-3 p-4 rounded-lg border border-vor-border hover:border-vor-trust hover:bg-vor-cream transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold/10 text-vor-gold">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-vor-navy">View Homes</p>
              <p className="text-xs text-vor-slate">Residential properties</p>
            </div>
          </Link>
          <Link
            href="/finance"
            className="flex items-center gap-3 p-4 rounded-lg border border-vor-border hover:border-vor-trust hover:bg-vor-cream transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy/10 text-vor-navy">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-vor-navy">Finance</p>
              <p className="text-xs text-vor-slate">Investment options</p>
            </div>
          </Link>
          <Link
            href="/corporate/contact"
            className="flex items-center gap-3 p-4 rounded-lg border border-vor-border hover:border-vor-trust hover:bg-vor-cream transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-slate/10 text-vor-slate">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-vor-navy">Get Support</p>
              <p className="text-xs text-vor-slate">Contact our team</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-2 text-3xl font-bold text-vor-navy">{value}</p>
          <p className="mt-2 text-sm text-vor-slate">{trend}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  date,
  icon: Icon,
}: {
  title: string;
  description: string;
  date: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-vor-cream">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{description}</p>
        <p className="text-xs text-vor-slate mt-1">{date}</p>
      </div>
    </div>
  );
}

function DeadlineItem({
  title,
  date,
  amount,
  icon: Icon,
}: {
  title: string;
  date: string;
  amount: string;
  icon: any;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-vor-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{title}</p>
        <p className="text-sm text-vor-slate">{date}</p>
        {amount !== 'N/A' && (
          <p className="text-sm font-semibold text-vor-navy mt-1">{amount}</p>
        )}
      </div>
      <Clock className="h-5 w-5 text-vor-gold" />
    </div>
  );
}
