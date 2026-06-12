/**
 * VOR Admin Dashboard - Main Overview
 *
 * Comprehensive admin dashboard with real data from database
 */

'use client';

import { useState, useEffect } from 'react';
import { Users, Map, BarChart3, TrendingUp, DollarSign, Shield, Building2, Activity, AlertTriangle, CheckCircle, Calendar, Clock } from 'lucide-react';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

function InspectionRequestItem({ request, onApprove }: { request: any; onApprove: () => void }) {
  const handleApprove = async () => {
    try {
      await fetch(`/api/inspection-requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      onApprove();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-red-700 bg-gray-800 hover:bg-gray-700 transition-colors">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950 border border-red-600 text-red-400">
        <Calendar className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">{request.fullName}</p>
        <p className="text-sm text-red-300/70">{request.propertyTitle} - {new Date(request.inspectionDate).toLocaleDateString()}</p>
      </div>
      <button
        onClick={handleApprove}
        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 border border-red-500 transition-colors"
      >
        Approve
      </button>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingInspections: 0,
    approvedInspections: 0,
    monthlyRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Session timeout check
  useSessionTimeout();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load real stats from Convex
      const [usersResponse, propertiesResponse, inspectionsResponse] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/properties'),
        fetch('/api/inspection-requests'),
      ]);

      const users = await usersResponse.json();
      const properties = await propertiesResponse.json();
      const inspections = await inspectionsResponse.json();
      
      const pending = inspections?.filter((i: any) => i.status === 'pending').length || 0;
      const approved = inspections?.filter((i: any) => i.status === 'approved').length || 0;

      setStats({
        totalUsers: users?.length || 0,
        totalProperties: properties?.length || 0,
        pendingInspections: pending,
        approvedInspections: approved,
        monthlyRevenue: 0, // Will be calculated from transactions
      });

      // Load recent activity from inspection requests
      setRecentActivity(inspections?.slice(-5).reverse() || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-red-400 font-semibold">Loading Classified Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Security Header */}
      <div className="bg-red-950 border-2 border-red-600 rounded-lg p-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-red-500 animate-pulse" />
        <div>
          <p className="text-red-400 font-bold text-xs uppercase tracking-widest">⚠️ CLASSIFIED ADMIN DASHBOARD ⚠️</p>
          <p className="text-red-300/80 text-xs mt-1">All activities are monitored and logged</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-red-400">Complete system overview with real-time data</p>
      </div>

      {/* Core Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          icon={Users}
          trend="Active users"
          color="bg-red-950 border-2 border-red-700 text-red-400"
        />
        <StatCard
          title="Properties"
          value={stats.totalProperties.toString()}
          icon={Map}
          trend="Listed properties"
          color="bg-red-950 border-2 border-red-700 text-red-400"
        />
        <StatCard
          title="Pending Inspections"
          value={stats.pendingInspections.toString()}
          icon={Calendar}
          trend="Awaiting approval"
          color="bg-red-950 border-2 border-red-700 text-red-400"
        />
        <StatCard
          title="Approved Inspections"
          value={stats.approvedInspections.toString()}
          icon={CheckCircle}
          trend="Scheduled"
          color="bg-red-950 border-2 border-red-700 text-red-400"
        />
      </div>

      {/* Pending Inspection Requests */}
      <div className="bg-gray-900 border-2 border-red-700 rounded-xl p-6 shadow-2xl shadow-red-900/50">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Pending Inspection Requests</h2>
        {recentActivity.length === 0 ? (
          <p className="text-red-300/70">No pending inspection requests</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <InspectionRequestItem key={activity.id} request={activity} onApprove={loadDashboardData} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Manage Users"
          description="View and manage user accounts"
          icon={Users}
          href="/admin/users"
        />
        <QuickActionCard
          title="Manage Properties"
          description="Add and edit property listings"
          icon={Map}
          href="/admin/properties"
        />
        <QuickActionCard
          title="Inspection Requests"
          description="Approve or schedule inspections"
          icon={Calendar}
          href="/admin/inspections"
        />
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
    <div className={`${color} rounded-xl p-6 shadow-2xl shadow-red-900/30`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-red-300">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-2 text-sm text-red-400">{trend}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950 border border-red-600 text-red-400">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-gray-900 border-2 border-red-700 rounded-xl p-6 shadow-2xl shadow-red-900/50 hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950 border border-red-600 text-red-400">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-red-300/70">{description}</p>
    </a>
  );
}