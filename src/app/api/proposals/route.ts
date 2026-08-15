import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  // Mock list of proposals
  const proposals = [
    { id: 'prop-001', title: 'Website Redesign', subtotal: 5000, status: 'approved' },
    { id: 'prop-002', title: 'SEO Optimization', subtotal: 2500, status: 'pending' },
    { id: 'prop-003', title: 'Mobile App Development', subtotal: 15000, status: 'rejected' },
  ];

  if (clientId) {
    // In a real scenario we would filter by clientId, here we just return the mock list
    return NextResponse.json({ proposals, clientId });
  }

  return NextResponse.json({ proposals });
}
