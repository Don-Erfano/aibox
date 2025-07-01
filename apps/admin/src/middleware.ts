import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname } = nextUrl;
  const hasToken = cookies.has(`token`);
  if (pathname.startsWith(`/_next`) || pathname.includes(`/static/`)) {
    return NextResponse.next();
  }
  if (pathname === `/` && !hasToken) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }
  if (pathname === `/login` && hasToken) {
    return NextResponse.redirect(new URL(`/dashboard`, req.url));
  }
  if (pathname === `/` && hasToken) {
    return NextResponse.redirect(new URL(`/dashboard`, req.url));
  }
  if (pathname.includes('/dashboard') && !hasToken) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }
  return NextResponse.next();
}
