import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function will be called for every route
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // For admin routes, authentication is handled in the layout component
  // This is because we're using localStorage which is client-side only
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
  ],
};
