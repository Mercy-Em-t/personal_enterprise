import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // 1. Send straight to the inbox so you are CC'd instantly
    console.log('[MAIL SERVER] Forwarding raw lead to Tryphen\'s Inbox:', { name, email, service });

    // 2. Automate the AI Solutions Architect Qualification Email
    const mockLeadId = 'L-1002'; // In reality, this would be the UUID from Prisma
    const interviewLink = `http://localhost:3000/interview/${mockLeadId}`;
    console.log(`[AGENT] Sending automated qualification email to ${email}`);
    console.log(`[AGENT] Email Body: "Thanks for reaching out! To ensure Tryphen can provide the best architecture strategy during your 1-on-1, please complete this 3-minute AI qualification interview: ${interviewLink}"`);

    // In a real system: await prisma.lead.create({ data: { ..., status: 'INTERVIEW_PENDING' } })

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. Please check your email for the next steps in our qualification process.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
