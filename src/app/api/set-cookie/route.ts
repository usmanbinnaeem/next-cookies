import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Cookie set successfully' 
  });

  // Set the HTTP-only cookie with appropriate settings for cross-domain use
  response.cookies.set({
    name: 'secret-key',
    value: '12345678',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Changed from 'strict' to 'lax' to allow cross-domain requests
    path: '/',
    // If your Nest.js server is on a different domain, you might need to set the domain
    // domain: '.yourdomain.com', // Uncomment and set this if Next.js and Nest.js are on subdomains of the same domain
    maxAge: 60 * 60 * 24 * 7, // 1 week (in seconds)
  });

  return response;
} 