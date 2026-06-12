/**
 * VOR Admin - Settings
 *
 * System settings page for admin configuration
 */

'use client';

import { useState, useEffect } from 'react';
import { Settings, Shield, Bell, Database, Globe, Users, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Mock data for settings
      const mockSettings = {
        siteName: 'VOR Platform',
        maintenanceMode: false,
        notificationsEnabled: true,
      };
      setSettings(mockSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock save operation
      console.log('Settings saved:', settings);
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">System Settings</h1>
        <p className="mt-2 text-vor-slate">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white rounded-xl border border-vor-border p-4 shadow-card">
          <nav className="space-y-2">
            <NavItem icon={Shield} label="Security" active />
            <NavItem icon={Users} label="User Management" />
            <NavItem icon={Bell} label="Notifications" />
            <NavItem icon={Database} label="Database" />
            <NavItem icon={Globe} label="General" />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Settings */}
          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <h2 className="text-xl font-semibold text-vor-navy mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </h2>
            <div className="space-y-4">
              <SettingItem
                label="Two-Factor Authentication"
                description="Require 2FA for all admin accounts"
                type="toggle"
                defaultValue={true}
              />
              <SettingItem
                label="Session Timeout"
                description="Auto-logout after inactivity (minutes)"
                type="number"
                defaultValue="30"
              />
              <SettingItem
                label="Password Policy"
                description="Minimum password length"
                type="number"
                defaultValue="12"
              />
              <SettingItem
                label="IP Whitelist"
                description="Restrict admin access to specific IPs"
                type="toggle"
                defaultValue={false}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <h2 className="text-xl font-semibold text-vor-navy mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </h2>
            <div className="space-y-4">
              <SettingItem
                label="Email Notifications"
                description="Send email alerts for critical events"
                type="toggle"
                defaultValue={true}
              />
              <SettingItem
                label="SMS Alerts"
                description="Send SMS for urgent security events"
                type="toggle"
                defaultValue={false}
              />
              <SettingItem
                label="Daily Digest"
                description="Send daily summary of system activity"
                type="toggle"
                defaultValue={true}
              />
            </div>
          </div>

          {/* Database Settings */}
          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <h2 className="text-xl font-semibold text-vor-navy mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Settings
            </h2>
            <div className="space-y-4">
              <SettingItem
                label="Backup Frequency"
                description="How often to backup the database"
                type="select"
                options={['Daily', 'Weekly', 'Monthly']}
                defaultValue="Daily"
              />
              <SettingItem
                label="Retention Period"
                description="How long to keep backups (days)"
                type="number"
                defaultValue="30"
              />
              <SettingItem
                label="Auto-Optimization"
                description="Automatically optimize database performance"
                type="toggle"
                defaultValue={true}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-vor-gold text-vor-navy' : 'text-vor-slate hover:bg-vor-cream hover:text-vor-navy'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function SettingItem({
  label,
  description,
  type,
  defaultValue,
  options,
}: {
  label: string;
  description: string;
  type: 'toggle' | 'number' | 'select' | 'text';
  defaultValue?: any;
  options?: string[];
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-vor-border last:border-0">
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{label}</p>
        <p className="text-sm text-vor-slate mt-1">{description}</p>
      </div>
      <div className="ml-4">
        {type === 'toggle' && (
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              defaultValue ? 'bg-vor-trust' : 'bg-vor-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                defaultValue ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )}
        {type === 'number' && (
          <input
            type="number"
            defaultValue={defaultValue}
            className="w-24 px-3 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        )}
        {type === 'select' && (
          <select className="px-3 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
            {options?.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        )}
        {type === 'text' && (
          <input
            type="text"
            defaultValue={defaultValue}
            className="w-48 px-3 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          />
        )}
      </div>
    </div>
  );
}
