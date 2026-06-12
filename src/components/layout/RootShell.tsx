"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 8500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isAdmin || isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen show={loading} />
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}

