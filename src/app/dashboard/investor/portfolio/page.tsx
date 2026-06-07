/**
 * VOR Phase 2 - Investor Portfolio Page
 *
 * Investor's portfolio page showing all investments
 */

import { TrendingUp, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function InvestorPortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-vor-navy">My Portfolio</h1>
        <p className="mt-2 text-vor-slate">Track your investment performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Invested"
          value="₦25,000,000"
          icon={DollarSign}
          color="bg-vor-navy/10 text-vor-navy"
        />
        <SummaryCard
          title="Current Value"
          value="₦28,750,000"
          icon={TrendingUp}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <SummaryCard
          title="Total Returns"
          value="₦3,750,000"
          icon={ArrowUpRight}
          color="bg-vor-trust/10 text-vor-trust"
        />
        <SummaryCard
          title="Overall ROI"
          value="15%"
          icon={TrendingUp}
          color="bg-vor-gold/10 text-vor-gold"
        />
      </div>

      {/* Investments List */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Active Investments</h2>
        <div className="space-y-4">
          <InvestmentRow
            id="POOL-001"
            name="Lekki Peninsula Development Pool"
            investedAmount="₦10,000,000"
            currentValue="₦11,800,000"
            roi={18}
            investedDate="January 15, 2024"
            status="active"
          />
          <InvestmentRow
            id="POOL-002"
            name="Abuja Prime Estate Fund"
            investedAmount="₦10,000,000"
            currentValue="₦12,200,000"
            roi={22}
            investedDate="March 22, 2024"
            status="active"
          />
          <InvestmentRow
            id="POOL-003"
            name="Victoria Island Mixed Development"
            investedAmount="₦5,000,000"
            currentValue="₦4,750,000"
            roi={-5}
            investedDate="May 10, 2024"
            status="active"
          />
        </div>
      </div>

      {/* Dividend History */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Dividend History</h2>
        <div className="space-y-4">
          <DividendRow
            pool="Lekki Peninsula Development Pool"
            amount="₦180,000"
            date="March 31, 2026"
            period="Q1 2026"
          />
          <DividendRow
            pool="Abuja Prime Estate Fund"
            amount="₦220,000"
            date="March 31, 2026"
            period="Q1 2026"
          />
          <DividendRow
            pool="Lekki Peninsula Development Pool"
            amount="₦150,000"
            date="December 31, 2025"
            period="Q4 2025"
          />
        </div>
      </div>
    </div>
  );
}

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
    <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-vor-slate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-vor-navy">{value}</p>
        </div>
      </div>
    </div>
  );
}

function InvestmentRow({
  id,
  name,
  investedAmount,
  currentValue,
  roi,
  investedDate,
  status,
}: {
  id: string;
  name: string;
  investedAmount: string;
  currentValue: string;
  roi: number;
  investedDate: string;
  status: string;
}) {
  const isPositive = roi >= 0;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-navy text-white">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vor-slate">{id}</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-vor-trust/10 text-vor-trust">
              {status}
            </span>
          </div>
          <p className="font-medium text-vor-navy mt-1">{name}</p>
          <div className="flex items-center gap-1 text-xs text-vor-slate mt-1">
            <Calendar className="h-3 w-3" />
            <span>Invested: {investedDate}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-vor-navy">{currentValue}</p>
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-vor-trust" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          )}
        </div>
        <p className="text-sm text-vor-slate">Invested: {investedAmount}</p>
        <p className={`text-sm font-medium ${isPositive ? 'text-vor-trust' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{roi}% ROI
        </p>
      </div>
    </div>
  );
}

function DividendRow({
  pool,
  amount,
  date,
  period,
}: {
  pool: string;
  amount: string;
  date: string;
  period: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-vor-border">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-gold text-vor-navy">
          <DollarSign className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-vor-navy">{pool}</p>
          <p className="text-sm text-vor-slate">{period}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-vor-navy">{amount}</p>
        <p className="text-xs text-vor-slate">{date}</p>
      </div>
    </div>
  );
}
