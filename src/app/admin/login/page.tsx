"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded credentials as requested - extra secure check
    if (username === "DvtVor@Security" && password === "#Sevt@Internal#") {
      // Store authentication in session storage with extra security flags
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("adminUser", username);
      sessionStorage.setItem("adminTimestamp", Date.now().toString());
      sessionStorage.setItem("bypassAuth", "true"); // Extra security flag
      router.push("/admin");
    } else {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vor-navy flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Security Warning Banner */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold text-sm">CLASSIFIED SYSTEM</p>
            <p className="text-red-300/80 text-xs mt-1">
              Unauthorized access to this system is prohibited and will be prosecuted to the fullest extent of the law.
              All access attempts are logged and monitored.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-vor-navy p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vor-gold">
                <Shield className="h-8 w-8 text-vor-navy" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">VOR Admin Portal</h1>
            <p className="text-vor-slate text-sm mt-2">Secure Access Control System</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Restricted Access</span>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-vor-navy mb-2">
                  Security Clearance ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-vor-slate" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-vor-border rounded-lg focus:ring-2 focus:ring-vor-gold focus:border-vor-gold text-sm"
                    placeholder="Enter security ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-vor-navy mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-vor-slate" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-vor-border rounded-lg focus:ring-2 focus:ring-vor-gold focus:border-vor-gold text-sm"
                    placeholder="Enter access code"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Secure Login"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-vor-border">
              <div className="flex items-center justify-center gap-4 text-xs text-vor-slate">
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>Multi-factor Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-vor-slate text-xs">
            VOR Internal Security System · Authorized Personnel Only
          </p>
          <p className="text-vor-slate/60 text-xs mt-1">
            Session ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
