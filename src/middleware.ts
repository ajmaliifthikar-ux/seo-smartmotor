import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect /admin and /user routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
    const isUserRoute = pathname.startsWith('/user')
    const cookieName = isUserRoute ? 'user-token' : 'firebase-token'
    const session = request.cookies.get(cookieName)?.value

    if (!session) {
      // Different login pages for admin vs user
      const loginPath = isUserRoute ? '/user/login' : '/auth'
      const url = new URL(loginPath, request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
}
