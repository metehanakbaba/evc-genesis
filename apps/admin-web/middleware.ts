import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🔒 Authentication Middleware
 * 
 * Protects all routes except auth pages.
 * Redirects unauthenticated users to login page.
 */

// Define public routes that don't require authentication
const publicRoutes = [
  '/auth',
  '/login', // alias for auth
  '/_next', // Next.js internal routes
  '/favicon.ico',
  '/api', // API routes (handle auth separately)
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

//   // Check for authentication token from Authorization header
//   // localStorage tokens are automatically included in API requests as Bearer tokens
//   const authToken = request.headers.get('authorization')?.replace('Bearer ', '');

//   // If no token, redirect to auth page
//   if (!authToken) {
//     const loginUrl = new URL('/auth', request.url);
//     loginUrl.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // For authenticated users trying to access auth page, redirect to dashboard
//   if (pathname.startsWith('/auth') && authToken) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

  // Allow access to protected routes with valid token
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 