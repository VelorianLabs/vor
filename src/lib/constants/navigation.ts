import type { Division } from "@/lib/types";

export const DIVISIONS: {
  id: Division | "main";
  label: string;
  href: string;
  description: string;
}[] = [
  {
    id: "main",
    label: "VOR",
    href: "/",
    description: "Vintage Outlook Realty",
  },
  {
    id: "terrain",
    label: "Terrain",
    href: "/terrain",
    description: "Land intelligence & verification",
  },
  {
    id: "home-construct",
    label: "Home & Construct",
    href: "/home-construct",
    description: "Development & housing",
  },
  {
    id: "finance",
    label: "Finance",
    href: "/finance",
    description: "Investment & project funding",
  },
];

export const TERRAIN_NAV = [
  { label: "Land Marketplace", href: "/terrain" },
  { label: "Verification Center", href: "/terrain/verification" },
  { label: "Investment Zones", href: "/terrain/zones" },
];

export const HOME_NAV = [
  { label: "Homes Marketplace", href: "/home-construct" },
  { label: "Construction Services", href: "/home-construct/services" },
  { label: "Ongoing Projects", href: "/home-construct/projects" },
  { label: "Client Dashboard", href: "/home-construct/dashboard" },
];

export const FINANCE_NAV = [
  { label: "Investor Portal", href: "/finance" },
  { label: "Project Funding", href: "/finance/funding" },
  { label: "Financial Reports", href: "/finance/reports" },
  { label: "Loan Marketplace", href: "/finance/loans" },
];

export const CORPORATE_NAV = [
  { label: "About", href: "/corporate/about" },
  { label: "Governance", href: "/corporate/governance" },
  { label: "Legal Compliance", href: "/corporate/legal" },
  { label: "Careers", href: "/corporate/careers" },
  { label: "Partners", href: "/corporate/partners" },
  { label: "Contact", href: "/corporate/contact" },
  { label: "Investor Relations", href: "/corporate/investor-relations" },
  { label: "Transparency Center", href: "/corporate/transparency" },
  { label: "Fraud Prevention", href: "/corporate/fraud-prevention" },
];

export const REGULATORY_BODIES = [
  { name: "Lagos State Lands Bureau", abbr: "LSLB" },
  { name: "Federal Ministry of Housing & Urban Development", abbr: "FMHUD" },
  { name: "FCT Administration", abbr: "FCTA" },
  { name: "Ogun State Ministry of Physical Planning", abbr: "OGMPP" },
  { name: "Corporate Affairs Commission", abbr: "CAC" },
  { name: "Securities and Exchange Commission", abbr: "SEC Nigeria" },
  { name: "Surveyors Council of Nigeria", abbr: "SURCON" },
  { name: "Estate Surveyors and Valuers Registration Board", abbr: "ESVARBON" },
];
