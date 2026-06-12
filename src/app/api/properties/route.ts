import { NextResponse } from "next/server";

/**
 * API route for properties - returns mock data for now
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");

    const mockProperties = [
      { id: '1', title: 'Lekki Phase 1', state: 'Lagos', lga: 'Ikeja', price: 50000000, status: 'available' },
      { id: '2', title: 'Maitama Estate', state: 'Abuja', lga: 'Maitama', price: 80000000, status: 'available' },
    ];

    let filteredProperties = mockProperties;
    if (state) {
      filteredProperties = mockProperties.filter((p: any) => 
        p.state.toLowerCase() === state.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProperties,
      meta: { total: filteredProperties.length || 0, source: "mock" },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: { id: 'mock-id-' + Date.now() },
      message: 'Property created successfully (mock)',
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
