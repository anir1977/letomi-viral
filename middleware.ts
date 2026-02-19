import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS
  if (request.nextUrl.protocol !== 'https:') {
    return NextResponse.redirect(
      new URL(
        request.nextUrl.pathname + request.nextUrl.search,
        'https://' + request.nextUrl.host
      )
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
