import { NextResponse } from 'next/server';

// In a 2050 architecture, this vector matrix updates autonomously via a cron job
// fetching the latest CVEs and prompt-injection lists from a GitHub/Security repository.
let KNOWN_THREAT_VECTORS = [
  "ignore all previous",
  "ignore previous instructions",
  "system prompt",
  "you are now",
  "act as",
  "developer mode",
  "bypass",
  "discount",
  "free",
  "override"
];

// Mock API route for updating the vectors (Cron Job Endpoint)
export async function PUT(request: Request) {
  try {
    // Simulated fetch from an external Threat Intelligence Database
    console.log('[AGENT_00_SENTINEL] Fetching latest threat vectors from global security network...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate finding a new zero-day jailbreak vector
    const newZeroDay = "DAN (do anything now)";
    KNOWN_THREAT_VECTORS.push(newZeroDay);
    
    console.log(`[AGENT_00_SENTINEL] Threat matrix updated. Added 1 new zero-day vector.`);
    
    return NextResponse.json({ success: true, vectors_tracked: KNOWN_THREAT_VECTORS.length });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update threat matrix' }, { status: 500 });
  }
}

// The active Firewall Endpoint
export async function POST(request: Request) {
  try {
    const { message, ip_address } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message payload missing' }, { status: 400 });
    }

    console.log(`[AGENT_00_SENTINEL] Analyzing incoming payload from IP: ${ip_address || 'UNKNOWN'}...`);

    const lowerMessage = message.toLowerCase();

    // 1. Strict Heuristic Matching against the auto-updating threat matrix
    for (const vector of KNOWN_THREAT_VECTORS) {
      if (lowerMessage.includes(vector)) {
        console.warn(`[AGENT_00_SENTINEL] 🚨 CRITICAL: Jailbreak attempt detected. Vector triggered: [${vector}]`);
        
        // Action: Drop payload, flag IP in Admin OS (simulated), return generic 400.
        // Returning a generic error prevents the attacker from mapping the security logic.
        return NextResponse.json({ 
          error: 'Bad Request. The server could not understand the request due to invalid syntax.' 
        }, { status: 400 });
      }
    }

    // 2. Simulated LLM-based Intent Analysis
    // In production, you would pipe the message to a lightweight classifier model (e.g., Llama-3-8B-Instruct)
    // to check for semantic manipulation that evades exact string matching.
    
    console.log(`[AGENT_00_SENTINEL] Payload verified. Forwarding to Agent 01 (Solutions Architect)...`);
    
    return NextResponse.json({
      success: true,
      cleared_message: message,
      status: 'SAFE_TO_PROCESS'
    });

  } catch (error) {
    console.error('Sentinel Engine Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
