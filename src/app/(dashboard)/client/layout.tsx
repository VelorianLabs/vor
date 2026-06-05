/**
 * VOR Phase 2 - Client Dashboard Layout
 * 
 * Layout for the client dashboard with sidebar navigation
 */

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  FileText, 
  HelpCircle,
  Home,
  LogOut,
  Bell,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const clientNavItems = [
  {
    label: 'Overview',
    href: '/dashboard/client',
    icon: LayoutDashboard,
  },
  {
    label: 'Property Portfolio',
    href: '/dashboard/client/portfolio',
    icon: Building2,
  },
  {
    label: 'Payment Center',
    href: '/dashboard/client/payments',
    icon: CreditCard,
  },
  {
    label: 'Document Vault',
    href: '/dashboard/client/documents',
    icon: FileText,
  },
  {
    label: 'Support Center',
    href: '/dashboard/client/support',
    icon: HelpCircle,
  },
];

export default function ClientDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-vor-cream">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-vor-navy text-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-vor-navy-light p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold">
                <span className="font-display text-xl font-bold text-vor-navy">V</span>
              </div>
              <div>
                <h1 className="font-display text-lg font-bold">VOR</h1>
                <p className="text-xs text-vor-slate">Client Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {clientNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-vor-gold text-vor-navy'
                          : 'text-white/80 hover:bg-vor-navy-light hover:text-white'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="border-t border-vor-navy-light p-4">
            <div className="flex items-center gap-3 rounded-lg bg-vor-navy-light p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vor-gold">
                <User className="h-5 w-5 text-vor-navy" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-vor-slate">Client</p>
              </div>
              <button
                className="rounded-lg p-2 text-white/60 hover:bg-vor-navy hover:text-white"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-vor-border bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-vor-navy">Client Dashboard</h2>
              <p className="text-sm text-vor-slate">Welcome back, John</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative rounded-lg p-2 text-vor-slate hover:bg-vor-cream hover:text-vor-navy">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-vor-gold" />
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-vor-slate hover:bg-vor-cream hover:text-vor-navy"
              >
                <Home className="h-4 w-4" />
                Back to Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
