import { NextResponse } from "next/server";

/**
 * API route for toggling user active status
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'User active status updated successfully (mock)',
    });
  } catch (error) {
    console.error('Error updating user active status:', error);
    return NextResponse.json({ error: 'Failed to update user active status' }, { status: 500 });
  }
}
