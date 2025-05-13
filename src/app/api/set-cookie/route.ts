import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Cookie set successfully' 
  });

  // Set the HTTP-only cookie with appropriate settings for cross-domain production use
  response.cookies.set({
    name: 'secret-key',
    value: '12345678',
    httpOnly: true,
    secure: true, // Must be true for cross-domain in production
    sameSite: 'none', // Must be 'none' for cross-domain in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week (in seconds)
  });

  return response;
} 