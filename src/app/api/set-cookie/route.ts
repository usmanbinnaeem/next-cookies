import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Cookie set successfully' 
  });

  // Set the HTTP-only cookie with settings for sharing between subdomains
  response.cookies.set({
    name: 'secret-key',
    value: '12345678',
    httpOnly: true,
    secure: true, // Cookies must be secure for cross-subdomain in production
    sameSite: 'lax', // 'lax' works for subdomains of the same parent domain
    path: '/',
    domain: '.chatsync.live', // Note the leading dot - allows sharing across all subdomains
    maxAge: 60 * 60 * 24 * 7, // 1 week (in seconds)
  });

  return response;
} 