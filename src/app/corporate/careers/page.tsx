import { CorporatePageTemplate } from "@/components/corporate/CorporatePageTemplate";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Careers" };

const openings = [
  { title: "Senior Land Verification Analyst", location: "Lagos", type: "Full-time" },
  { title: "Full-Stack Engineer (Proptech)", location: "Remote / Lagos", type: "Full-time" },
  { title: "Construction Project Manager", location: "Abuja", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <CorporatePageTemplate
      title="Careers at VOR"
      description="Join a team building trust infrastructure for Nigerian real estate."
    >
      <p>
        We are hiring mission-driven professionals across land verification, technology,
        construction, finance, and legal operations.
      </p>
      <div className="space-y-4 pt-4 not-prose">
        {openings.map((job) => (
          <div
            key={job.title}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-white rounded-xl border border-vor-border"
          >
            <div>
              <h3 className="font-semibold text-vor-navy">{job.title}</h3>
              <p className="text-sm text-vor-slate">
                {job.location} · {job.type}
              </p>
            </div>
            <Button href="/corporate/contact" variant="outline" size="sm">
              Apply
            </Button>
          </div>
        ))}
      </div>
    </CorporatePageTemplate>
  );
}
