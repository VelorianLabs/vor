'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Shield, Mail, Lock, User, Building2, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    company: '',
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
      setInfo('Redirecting to Clerk registration...');
      router.push('/sign-up');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setInfo('');
      setLoading(false);
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
        <div className="bg-white rounded-2xl shadow-card p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-vor-navy">
              <Shield className="h-8 w-8 text-vor-gold" />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-vor-navy text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-sm text-vor-slate text-center mb-8">
            Join VOR to access your personalized dashboard
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
              <label htmlFor="fullName" className="block text-sm font-medium text-vor-navy mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="block text-sm font-medium text-vor-navy mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  placeholder="+234 (0) 800 000 0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-vor-navy mb-1.5">
                Company (Optional)
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-vor-slate" />
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  placeholder="Your company name"
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
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-vor-slate mt-1">Minimum 6 characters</p>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-vor-slate">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-vor-trust font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-vor-border">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 text-sm text-vor-slate hover:text-vor-navy w-full"
            >
              <Shield className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
