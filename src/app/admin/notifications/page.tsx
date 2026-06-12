'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, Check, X, Mail, Phone, Calendar, MapPin, Building2, Users, Clock, Filter, Search, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'inspection_request' | 'inspection_approved' | 'inspection_scheduled' | 'inspection_completed' | 'user_registered' | 'property_added' | 'payment_received' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'inspection' | 'user' | 'property' | 'payment'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadNotifications = useCallback(async () => {
    try {
      // Mock data for notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'inspection_request',
          title: 'New Inspection Request',
          message: 'John Doe requested an inspection for Property A',
          read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'user_registered',
          title: 'New User Registration',
          message: 'Jane Smith registered as a client',
          read: true,
          created_at: new Date().toISOString(),
        },
      ];
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = notifications;

    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (filter === 'inspection') {
      filtered = filtered.filter(n => n.type.startsWith('inspection'));
    } else if (filter === 'user') {
      filtered = filtered.filter(n => n.type === 'user_registered');
    } else if (filter === 'property') {
      filtered = filtered.filter(n => n.type === 'property_added');
    } else if (filter === 'payment') {
      filtered = filtered.filter(n => n.type === 'payment_received');
    }

    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, filter, searchQuery]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const markAsRead = async (id: string) => {
    try {
      // Update notification as read
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const takeAction = (notification: Notification) => {
    if (notification.type === 'inspection_request' && notification.data) {
      // Navigate to inspection management
      window.location.href = `/admin/inspections`;
    } else if (notification.type === 'user_registered' && notification.data) {
      // Navigate to user management
      window.location.href = `/admin/users`;
    } else if (notification.type === 'property_added' && notification.data) {
      // Navigate to property management
      window.location.href = `/admin/properties`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'inspection_request':
      case 'inspection_approved':
      case 'inspection_scheduled':
      case 'inspection_completed':
        return Calendar;
      case 'user_registered':
        return Users;
      case 'property_added':
        return Building2;
      case 'payment_received':
        return Mail;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'inspection_request':
        return 'bg-blue-100 text-blue-700';
      case 'inspection_approved':
        return 'bg-green-100 text-green-700';
      case 'inspection_scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'inspection_completed':
        return 'bg-vor-trust/10 text-vor-trust';
      case 'user_registered':
        return 'bg-vor-navy/10 text-vor-navy';
      case 'property_added':
        return 'bg-vor-gold/10 text-vor-gold';
      case 'payment_received':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return <div className="p-8">Loading notifications...</div>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">Notification Center</h1>
          <p className="mt-2 text-vor-slate">
            All system notifications and alerts ({unreadCount} unread)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 border border-vor-border rounded-lg hover:bg-vor-cream transition-colors"
          >
            <Check className="h-4 w-4" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Notifications"
          value={notifications.length.toString()}
          icon={Bell}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <StatCard
          title="Unread"
          value={unreadCount.toString()}
          icon={Clock}
          color="bg-vor-gold/10 text-vor-gold"
        />
        <StatCard
          title="Inspection Requests"
          value={notifications.filter(n => n.type.startsWith('inspection')).length.toString()}
          icon={Calendar}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          title="User Registrations"
          value={notifications.filter(n => n.type === 'user_registered').length.toString()}
          icon={Users}
          color="bg-vor-trust/10 text-vor-trust"
        />
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vor-slate" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        </div>
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
            Unread
          </FilterButton>
          <FilterButton active={filter === 'inspection'} onClick={() => setFilter('inspection')}>
            Inspections
          </FilterButton>
          <FilterButton active={filter === 'user'} onClick={() => setFilter('user')}>
            Users
          </FilterButton>
          <FilterButton active={filter === 'property'} onClick={() => setFilter('property')}>
            Properties
          </FilterButton>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-vor-border shadow-card">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-vor-slate">
            <Bell className="h-12 w-12 mx-auto mb-4 text-vor-slate/50" />
            <p>No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-vor-border">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const color = getNotificationColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-vor-cream transition-colors ${!notification.read ? 'bg-vor-cream/30' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-vor-navy">{notification.title}</h3>
                          <p className="text-sm text-vor-slate mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-vor-slate">
                            {new Date(notification.created_at).toLocaleString()}
                          </span>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-vor-gold"></span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => takeAction(notification)}
                          className="px-4 py-2 bg-vor-trust text-white rounded-lg text-sm font-medium hover:bg-vor-trust-light transition-colors"
                        >
                          Take Action
                        </button>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="px-4 py-2 bg-white border border-vor-border rounded-lg text-sm font-medium text-vor-navy hover:bg-vor-cream transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded hover:bg-red-50 text-vor-slate hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

function FilterButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-vor-navy text-white' : 'border border-vor-border hover:bg-vor-cream'
      }`}
    >
      {children}
    </button>
  );
}
