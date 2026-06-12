/**
 * VOR Admin Dashboard Layout
 *
 * Comprehensive admin layout for all 3 phases with proper navigation
 * Classified and secure design
 */

"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Map,
  FileText,
  Shield,
  DollarSign,
  TrendingUp,
  Landmark,
  BarChart3,
  Settings,
  Home,
  LogOut,
  Bell,
  User,
  Lock,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';

const adminNavItems = [
  // Phase 1 - Core Management
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    phase: 'Phase 1',
  },
  {
    label: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    phase: 'Phase 1',
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
    phase: 'Phase 1',
  },
  {
    label: 'Properties',
    href: '/admin/properties',
    icon: Map,
    phase: 'Phase 1',
  },
  {
    label: 'Inspections',
    href: '/admin/inspections',
    icon: Fingerprint,
    phase: 'Phase 1',
  },
  {
    label: 'Content',
    href: '/admin/content',
    icon: FileText,
    phase: 'Phase 1',
  },
  // Phase 2 - Advanced Management
  {
    label: 'Roles & Permissions',
    href: '/admin/roles',
    icon: Shield,
    phase: 'Phase 2',
  },
  {
    label: 'Finance',
    href: '/admin/finance',
    icon: DollarSign,
    phase: 'Phase 2',
  },
  // Phase 3 - Growth Features
  {
    label: 'Investments',
    href: '/admin/investments',
    icon: TrendingUp,
    phase: 'Phase 3',
  },
  {
    label: 'Loans',
    href: '/admin/loans',
    icon: Landmark,
    phase: 'Phase 3',
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
    phase: 'Phase 3',
  },
  // Settings
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    phase: 'All',
  },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(15); // 15 seconds
  const isMounted = useRef(true);
  const routerRef = useRef(router);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth || auth !== "true") {
      // Don't redirect on the login page itself
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true); // Allow login page to render
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Reset timer to 15 seconds when authenticated
    setSessionTimer(90);

    // Session timeout countdown
    const timer = setInterval(() => {
      setSessionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isMounted.current) {
            sessionStorage.removeItem("adminAuth");
            sessionStorage.removeItem("adminUser");
            setTimeout(() => {
              if (isMounted.current) {
                routerRef.current.push("/admin/login");
              }
            }, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      isMounted.current = false;
      clearInterval(timer);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Clear all admin-related session storage
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminTimestamp");
    sessionStorage.removeItem("bypassAuth");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Security Banner */}
      <div className="bg-red-900/30 border-b border-red-500/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-red-400" />
          <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
            Classified System · Authorized Access Only
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-red-300/80 text-xs">
            Session: {formatTime(sessionTimer)}
          </span>
          <span className="text-red-300/80 text-xs">
            ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-10 z-40 h-[calc(100vh-2.5rem)] w-72 bg-gray-950 text-white border-r border-gray-800">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-800 p-6 bg-gray-900">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold text-white">VOR Admin</h1>
                <p className="text-xs text-red-400 font-semibold uppercase tracking-wider">Classified</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Phase 1 - Core
                </p>
                <ul className="space-y-1">
                  {adminNavItems
                    .filter((item) => item.phase === 'Phase 1')
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-red-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Phase 2 - Advanced
                </p>
                <ul className="space-y-1">
                  {adminNavItems
                    .filter((item) => item.phase === 'Phase 2')
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-red-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Phase 3 - Growth
                </p>
                <ul className="space-y-1">
                  {adminNavItems
                    .filter((item) => item.phase === 'Phase 3')
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-red-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3" />
                  System
                </p>
                <ul className="space-y-1">
                  {adminNavItems
                    .filter((item) => item.phase === 'All')
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-red-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-800 p-4 bg-gray-900">
            <div className="flex items-center gap-3 rounded-lg bg-gray-800 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Super Admin</p>
                <p className="text-xs text-red-400">Level 5 Clearance</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Secure Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 mt-10">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-900 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
              <p className="text-sm text-gray-400">Classified System Control</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/notifications"
                className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Home className="h-4 w-4" />
                Exit to Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 bg-gray-900 min-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
