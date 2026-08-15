import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }

    // Scaffold for custom payment gateway
    const paymentSessionUrl = `https://checkout.mockgateway.com/pay/${invoiceId}`;

    return NextResponse.json({
      success: true,
      paymentSessionUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
