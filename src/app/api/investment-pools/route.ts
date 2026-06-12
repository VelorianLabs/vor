import { NextResponse } from "next/server";

/**
 * API route for investment pools
 */
export async function GET(request: Request) {
  try {
    // Return mock data for now - can be connected to Convex later
    const pools = [
      {
        id: '1',
        name: 'VOR Growth Fund I',
        targetAmount: 500000000,
        currentAmount: 320000000,
        status: 'open',
        roi: 18,
        duration: '24 months',
        minimumInvestment: 5000000,
      },
      {
        id: '2',
        name: 'VOR Development Fund',
        targetAmount: 750000000,
        currentAmount: 450000000,
        status: 'open',
        roi: 22,
        duration: '36 months',
        minimumInvestment: 10000000,
      },
      {
        id: '3',
        name: 'VOR Land Bank Fund',
        targetAmount: 1000000000,
        currentAmount: 1000000000,
        status: 'closed',
        roi: 15,
        duration: '18 months',
        minimumInvestment: 2500000,
      },
    ];

    return NextResponse.json(pools);
  } catch (error) {
    console.error('Error fetching investment pools:', error);
    return NextResponse.json({ error: 'Failed to fetch investment pools' }, { status: 500 });
  }
}
