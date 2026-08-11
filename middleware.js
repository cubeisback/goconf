import { NextResponse } from 'next/server';
import {
  allowsIndexing,
  resolvePublicHost,
  SEO_GUARD_BUILD,
} from '@/lib/getBaseUrl';

/**
 * Индексация только для Host=goconf.ru|www.goconf.ru.
 * На dev.goconf.ru всегда noindex + заголовки для проверки деплоя.
 */
export function middleware(request) {
  const host = resolvePublicHost(
    request.headers.get('x-forwarded-host'),
    request.headers.get('host'),
  );
  const version = process.env.NEXT_PUBLIC_VERSION || '(empty)';
  const canIndex = allowsIndexing(host);

  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/robots.txt'
  ) {
    console.log(SEO_GUARD_BUILD, 'middleware', {
      path: request.nextUrl.pathname,
      NEXT_PUBLIC_VERSION: version,
      host: host || '(empty)',
      allowsIndexing: canIndex,
    });
  }

  const response = NextResponse.next();
  response.headers.set('X-GoConf-Seo-Guard', SEO_GUARD_BUILD);
  response.headers.set('X-GoConf-Version', version);
  response.headers.set('X-GoConf-Host', host || '(empty)');
  response.headers.set('X-GoConf-Index', canIndex ? 'allow' : 'deny');

  if (!canIndex) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
