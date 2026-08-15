import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (email === 'admin@example.com' && password === 'password123') {
      return NextResponse.json({
        token: 'mock-jwt-token-admin-12345',
        role: 'admin',
        message: 'Authentication successful',
      });
    }

    return NextResponse.json({
      token: 'mock-jwt-token-user-67890',
      role: 'user',
      message: 'Authentication successful',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
