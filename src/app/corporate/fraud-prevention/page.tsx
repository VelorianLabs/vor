import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";
import { AlertTriangle } from "lucide-react";

export const metadata = { title: "Fraud Prevention Center" };

export default function FraudPreventionPage() {
  return (
    <>
      <CorporatePageTemplate
        title="Fraud Prevention Center"
        description="Protect yourself from real estate fraud — and report suspicious activity."
      >
        <div className="flex gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 not-prose mb-6">
          <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" aria-hidden />
          <p className="text-sm text-amber-900">
            VOR will never request payment to personal accounts. All transactions must go through
            official VOR channels with issued receipts and reference numbers.
          </p>
        </div>
        <p>Common red flags in Nigerian land transactions:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Pressure to pay before physical inspection or document review</li>
          <li>Seller unwilling to provide original C of O or registered survey</li>
          <li>Plots sold without verifiable GPS coordinates</li>
          <li>Excision or gazette claims without Lagos State Lands Bureau reference</li>
        </ul>
        <p className="pt-4">
          Report suspected fraud: <strong>vorsyd@gmail.com</strong>
        </p>
      </CorporatePageTemplate>
    </>
  );
}
