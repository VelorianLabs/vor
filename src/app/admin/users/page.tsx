/**
 * VOR Admin - Users Management (Phase 1)
 *
 * User management page for admin to manage all system users
 */

import { Users, Plus, Search, MoreVertical, Shield, Mail, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Users Management</h1>
          <p className="mt-2 text-vor-slate">Manage all system users and their roles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,247" icon={Users} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Active" value="1,180" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Pending" value="45" icon={Clock} color="bg-vor-gold/10 text-vor-gold" />
        <StatCard title="Suspended" value="22" icon={XCircle} color="bg-red-100 text-red-700" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        </div>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Roles</option>
          <option>Client</option>
          <option>Investor</option>
          <option>Contractor</option>
          <option>Finance Officer</option>
          <option>Legal Officer</option>
          <option>Admin</option>
        </select>
        <select className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-vor-border shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-vor-cream border-b border-vor-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-vor-slate uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vor-border">
            <UserRow
              name="John Doe"
              email="john.doe@example.com"
              role="Client"
              status="active"
              joinedDate="January 15, 2024"
            />
            <UserRow
              name="Jane Smith"
              email="jane.smith@example.com"
              role="Investor"
              status="active"
              joinedDate="March 22, 2024"
            />
            <UserRow
              name="BuildRight Construction"
              email="info@buildright.com"
              role="Contractor"
              status="active"
              joinedDate="February 10, 2024"
            />
            <UserRow
              name="Sarah Johnson"
              email="sarah.j@example.com"
              role="Finance Officer"
              status="active"
              joinedDate="April 5, 2024"
            />
            <UserRow
              name="Michael Brown"
              email="michael.b@example.com"
              role="Legal Officer"
              status="pending"
              joinedDate="June 1, 2026"
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

function UserRow({
  name,
  email,
  role,
  status,
  joinedDate,
}: {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
}) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-vor-trust/10 text-vor-trust' },
    pending: { label: 'Pending', color: 'bg-vor-gold/10 text-vor-gold' },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-700' },
  };

  const config = statusConfig[status];

  return (
    <tr className="hover:bg-vor-cream transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vor-navy text-white font-semibold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-vor-navy">{name}</p>
            <p className="text-sm text-vor-slate">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-vor-slate">
          <Shield className="h-4 w-4" />
          {role}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-vor-slate">
          <Calendar className="h-4 w-4" />
          {joinedDate}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
