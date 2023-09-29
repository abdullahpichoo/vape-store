import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  // console.log("Cookies", cookies);
  // console.log("Auth Token", cookies.get("next-auth.session-token"));

  // console.log("URL", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
