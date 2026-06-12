/**
 * VOR Admin - Users Management (Phase 1)
 *
 * User management page for admin to manage all system users
 */

'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Search, MoreVertical, Shield, Mail, Calendar, CheckCircle, XCircle, Clock, X, Power, PowerOff, AlertTriangle } from 'lucide-react';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
    online: 0,
  });

  // Session timeout check
  useSessionTimeout();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();

      setUsers(data || []);
      
      const active = data?.filter((u: any) => u.isActive).length || 0;
      const pending = data?.filter((u: any) => !u.isActive).length || 0;
      const suspended = 0;
      const online = data?.filter((u: any) => u.isOnline).length || 0;

      setStats({
        total: data?.length || 0,
        active,
        pending,
        suspended,
        online,
      });
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    return users.filter((user: any) => {
      const matchesSearch = searchQuery === '' || 
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const handleDeleteUser = async (clerkId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await fetch(`/api/users/${clerkId}`, { method: 'DELETE' });
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleToggleOnlineStatus = async (clerkId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/users/${clerkId}/online`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOnline: !currentStatus })
      });
      loadUsers();
    } catch (error) {
      console.error('Error updating online status:', error);
      alert('Failed to update online status');
    }
  };

  const handleToggleUserStatus = async (clerkId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/users/${clerkId}/active`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      loadUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-red-400 font-semibold">Loading Classified Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="bg-red-950 border-2 border-red-600 rounded-lg p-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-red-500 animate-pulse" />
        <div>
          <p className="text-red-400 font-bold text-xs uppercase tracking-widest">⚠️ CLASSIFIED USER MANAGEMENT ⚠️</p>
          <p className="text-red-300/80 text-xs mt-1">All user activities are monitored and logged</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Users Management</h1>
          <p className="mt-2 text-red-400">Manage all system users and their roles</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border border-red-500"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={stats.total.toString()} icon={Users} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Active" value={stats.active.toString()} icon={CheckCircle} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Pending" value={stats.pending.toString()} icon={Clock} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Suspended" value={stats.suspended.toString()} icon={XCircle} color="bg-red-950 border-2 border-red-700 text-red-400" />
        <StatCard title="Online" value={stats.online.toString()} icon={Power} color="bg-red-950 border-2 border-red-700 text-red-400" />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
          />
        </div>
        <select 
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          <option value="all">All Roles</option>
          <option value="client">Client</option>
          <option value="investor">Investor</option>
          <option value="contractor">Contractor</option>
          <option value="finance_officer">Finance Officer</option>
          <option value="legal_officer">Legal Officer</option>
          <option value="admin">Admin</option>
        </select>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 border-2 border-red-700 rounded-xl shadow-2xl shadow-red-900/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-950 border-b-2 border-red-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-400 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-400 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-400 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-800">
            {getFilteredUsers().length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-red-300/70">
                  No users found
                </td>
              </tr>
            ) : (
              getFilteredUsers().map((user) => (
                <UserRow
                  key={user.id}
                  id={user.id}
                  name={user.full_name || user.email}
                  email={user.email}
                  role={user.role}
                  status={user.status || 'active'}
                  joinedDate={new Date(user.created_at).toLocaleDateString()}
                  isOnline={user.is_online || false}
                  onDelete={() => handleDeleteUser(user.id)}
                  onToggleStatus={() => handleToggleUserStatus(user.id, user.status || 'active')}
                  onToggleOnline={() => handleToggleOnlineStatus(user.id, user.is_online || false)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onSuccess={() => { loadUsers(); setShowAddModal(false); }} />}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className={`${color} rounded-xl p-6 shadow-2xl shadow-red-900/30`}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-950 border border-red-600 text-red-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-red-300">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function UserRow({
  id,
  name,
  email,
  role,
  status,
  joinedDate,
  isOnline,
  onDelete,
  onToggleStatus,
  onToggleOnline,
}: {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
  isOnline: boolean;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleOnline: () => void;
}) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-900/30 border border-green-700 text-green-400' },
    pending: { label: 'Pending', color: 'bg-yellow-900/30 border border-yellow-700 text-yellow-400' },
    suspended: { label: 'Suspended', color: 'bg-red-900/30 border border-red-700 text-red-400' },
  };

  const config = statusConfig[status];

  return (
    <tr className="hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950 border border-red-600 text-white font-semibold">
              {name.charAt(0)}
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
            )}
          </div>
          <div>
            <p className="font-medium text-white">{name}</p>
            <p className="text-sm text-red-300/70">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-red-300/70">
          <Shield className="h-4 w-4 text-red-400" />
          {role}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-red-300/70">
          <Calendar className="h-4 w-4 text-red-400" />
          {joinedDate}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleOnline}
            className="p-2 rounded hover:bg-gray-700 text-red-300/70 hover:text-red-400"
            title={isOnline ? 'Mark as offline' : 'Mark as online'}
          >
            {isOnline ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
          </button>
          <button 
            onClick={onToggleStatus}
            className="p-2 rounded hover:bg-gray-700 text-red-300/70 hover:text-red-400"
            title={status === 'active' ? 'Suspend user' : 'Activate user'}
          >
            {status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          </button>
          <button 
            onClick={onDelete}
            className="p-2 rounded hover:bg-red-900/50 text-red-300/70 hover:text-red-400"
            title="Delete user"
          >
            <X className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 text-red-300/70 hover:text-red-400">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'client',
    status: 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.full_name || !formData.email) {
        alert('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        setLoading(false);
        return;
      }

      const userData = {
        full_name: formData.full_name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        is_online: false,
        created_at: new Date().toISOString(),
      };

      // Mock save - in production, this would call the API
      console.log('User data:', userData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error: any) {
      console.error('Error adding user:', error);
      alert(`Failed to add user: ${error.message || 'Unknown error. Email may already exist.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-700 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-900/50">
        <div className="p-6 border-b-2 border-red-700 flex items-center justify-between bg-red-950">
          <h2 className="text-xl font-semibold text-white">Add New User</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-red-400 hover:text-red-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Role *</label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            >
              <option value="client">Client</option>
              <option value="investor">Investor</option>
              <option value="contractor">Contractor</option>
              <option value="finance_officer">Finance Officer</option>
              <option value="legal_officer">Legal Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-400 mb-2">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-red-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-red-700 rounded-lg hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border border-red-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
