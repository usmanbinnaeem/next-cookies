import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secretKey, menniSecretKey } = body;

    if (!secretKey || !menniSecretKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required keys in request body",
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Cookies set successfully",
    });

    // Set the HTTP-only cookies with settings for sharing between subdomains
    response.cookies.set({
      name: "X-SECRET-KEY",
      value: secretKey,
      httpOnly: true,
      secure: true, // Cookies must be secure for cross-subdomain in production
      sameSite: "lax", // 'lax' works for subdomains of the same parent domain
      path: "/",
      domain: ".chatsync.live", // Note the leading dot - allows sharing across all subdomains
      maxAge: 30 * 60, // 30 minutes (in seconds)
    });

    response.cookies.set({
      name: "X-MENNI-BOKUN-SECRET-KEY",
      value: menniSecretKey,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: ".chatsync.live",
      maxAge: 30 * 60, // 30 minutes (in seconds)
    });

    return response;
  } catch (error: unknown) {
    console.error("Error setting cookies:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to parse request body",
      },
      { status: 400 }
    );
  }
}
