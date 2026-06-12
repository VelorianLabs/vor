"use client";

import { Shield, Lock, Eye, Fingerprint, Crosshair, Skull, AlertTriangle, Radio } from "lucide-react";
import { SignIn } from "@clerk/nextjs";

export default function AdminLoginPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred black background */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
      
      {/* Animated scanning line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30 animate-scan" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Top Security Warning */}
        <div className="bg-red-950 border-2 border-red-600 rounded-lg p-4 mb-6 shadow-2xl shadow-red-900/50">
          <div className="flex items-start gap-3">
            <Skull className="h-6 w-6 text-red-500 mt-0.5 shrink-0 animate-pulse" />
            <div>
              <p className="text-red-400 font-bold text-sm uppercase tracking-widest">⚠️ TOP SECRET CLASSIFIED ⚠️</p>
              <p className="text-red-300/90 text-xs mt-2 font-semibold">
                UNAUTHORIZED ACCESS IS A FEDERAL CRIME
              </p>
              <p className="text-red-200/70 text-xs mt-1">
                All access attempts are logged, tracked, and reported to law enforcement. 
                IP address, device fingerprint, and biometric data are recorded.
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border-2 border-red-600 rounded-2xl shadow-2xl shadow-red-900/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-b from-red-950 to-gray-900 p-8 text-center border-b border-red-800">
            <div className="flex justify-center mb-4 relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-950 border-2 border-red-600 shadow-lg shadow-red-900/50">
                <Shield className="h-10 w-10 text-red-500" />
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold text-white tracking-wider">VOR ADMIN</h1>
            <p className="text-red-400 text-sm mt-2 font-semibold uppercase tracking-widest">Classified Access Portal</p>
            
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">THREAT LEVEL: CRITICAL</span>
              <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            </div>
          </div>

          {/* Clerk SignIn */}
          <div className="p-8 bg-gray-900">
            <div className="clerk-signin-wrapper">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-gray-800 border-2 border-red-700 shadow-2xl",
                    headerTitle: "text-white font-bold",
                    headerSubtitle: "text-red-300/70",
                    socialButtonsBlockButton: "bg-gray-700 border border-red-600 hover:bg-gray-600 text-white",
                    formFieldLabel: "text-red-400 font-bold text-xs uppercase tracking-wider",
                    formFieldInput: "bg-gray-900 border-2 border-red-700 text-white placeholder-gray-500",
                    formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider border-2 border-red-500",
                    footerActionLink: "text-red-400 hover:text-red-300",
                    dividerText: "text-red-300/70",
                    identityPreviewText: "text-white",
                    identityPreviewTextSecondary: "text-red-300/70",
                  }
                }}
                forceRedirectUrl="/admin"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-red-800">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2 text-red-400">
                  <Lock className="h-3 w-3" />
                  <span className="font-semibold">AES-256 ENCRYPTION</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <Eye className="h-3 w-3" />
                  <span className="font-semibold">BIOMETRIC TRACKING</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <Crosshair className="h-3 w-3" />
                  <span className="font-semibold">IP LOGGING ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <Fingerprint className="h-3 w-3" />
                  <span className="font-semibold">7-MIN TIMEOUT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Warning */}
        <div className="mt-6 bg-red-950 border-2 border-red-600 rounded-lg p-4 shadow-2xl shadow-red-900/50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
            <div>
              <p className="text-red-400 font-bold text-xs uppercase tracking-widest">Security Notice</p>
              <p className="text-red-300/80 text-xs mt-1">
                This system is monitored 24/7. All activities are recorded.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-red-500/60 text-xs font-bold uppercase tracking-widest">
            VOR Internal Security System
          </p>
          <p className="text-red-500/40 text-xs mt-1">
            Session ID: {Math.random().toString(36).substring(2, 15).toUpperCase()} | IP: LOGGED
          </p>
          <p className="text-red-500/30 text-xs mt-1">
            © 2026 VOR Corporation. All Rights Reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
