import { NextResponse } from "next/server";
import { landProperties } from "@/lib/data/mock";

/**
 * Placeholder API route for future NestJS backend migration.
 * GET /api/properties — returns mock land listings.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  let data = landProperties;
  if (state) {
    data = data.filter((p) => p.state.toLowerCase() === state.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    data,
    meta: { total: data.length, source: "mock" },
  });
}
