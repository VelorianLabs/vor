"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { supabase } from "@/lib/supabase/client";

export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 8500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user is authenticated after loading screen
    if (!loading && !isAdmin && !isDashboard && !isAuth) {
      const checkAuth = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            setShowAuthPrompt(true);
          }
        } catch (error) {
          console.error('Auth check error:', error);
          setShowAuthPrompt(true);
        }
      };
      checkAuth();
    }
  }, [loading, isAdmin, isDashboard, isAuth]);

  if (!mounted) {
    return null;
  }

  if (isAdmin || isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen show={loading} />
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-card p-8 max-w-md w-full relative z-10">
            <div className="text-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-vor-navy mx-auto mb-4">
                <svg className="h-8 w-8 text-vor-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-vor-navy mb-2">
                Welcome to VOR
              </h2>
              <p className="text-sm text-vor-slate">
                Create an account to access your personalized dashboard and manage your VOR portfolio
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/auth/register')}
                className="w-full bg-vor-navy text-white py-3 rounded-lg font-semibold hover:bg-vor-navy-light transition-colors"
              >
                Create Account
              </button>
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-white text-vor-navy border border-vor-border py-3 rounded-lg font-semibold hover:bg-vor-cream transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="w-full text-vor-slate py-3 rounded-lg font-medium hover:text-vor-navy transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}

