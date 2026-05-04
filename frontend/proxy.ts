import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const path = request.nextUrl.pathname;

  // Paths that require NO authentication (guest only)
  const isAuthPath = path.startsWith('/auth');

  // Logic: if trying to access auth pages but already logged in, we let the client side redirect them,
  // or we could decode the token here. But since verifying JWT signature edge side requires Jose,
  // we'll rely on the simpler approach: just checking for cookie existence.

  if (!token && !isAuthPath && !path.startsWith('/_next') && path !== '/') {
    // Basic protection: if trying to access protected paths without a token, redirect to login
    if (path.startsWith('/customer') || path.startsWith('/seller') || path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // To truly enforce role-based redirection safely without decoding at the edge:
  // we let the middleware restrict completely unauthenticated users.
  // The client side layout (or API call) will boot them if their role is wrong.

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
