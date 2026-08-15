import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { sow_payload } = await request.json();

    if (!sow_payload) {
      return NextResponse.json({ error: 'Missing SOW Payload' }, { status: 400 });
    }

    console.log(`[AGENT_03_OPS] Received finalized SOW for ${sow_payload.client_name}.`);
    
    // 1. Check Partner Network Capacity
    console.log(`[AGENT_03_OPS] Scanning partner network for available capacity in sector...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedPartner = "Savannah Modern Architects (prov_09)";
    console.log(`[AGENT_03_OPS] Found available partner: ${selectedPartner}.`);

    // 2. Dispatch Alert
    console.log(`[AGENT_03_OPS] Dispatching SMS Alert to partner gateway...`);
    const smsMessage = `TMSAVANNAH LEAD: New High-Maturity Intent! Client [${sow_payload.client_name}] needs custom architecture. SOW Value: ${sow_payload.total_investment} KES. Check dashboard to accept.`;
    console.log(`[SMS_GATEWAY] -> ${smsMessage}`);

    // 3. Initiate SLA Countdown
    console.log(`[AGENT_03_OPS] Strict 30-minute SLA countdown initiated for ${selectedPartner}.`);
    // In a real system, we'd trigger an edge function or BullMQ background job here:
    // await queue.add('sla_timeout', { lead_id: sow_payload.lead_id }, { delay: 30 * 60 * 1000 });

    return NextResponse.json({
      success: true,
      action: 'DISPATCHED_TO_PARTNER',
      assigned_partner: selectedPartner,
      sla_status: 'COUNTDOWN_ACTIVE'
    });

  } catch (error) {
    console.error('Ops Engine Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
