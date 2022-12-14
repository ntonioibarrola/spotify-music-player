import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/',
};

export const middleware = async (request: NextRequest) => {
  // Token will exist if user logged in
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  const homeUrl = request.nextUrl.clone();
  homeUrl.pathname = '/home';

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/login';

  // Allow the request if the following is true...
  // 1. It's a request for next-auth session and provider fetching
  // 2. It's a request to '/_next' (/_next/static/)
  // 3. Token exists
  if (pathname.includes('/api/auth/') || pathname.includes('/_next') || token) {
    // Redirect to home if already logged in and is trying to access login page
    // Note: Not working
    if (pathname === '/login') {
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  }

  // Redirect to login if they don't have token and is requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};
