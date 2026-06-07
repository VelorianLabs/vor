/**
 * VOR Admin - Roles & Permissions (Phase 2)
 *
 * Roles and permissions management page for admin
 */

import { Shield, Plus, Search, MoreVertical, Key, Users, CheckCircle, Clock } from 'lucide-react';

export default function AdminRolesPage() {
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
        <StatCard title="Total Roles" value="9" icon={Shield} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Active" value="9" icon={CheckCircle} color="bg-vor-trust/10 text-vor-trust" />
        <StatCard title="Permissions" value="45" icon={Key} color="bg-vor-navy/10 text-vor-navy" />
        <StatCard title="Users Assigned" value="1,247" icon={Users} color="bg-vor-gold/10 text-vor-gold" />
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoleCard
          name="Super Admin"
          description="Full system access with all permissions"
          userCount={2}
          permissionCount={45}
          status="active"
        />
        <RoleCard
          name="Admin"
          description="Administrative functions and management"
          userCount={5}
          permissionCount={35}
          status="active"
        />
        <RoleCard
          name="Client"
          description="Property buyers with portfolio access"
          userCount={856}
          permissionCount={12}
          status="active"
        />
        <RoleCard
          name="Investor"
          description="Investment participants with marketplace access"
          userCount={234}
          permissionCount={15}
          status="active"
        />
        <RoleCard
          name="Contractor"
          description="Construction workers with project access"
          userCount={89}
          permissionCount={18}
          status="active"
        />
        <RoleCard
          name="Finance Officer"
          description="Financial operations and transaction management"
          userCount={12}
          permissionCount={22}
          status="active"
        />
        <RoleCard
          name="Legal Officer"
          description="Legal verification and compliance management"
          userCount={8}
          permissionCount={20}
          status="active"
        />
        <RoleCard
          name="Survey Officer"
          description="Land survey and verification access"
          userCount={15}
          permissionCount={16}
          status="active"
        />
        <RoleCard
          name="Sales Officer"
          description="Sales and CRM functions"
          userCount={26}
          permissionCount={14}
          status="active"
        />
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
