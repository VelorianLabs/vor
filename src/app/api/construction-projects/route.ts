import { NextResponse } from "next/server";

/**
 * API route for construction projects
 */
export async function GET(request: Request) {
  try {
    // Return mock data for now - can be connected to Convex later
    const projects = [
      {
        id: '1',
        title: 'VOR City Phase 1',
        location: 'Lekki, Lagos',
        status: 'in_progress',
        completion: 65,
        image: '/images/projects/project1.jpg',
      },
      {
        id: '2',
        title: 'VOR Heights',
        location: 'Ikoyi, Lagos',
        status: 'planning',
        completion: 0,
        image: '/images/projects/project2.jpg',
      },
      {
        id: '3',
        title: 'VOR Gardens',
        location: 'Abuja',
        status: 'completed',
        completion: 100,
        image: '/images/projects/project3.jpg',
      },
    ];

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching construction projects:', error);
    return NextResponse.json({ error: 'Failed to fetch construction projects' }, { status: 500 });
  }
}
