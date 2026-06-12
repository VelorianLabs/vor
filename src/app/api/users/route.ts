import { NextResponse } from "next/server";

/**
 * API route for users - returns mock data for now
 */
export async function GET(request: Request) {
  try {
    const mockUsers = [
      { id: '1', clerkId: 'user_1', email: 'john@example.com', name: 'John Doe', role: 'client', isOnline: true, isActive: true },
      { id: '2', clerkId: 'user_2', email: 'jane@example.com', name: 'Jane Smith', role: 'investor', isOnline: false, isActive: true },
    ];

    return NextResponse.json(mockUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: { id: 'mock-id-' + Date.now() },
      message: 'User created successfully (mock)',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
