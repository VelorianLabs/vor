import { PageHero } from "@/components/layout/PageHero";
import { DivisionSubnav } from "@/components/layout/DivisionSubnav";
import { HomesMarketplace } from "@/components/home-construct/HomesMarketplace";
import { HOME_NAV } from "@/lib/constants/navigation";

export const metadata = {
  title: "Homes Marketplace",
  description: "Buy, rent, or lease verified properties across Nigeria.",
};

export default function HomesMarketplacePage() {
  return (
    <>
      <PageHero
        eyebrow="VOR Home & Construct"
        title="Homes Marketplace"
        description="Buy, rent, or lease verified residential and commercial properties across Nigeria."
      />
      <DivisionSubnav items={HOME_NAV} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HomesMarketplace />
      </div>
    </>
  );
}
