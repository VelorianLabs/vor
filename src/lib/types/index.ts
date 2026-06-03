export type Division = "terrain" | "home-construct" | "finance" | "corporate";

export type TitleType = "C of O" | "Governor's Consent" | "Deed of Assignment" | "Gazette" | "Excision in Process";

export type InvestmentGrade = "A" | "B" | "C";

export type VerificationStatus = "verified" | "pending" | "in-review";

export interface LandProperty {
  id: string;
  title: string;
  state: string;
  lga: string;
  area: string;
  price: number;
  sizeSqm: number;
  titleType: TitleType;
  investmentGrade: InvestmentGrade;
  verificationStatus: VerificationStatus;
  gps: { lat: number; lng: number };
  roiProjection: number;
  image: string;
  featured?: boolean;
  description: string;
  surveyAvailable: boolean;
  documents: { name: string; type: string }[];
}

export interface HomeListing {
  id: string;
  title: string;
  state: string;
  lga: string;
  price: number;
  listingType: "buy" | "rent" | "lease";
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  verificationStatus: VerificationStatus;
  image: string;
}

export interface ConstructionProject {
  id: string;
  name: string;
  location: string;
  state: string;
  progress: number;
  units: number;
  completionDate: string;
  image: string;
}

export interface InvestmentPool {
  id: string;
  name: string;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  roi: number;
  termMonths: number;
  state: string;
  status: "open" | "closing" | "funded";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
}

export interface FinancialReport {
  id: string;
  title: string;
  period: string;
  type: "quarterly" | "annual" | "project";
  publishedAt: string;
}
