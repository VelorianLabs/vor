"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 8500);
    return () => clearTimeout(timer);
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen show={loading} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
