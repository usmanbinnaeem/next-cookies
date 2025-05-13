// src/app/api/cookies/route.ts
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const WIDGET_ORIGIN = request.headers.get("origin") || "";
  // 1. Parse the incoming secrets
  const { secretKey, menniBokunSecretKey } = await request.json();

  // 2. Build a JSON response
  const res = NextResponse.json(
    { success: true, message: "Auth cookies set securely" },
    { status: 200 }
  );

  // 3. Cookie settings

  // host-only cookies for your Koyeb hostname; they’ll be sent on every
  // subsequent request to that host (when credentials: 'include' is used)
  res.cookies.set("X-SECRET-KEY", secretKey, {
    httpOnly: true,
    secure: true,            // HTTPS only
    sameSite: "none",        // allow cross-site
    path: "/",
    // domain: ".yourdomain.com" // omit or customize if you need a shared root domain
  });
  res.cookies.set("X-MENNI-BOKUN-SECRET-KEY", menniBokunSecretKey, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  // 4. CORS headers to let your widget origin send & receive cookies
  res.headers.set("Access-Control-Allow-Origin", WIDGET_ORIGIN);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return res;
}

export async function OPTIONS(request: Request) {
  const WIDGET_ORIGIN = request.headers.get("origin") || "";
  // Preflight handler—must mirror the same CORS + credentials policy
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", WIDGET_ORIGIN);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}