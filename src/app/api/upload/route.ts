import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // --- ZERO-TRUST SECURITY PIPELINE ---

    // 1. File Size Verification (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ 
        error: `PAYLOAD_TOO_LARGE: File size exceeds the 5MB enterprise limit.`,
        code: 'ERR_SIZE'
      }, { status: 413 });
    }

    // 2. MIME Type Verification (Reject Executables/Scripts)
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'text/plain',
      'text/markdown'
    ];
    
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `INVALID_SIGNATURE: Disallowed MIME type detected (${file.type}). Only PDF, DOCX, and TXT are permitted.`,
        code: 'ERR_MIME'
      }, { status: 415 });
    }

    // 3. Simulated Heuristics / Malware Scan
    // In a real 2050 environment, this pipes to an internal LLM or ClamAV sandbox.
    await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate scanning time
    
    // Hardcode a mock trigger: If a file has 'malware' or 'exe' in the name, trigger the heuristic trap.
    if (file.name.toLowerCase().includes('malware') || file.name.toLowerCase().endsWith('.exe')) {
      return NextResponse.json({ 
        error: `HEURISTIC_TRAP: Suspected malicious pattern detected in file matrix. Access denied.`,
        code: 'ERR_MALWARE'
      }, { status: 403 });
    }

    // --- PIPELINE PASSED ---
    // In production, we would stream this cleanly to an S3 bucket or Supabase Storage here.
    console.log(`[SECURE UPLOAD] Passed all checks. File ingested: ${file.name} (${file.size} bytes)`);

    return NextResponse.json({
      success: true,
      message: 'Zero-Trust Verification Passed. File ingested successfully.',
      filename: file.name
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error during ingestion' }, { status: 500 });
  }
}
