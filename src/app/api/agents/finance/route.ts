import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { executive_report, service_type } = await request.json();

    if (!executive_report || !service_type) {
      return NextResponse.json({ error: 'Missing executive report or service type' }, { status: 400 });
    }

    console.log(`[AGENT_02_FINANCE] Intercepted Executive Report from Agent 01.`);
    console.log(`[AGENT_02_FINANCE] Calculating risk margins and pricing matrix for ${service_type}...`);

    // Simulate complex financial modeling
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real scenario, the agent cross-references the executive_report with standard operating base prices.
    // We will hardcode a mock calculation based on the monolith scale.
    let base_price = 500000;
    let risk_margin = 1.4; // High risk due to legacy tech stack
    let estimated_budget = base_price * risk_margin;

    console.log(`[AGENT_02_FINANCE] Calculation complete. Proposed SOW Value: ${estimated_budget} KES.`);
    console.log(`[AGENT_02_FINANCE] Auto-generating Statement of Work payload...`);

    const sowPayload = {
      lead_id: "L-1002",
      client_name: "Sarah Jenkins",
      total_investment: estimated_budget,
      line_items: [
        { name: "Architecture Audit", amount: 250000 },
        { name: "Backend Refactor", amount: estimated_budget - 250000 }
      ],
      status: "READY_FOR_PREVIEW"
    };

    console.log(`[AGENT_02_FINANCE] Triggering Secure PIN Generation & Handing off to Agent 03 (Ops)...`);

    return NextResponse.json({
      success: true,
      action: 'SOW_GENERATED',
      sow_payload: sowPayload
    });

  } catch (error) {
    console.error('Finance Engine Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
