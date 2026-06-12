import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { RootShell } from "@/components/layout/RootShell";
import { ClerkProvider } from "@clerk/nextjs";
// @ts-ignore: allow importing global css without type declarations
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VOR — Vintage Outlook Realty | Verified Real Estate & Infrastructure",
    template: "%s | VOR — Vintage Outlook Realty",
  },
  description:
    "A transparent, technology-driven real estate and infrastructure ecosystem focused on verified land, trusted development, and structured investment opportunities in Nigeria.",
  keywords: [
    "Nigeria real estate",
    "verified land",
    "Lagos property",
    "Abuja land",
    "proptech Nigeria",
    "Certificate of Occupancy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
        <body className="font-sans min-h-screen flex flex-col">
          <RootShell>{children}</RootShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
