import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, service_type, current_state } = await request.json();

    if (!message || !service_type) {
      return NextResponse.json({ error: 'Missing required context' }, { status: 400 });
    }

    console.log(`[AGENT_01_ARCHITECT] Intercepting payload for ${service_type}.`);

    // 1. Fetch Dynamic Blueprint
    // In production, this reads from `ServiceBlueprint.groundworkSchema` in Prisma
    console.log(`[AGENT_01_ARCHITECT] Fetching blueprint for: ${service_type}...`);
    
    // Simulate thinking/LLM inference
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. State Machine Logic
    // Depending on the length of the conversation, the agent probes deeper or finalizes.
    const messageCount = current_state?.length || 0;

    if (messageCount < 3) {
      // Still probing for constraints
      return NextResponse.json({
        success: true,
        action: 'ASK_QUESTION',
        agent_response: "I see. And regarding your timeline and budget constraints—are you looking for a quick temporary patch, or are you prepared to invest in a scalable, 2030-ready foundation?",
        intent_maturity: 'LOW'
      });
    } else {
      // Enough data gathered, synthesize Executive Report
      console.log(`[AGENT_01_ARCHITECT] Intent mature. Synthesizing Executive Report...`);
      
      const mockExecutiveReport = "Client admitted their current monolith is failing 3x a week under peak load. They need a scalable, decoupled architecture immediately. Budget is highly flexible for the right solution.";
      
      // Pass the report down the chain to Agent 02 (Financial Engineer)
      console.log(`[AGENT_01_ARCHITECT] Handoff initiated to Agent 02: Financial Engineer.`);

      return NextResponse.json({
        success: true,
        action: 'FINALIZE_SCOPE',
        agent_response: "Understood. Based on your responses, I have compiled a preliminary architecture report. I will forward this to Tryphen for review. If he determines we are a good fit, you will receive a calendar link for your 1-on-1.\n\nThank you for your time.",
        intent_maturity: 'HIGH',
        executive_report: mockExecutiveReport
      });
    }

  } catch (error) {
    console.error('Architect Engine Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
