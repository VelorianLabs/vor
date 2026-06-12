import { NextResponse } from "next/server";

/**
 * API route for inspection requests - returns mock data for now
 */
export async function GET(request: Request) {
  try {
    const mockInspectionRequests = [
      { id: '1', fullName: 'John Doe', email: 'john@example.com', phone: '+2341234567890', propertyTitle: 'Lekki Phase 1', inspectionDate: new Date().toISOString(), status: 'pending' },
    ];

    return NextResponse.json(mockInspectionRequests);
  } catch (error) {
    console.error('Error fetching inspection requests:', error);
    return NextResponse.json({ error: 'Failed to fetch inspection requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: { id: 'mock-id-' + Date.now() },
      message: 'Inspection request created successfully (mock)',
    });
  } catch (error) {
    console.error('Error creating inspection request:', error);
    return NextResponse.json({ error: 'Failed to create inspection request' }, { status: 500 });
  }
}
