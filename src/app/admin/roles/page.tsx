/**
 * VOR Admin - Roles & Permissions (Phase 2)
 *
 * Roles and permissions management page for admin
 */

'use client';

import { useState, useEffect } from 'react';
import { Shield, Plus, Search, MoreVertical, Key, Users, CheckCircle, Clock } from 'lucide-react';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      // Mock data for roles
      const mockRoles = [
        { id: '1', name: 'admin', description: 'Administrative functions and management', userCount: 2 },
        { id: '2', name: 'client', description: 'Property buyers with portfolio access', userCount: 15 },
        { id: '3', name: 'investor', description: 'Investment participants with marketplace access', userCount: 8 },
        { id: '4', name: 'contractor', description: 'Construction workers with project access', userCount: 5 },
      ];
      setRoles(mockRoles);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = roles.reduce((sum, r) => sum + r.userCount, 0);
  const totalPermissions = roles.reduce((sum, r) => sum + r.permissionCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-vor-navy">Roles & Permissions</h1>
          <p className="mt-2 text-vor-slate">Manage system roles and access control</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light">
          <Plus className="h-4 w-4" />
          Add Role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Roles" value={roles.length.toString()} icon={Shield} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Active" value={roles.filter(r => r.status === 'active').length.toString()} icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Permissions" value={totalPermissions.toString()} icon={Key} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Users Assigned" value={totalUsers.toString()} icon={Users} color="bg-vor-gold/10 text-vor-gold" />
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-vor-slate">Loading roles...</p>
        ) : (
          roles.map((role) => (
            <RoleCard
              key={role.name}
              name={role.name}
              description={role.description}
              userCount={role.userCount}
              permissionCount={role.permissionCount}
              status={role.status}
            />
          ))
        )}
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

function RoleCard({
  name,
  description,
  userCount,
  permissionCount,
  status,
}: {
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  status: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-navy text-white">
          <Shield className="h-6 w-6" />
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-vor-trust/10 text-vor-trust">
          {status}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-vor-navy mb-2">{name}</h3>
      <p className="text-sm text-vor-slate mb-4">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-vor-slate">Users</p>
          <p className="text-sm font-semibold text-vor-navy">{userCount}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Permissions</p>
          <p className="text-sm font-semibold text-vor-navy">{permissionCount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <div className="flex items-center gap-2 text-sm text-vor-slate">
          <Key className="h-4 w-4" />
          <span>Manage Permissions</span>
        </div>
        <button className="p-2 rounded hover:bg-vor-border text-vor-slate hover:text-vor-navy">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
