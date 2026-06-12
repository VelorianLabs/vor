import { NextResponse } from "next/server";

/**
 * API route for testimonials
 */
export async function GET(request: Request) {
  try {
    // Return mock data for now - can be connected to Convex later
    const testimonials = [
      {
        id: '1',
        name: 'Chinedu Okafor',
        role: 'Real Estate Investor',
        content: 'VOR has transformed how I invest in Nigerian real estate. The verification process gives me confidence in every purchase.',
        rating: 5,
        image: '/images/testimonials/testimonial1.jpg',
      },
      {
        id: '2',
        name: 'Adaeze Nwosu',
        role: 'Property Developer',
        content: 'The transparency and professionalism at VOR is unmatched. They truly understand the Nigerian market.',
        rating: 5,
        image: '/images/testimonials/testimonial2.jpg',
      },
      {
        id: '3',
        name: 'Emeka Ibrahim',
        role: 'Land Owner',
        content: 'I sold my land through VOR and the process was seamless. Their verification added value to my property.',
        rating: 5,
        image: '/images/testimonials/testimonial3.jpg',
      },
    ];

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
