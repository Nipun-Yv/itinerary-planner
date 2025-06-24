import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const protectedRoutes = [
  '/itinerary',
  '/hotels/',
  '/profile',
  '/plan',
  '/locations',
  '/dashboard',
]
const authRoutes = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  let isAuthenticated = false
// verify token
  if (token) {
    try {
      verifyToken(token)
      isAuthenticated = true
    } catch {
      isAuthenticated = false
    }
  }

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Handle protected route logic
  const isProtected = protectedRoutes.some(route =>
    // exact match for routes like /dashboard
    pathname === route ||
    // protect sub-paths like /hotels/:id but not /hotels
    (route.endsWith('/') && pathname.startsWith(route))
  )

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)',
  ],
}
