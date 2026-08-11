import { NextResponse } from 'next/server';
import { allowsIndexing } from '@/lib/getBaseUrl';

/**
 * Жёсткий запрет индексации на non-prod
 * (meta robots может не попасть в HTML из-за статики/оверрайдов страниц).
 */
export function middleware(request) {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';

  if (allowsIndexing(host)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
