import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { HOME_NAV } from "@/lib/constants/navigation";
import { constructionProjects } from "@/lib/data/mock";

export const metadata = { title: "Ongoing Projects" };

export default function OngoingProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Home & Construct"
        title="Ongoing Projects"
        description="Track active VOR-managed construction and development projects across Nigeria."
      />
      <DivisionSubnav items={HOME_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {constructionProjects.map((project) => (
          <article
            key={project.id}
            className="grid md:grid-cols-2 gap-6 bg-white rounded-xl border border-vor-border overflow-hidden shadow-card"
          >
            <div className="relative aspect-video md:aspect-auto md:min-h-[240px]">
              <Image src={project.image} alt={project.name} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-sm text-vor-gold font-medium">{project.state}</p>
              <h2 className="font-display text-2xl font-semibold text-vor-navy mt-1">{project.name}</h2>
              <p className="text-vor-slate mt-1">{project.location}</p>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-vor-slate">Construction progress</span>
                  <span className="font-semibold text-vor-navy">{project.progress}%</span>
                </div>
                <div className="h-3 bg-vor-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-vor-trust rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-vor-slate">
                {project.units} residential units · Estimated completion: {project.completionDate}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
