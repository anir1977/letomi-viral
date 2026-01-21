import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function will be called for every route
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow admin login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // For other admin routes, authentication is handled in the admin layout component
  // This uses Supabase Auth client-side for session management
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
