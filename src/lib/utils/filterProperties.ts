import type { LandProperty } from "@/lib/types";

export function filterLandProperties(
  properties: LandProperty[],
  params: {
    state?: string;
    lga?: string;
    titleType?: string;
    grade?: string;
    maxPrice?: string;
    minSize?: string;
  }
) {
  return properties.filter((p) => {
    if (params.state && p.state !== params.state) return false;
    if (params.lga && p.lga !== params.lga) return false;
    if (params.titleType && p.titleType !== params.titleType) return false;
    if (params.grade && p.investmentGrade !== params.grade) return false;
    if (params.maxPrice && p.price > Number(params.maxPrice)) return false;
    if (params.minSize && p.sizeSqm < Number(params.minSize)) return false;
    return true;
  });
}
