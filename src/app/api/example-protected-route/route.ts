import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Access the HTTP-only cookie
  const cookieStore = await cookies();
  const secretKey = cookieStore.get('secret-key');

  // If the cookie is not present, return an unauthorized response
  if (!secretKey) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Unauthorized - Cookie not found' 
      }, 
      { status: 401 }
    );
  }

  console.log('secretKey', secretKey);

  // If the cookie is present, return the protected data
  // The cookie value would typically be used to verify the user's session
  return NextResponse.json({
    success: true,
    message: 'Authentication successful',
    data: {
      secretKey: secretKey.value, // Only included for demonstration
      timestamp: new Date().toISOString(),
      protectedData: 'This is protected data that requires authentication'
    }
  });
} 