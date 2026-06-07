'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Shield, Mail, Lock, LayoutDashboard, Home } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [info, setInfo] = useState('');
  const [showAdminChoice, setShowAdminChoice] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setInfo('');
    setLoading(true);

    try {
      console.log('Attempting login with email:', formData.email);
      setInfo('Connecting to authentication server...');
      
      // Check if it's admin credentials first
      if (formData.email === 'DvtVor@Security' && formData.password === '#Sevt@Internal#') {
        console.log('Admin credentials detected');
        setSuccess('Admin credentials verified');
        setLoading(false);
        setShowAdminChoice(true);
        return;
      }

      // Regular user login with Supabase
      setInfo('Authenticating with Supabase...');
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      console.log('Sign in successful, user:', data.user);
      setSuccess('Authentication successful! Redirecting to dashboard...');

      // Default to client dashboard (profiles table may not exist yet)
      console.log('Redirecting to client dashboard');
      router.push('/dashboard/client');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
      setInfo('');
      setLoading(false);
    }
  };

  const handleAdminChoice = (choice: 'admin' | 'site') => {
    // Set admin auth flags
    sessionStorage.setItem('adminAuth', 'true');
    sessionStorage.setItem('adminUser', formData.email);
    sessionStorage.setItem('adminTimestamp', Date.now().toString());
    sessionStorage.setItem('bypassAuth', 'true');

    if (choice === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blurred black background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Auth card */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {!showAdminChoice ? (
          <div className="bg-white rounded-2xl shadow-card p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-vor-navy">
                <Shield className="h-8 w-8 text-vor-gold" />
              </div>
            </div>

            <h1 className="text-2xl font-display font-bold text-vor-navy text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-vor-slate text-center mb-8">
              Sign in to access your VOR dashboard
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Success</p>
                <p className="text-sm text-green-600 mt-1">{success}</p>
              </div>
            )}

            {info && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Info</p>
                <p className="text-sm text-blue-600 mt-1">{info}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-vor-slate">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-vor-trust font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-vor-border">
              <button
                type="button"
                onClick={() => {
                  console.log('Cancel clicked');
                  router.back();
                }}
                className="flex items-center justify-center gap-2 text-sm text-vor-slate hover:text-vor-navy w-full"
              >
                <Shield className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="text-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vor-navy mx-auto mb-4">
                <Shield className="h-8 w-8 text-vor-gold" />
              </div>
              <h2 className="text-2xl font-display font-bold text-vor-navy mb-2">
                Admin Access Verified
              </h2>
              <p className="text-sm text-vor-slate">
                Choose where to proceed
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleAdminChoice('admin')}
                className="w-full bg-vor-navy text-white py-4 rounded-lg font-semibold hover:bg-vor-navy-light transition-colors flex items-center justify-center gap-3"
              >
                <LayoutDashboard className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Admin Dashboard</div>
                  <div className="text-xs opacity-80">Recommended</div>
                </div>
              </button>
              
              <button
                onClick={() => handleAdminChoice('site')}
                className="w-full bg-white text-vor-navy border border-vor-border py-4 rounded-lg font-semibold hover:bg-vor-cream transition-colors flex items-center justify-center gap-3"
              >
                <Home className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Continue to Site</div>
                  <div className="text-xs text-vor-slate">Browse as admin</div>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-vor-border">
              <button
                onClick={() => setShowAdminChoice(false)}
                className="flex items-center justify-center gap-2 text-sm text-vor-slate hover:text-vor-navy w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
