import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "vor-platform",
    version: "0.1.0",
    phase: "mvp-1",
  });
}
