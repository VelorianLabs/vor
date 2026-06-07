"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

interface LoadingScreenProps {
  show: boolean;
}

export function LoadingScreen({ show }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + Math.random() * 15;
        if (prev < 70) return prev + Math.random() * 8;
        if (prev < 90) return prev + Math.random() * 3;
        return Math.min(prev + 1, 99);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-vor-navy flex items-center justify-center z-50">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, #C4A052 1%, transparent 60%), radial-gradient(circle at 80% 20%, #1A6B4A 0%, transparent 40%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Shield Icon with Spinning Circles */}
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-vor-gold border-r-vor-gold"
            style={{ animation: "spin 2s linear infinite" }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-vor-trust"
            style={{ animation: "spin-reverse 3s linear infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-16 h-16 text-vor-gold" strokeWidth={1.5} />
          </div>
        </div>

        {/* Loading Text with Dots */}
        <div className="text-center">
          <p className="text-white text-lg font-semibold tracking-wide">
            Loading
            <span className="inline-block ml-1 w-1 h-1 bg-vor-gold rounded-full animate-bounce" />
            <span
              className="inline-block ml-1 w-1 h-1 bg-vor-gold rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="inline-block ml-1 w-1 h-1 bg-vor-gold rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64">
          <div className="bg-vor-navy-light rounded-full h-2 overflow-hidden border border-vor-gold border-opacity-20">
            <div
              className="h-full bg-vor-gold rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 20px rgba(196, 160, 82, 0.4)",
              }}
            />
          </div>
          <p className="text-center text-vor-slate text-sm mt-3 font-medium">
            {Math.round(progress)}%
          </p>
        </div>

        <p className="text-vor-slate text-sm font-light">
          Welcome to <strong className="text-vor-gold text-bold">Vintage Outlook Realty</strong>
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
