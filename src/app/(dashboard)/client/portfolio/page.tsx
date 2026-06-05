/**
 * VOR Phase 2 - Client Property Portfolio
 * 
 * View owned lands, purchased homes, reserved properties, and property documents.
 */

import { Building2, Home, MapPin, FileText, Download, Eye, Filter } from 'lucide-react';

// Mock data
const portfolioData = {
  ownedLands: [
    {
      id: 'vor-lag-001',
      title: 'Ndukego Housing Parcels',
      state: 'Abuja',
      lga: 'Kuje',
      area: 'Kuje Area Council',
      sizeSqm: 98000,
      price: 950000000,
      titleType: 'C of O',
      investmentGrade: 'A',
      verificationStatus: 'verified',
      purchaseDate: '2024-01-15',
      documents: [
        { name: 'Certificate of Occupancy', type: 'PDF' },
        { name: 'Survey Plan (Red Copy)', type: 'PDF' },
        { name: 'Land Use Charge Receipt', type: 'PDF' },
      ],
    },
    {
      id: 'vor-lag-002',
      title: 'Ibeju-Lekki Industrial Zone Parcel',
      state: 'Lagos',
      lga: 'Ibeju-Lekki',
      area: 'Free Trade Zone Proximity',
      sizeSqm: 1200,
      price: 42000000,
      titleType: "Governor's Consent",
      investmentGrade: 'A',
      verificationStatus: 'verified',
      purchaseDate: '2024-03-22',
      documents: [
        { name: "Governor's Consent", type: 'PDF' },
        { name: 'Registered Survey', type: 'PDF' },
      ],
    },
  ],
  purchasedHomes: [
    {
      id: 'home-001',
      title: '4-Bed Terrace — Lekki Phase 1',
      state: 'Lagos',
      lga: 'Eti-Osa',
      price: 95000000,
      bedrooms: 4,
      bathrooms: 5,
      sqm: 320,
      verificationStatus: 'verified',
      purchaseDate: '2024-06-10',
      documents: [
        { name: 'Sale Agreement', type: 'PDF' },
        { name: 'Deed of Assignment', type: 'PDF' },
      ],
    },
  ],
  reservedProperties: [
    {
      id: 'vor-abj-003',
      title: 'Lugbe Residential Extension Plot',
      state: 'Abuja',
      lga: 'Abuja Municipal',
      area: 'Lugbe District',
      sizeSqm: 450,
      price: 12500000,
      titleType: 'C of O',
      investmentGrade: 'B',
      verificationStatus: 'pending',
      reservationDate: '2024-06-25',
      reservationExpiry: '2024-07-25',
      reservationFee: 500000,
    },
  ],
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ClientPortfolio() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">
            Property Portfolio
          </h1>
          <p className="mt-2 text-vor-slate">
            Manage your real estate investments and properties
          </p>
        </div>
        <button className="rounded-lg bg-vor-gold px-6 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          Add Property
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Properties"
          value="4"
          icon={Building2}
          color="bg-vor-trust"
        />
        <SummaryCard
          title="Total Value"
          value={formatCurrency(1082500000)}
          icon={Home}
          color="bg-vor-gold"
        />
        <SummaryCard
          title="Verified"
          value="3"
          icon={FileText}
          color="bg-vor-navy"
        />
        <SummaryCard
          title="Pending"
          value="1"
          icon={MapPin}
          color="bg-vor-slate"
        />
      </div>

      {/* Owned Lands */}
      <section>
        <SectionHeader
          title="Owned Lands"
          subtitle="Land parcels you have purchased"
          count={portfolioData.ownedLands.length}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolioData.ownedLands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      </section>

      {/* Purchased Homes */}
      <section>
        <SectionHeader
          title="Purchased Homes"
          subtitle="Residential properties you own"
          count={portfolioData.purchasedHomes.length}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolioData.purchasedHomes.map((home) => (
            <HomeCard key={home.id} home={home} />
          ))}
        </div>
      </section>

      {/* Reserved Properties */}
      <section>
        <SectionHeader
          title="Reserved Properties"
          subtitle="Properties with active reservations"
          count={portfolioData.reservedProperties.length}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolioData.reservedProperties.map((property) => (
            <ReservedCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-vor-navy">{value}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-vor-navy">{title}</h2>
        <p className="mt-1 text-sm text-vor-slate">
          {subtitle} ({count})
        </p>
      </div>
      <button className="flex items-center gap-2 rounded-lg border border-vor-border px-4 py-2 text-sm font-medium text-vor-slate hover:bg-vor-cream">
        <Filter className="h-4 w-4" />
        Filter
      </button>
    </div>
  );
}

function LandCard({ land }: { land: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-vor-trust" />
            <span className="text-sm font-medium text-vor-trust">Land</span>
          </div>
          <h3 className="font-semibold text-vor-navy">{land.title}</h3>
          <p className="mt-1 text-sm text-vor-slate">
            {land.area}, {land.lga}, {land.state}
          </p>
        </div>
        <span className="rounded-full bg-vor-trust/10 px-3 py-1 text-xs font-medium text-vor-trust">
          {land.verificationStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-vor-slate">Size</p>
          <p className="font-medium text-vor-navy">{land.sizeSqm.toLocaleString()} sqm</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Title Type</p>
          <p className="font-medium text-vor-navy">{land.titleType}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Investment Grade</p>
          <p className="font-medium text-vor-navy">{land.investmentGrade}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Purchase Date</p>
          <p className="font-medium text-vor-navy">{formatDate(land.purchaseDate)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <p className="text-lg font-bold text-vor-navy">{formatCurrency(land.price)}</p>
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
          <FileText className="h-4 w-4" />
          View Documents ({land.documents.length})
        </button>
      </div>
    </div>
  );
}

function HomeCard({ home }: { home: any }) {
  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-vor-gold" />
            <span className="text-sm font-medium text-vor-gold">Home</span>
          </div>
          <h3 className="font-semibold text-vor-navy">{home.title}</h3>
          <p className="mt-1 text-sm text-vor-slate">
            {home.lga}, {home.state}
          </p>
        </div>
        <span className="rounded-full bg-vor-trust/10 px-3 py-1 text-xs font-medium text-vor-trust">
          {home.verificationStatus}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-vor-slate">Bedrooms</p>
          <p className="font-medium text-vor-navy">{home.bedrooms}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Bathrooms</p>
          <p className="font-medium text-vor-navy">{home.bathrooms}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Size</p>
          <p className="font-medium text-vor-navy">{home.sqm} sqm</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-vor-border">
        <p className="text-lg font-bold text-vor-navy">{formatCurrency(home.price)}</p>
        <button className="flex items-center gap-2 rounded-lg bg-vor-cream px-4 py-2 text-sm font-medium text-vor-navy hover:bg-vor-border">
          <FileText className="h-4 w-4" />
          View Documents ({home.documents.length})
        </button>
      </div>
    </div>
  );
}

function ReservedCard({ property }: { property: any }) {
  const daysUntilExpiry = Math.ceil(
    (new Date(property.reservationExpiry).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isExpiringSoon = daysUntilExpiry <= 7;

  return (
    <div className="rounded-xl border border-vor-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-vor-gold" />
            <span className="text-sm font-medium text-vor-gold">Reserved</span>
          </div>
          <h3 className="font-semibold text-vor-navy">{property.title}</h3>
          <p className="mt-1 text-sm text-vor-slate">
            {property.area}, {property.lga}, {property.state}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isExpiringSoon
              ? 'bg-vor-gold/10 text-vor-gold'
              : 'bg-vor-slate/10 text-vor-slate'
          }`}
        >
          {property.verificationStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-vor-slate">Size</p>
          <p className="font-medium text-vor-navy">{property.sizeSqm.toLocaleString()} sqm</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Title Type</p>
          <p className="font-medium text-vor-navy">{property.titleType}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Reservation Fee</p>
          <p className="font-medium text-vor-navy">{formatCurrency(property.reservationFee)}</p>
        </div>
        <div>
          <p className="text-xs text-vor-slate">Full Price</p>
          <p className="font-medium text-vor-navy">{formatCurrency(property.price)}</p>
        </div>
      </div>

      <div className="rounded-lg bg-vor-cream p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-vor-slate">Reservation Expires</p>
            <p className="font-medium text-vor-navy">{formatDate(property.reservationExpiry)}</p>
          </div>
          <p
            className={`text-sm font-medium ${
              isExpiringSoon ? 'text-vor-gold' : 'text-vor-trust'
            }`}
          >
            {daysUntilExpiry} days left
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex-1 rounded-lg bg-vor-gold px-4 py-2.5 text-sm font-semibold text-vor-navy hover:bg-vor-gold-light">
          Complete Purchase
        </button>
        <button className="rounded-lg border border-vor-border px-4 py-2.5 text-sm font-medium text-vor-slate hover:bg-vor-cream">
          Cancel Reservation
        </button>
      </div>
    </div>
  );
}
