import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const protectedRoutes = ['/itinerary', '/profile','/plan','/locations',]
const authRoutes = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  let isAuthenticated = false

  // Safely verify token
  if (token) {
    try {
      verifyToken(token)
      isAuthenticated = true
    } catch {
      isAuthenticated = false
    }
  }

  // Redirect logged-in user away from auth pages
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to auth
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)',
  ],
}
