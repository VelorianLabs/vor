import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { FINANCE_NAV } from "@/lib/constants/navigation";
import { financialReports } from "@/lib/data/mock";
import { Download, FileText } from "lucide-react";

export const metadata = { title: "Financial Reports" };

export default function FinancialReportsPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Finance"
        title="Financial Reports"
        description="Quarterly, annual, and project-level financial disclosures for VOR stakeholders and investors."
      />
      <DivisionSubnav items={FINANCE_NAV} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ul className="space-y-3">
          {financialReports.map((report) => (
            <li
              key={report.id}
              className="flex items-center justify-between gap-4 p-5 bg-white rounded-xl border border-vor-border shadow-card"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-vor-gold shrink-0 mt-0.5" aria-hidden />
                <div>
                  <h3 className="font-medium text-vor-navy">{report.title}</h3>
                  <p className="text-sm text-vor-slate">
                    {report.period} · {report.type} · Published {report.publishedAt}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-vor-trust font-medium hover:underline shrink-0"
              >
                <Download className="h-4 w-4" aria-hidden />
                PDF
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
