import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = request.cookies.get("session")?.value

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const payload = await decrypt(session)

      // Check if session is expired
      if (payload.expires && new Date(payload.expires) < new Date()) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // Check if user has admin or agent role
      if (!payload.user || !["admin", "agent"].includes(payload.user.role)) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
