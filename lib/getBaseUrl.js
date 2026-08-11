import { headers } from 'next/headers';

/** Маркер актуального деплоя — ищи в pm2 logs / заголовке X-GoConf-Seo-Guard */
export const SEO_GUARD_BUILD = 'SEO_GUARD_v4_2026-08-11';

export function isProdHost(host) {
  const hostname = (host || '').split(':')[0].toLowerCase();
  return hostname === 'goconf.ru' || hostname === 'www.goconf.ru';
}

export function isLocalHost(host) {
  const hostname = (host || '').split(':')[0].toLowerCase();
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function isDevHost(host) {
  const hostname = (host || '').split(':')[0].toLowerCase();
  return (
    hostname === 'dev.goconf.ru' ||
    hostname.startsWith('dev.') ||
    isLocalHost(host)
  );
}

/**
 * Индексация только у prod-сборки (NEXT_PUBLIC_VERSION=production|prod).
 *
 * Важно: за nginx Host часто приходит как localhost:PORT — это НЕ признак non-prod.
 * Явно закрываем только публичный dev-хост (dev.goconf.ru).
 */
export function allowsIndexing(host = '') {
  const version = process.env.NEXT_PUBLIC_VERSION;
  const hostname = (host || '').split(':')[0].toLowerCase();

  // Публичный dev-домен — всегда закрыт (даже если VERSION ошибочно production)
  if (hostname === 'dev.goconf.ru' || hostname.startsWith('dev.')) {
    return false;
  }

  // Главный критерий — версия сборки из .env при билде
  return version === 'prod' || version === 'production';
}

export function logSeoGuard(context, host = '') {
  console.log(SEO_GUARD_BUILD, context, {
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION || '(empty)',
    host: host || '(empty)',
    allowsIndexing: allowsIndexing(host),
  });
}

export async function getRequestHost() {
  try {
    const headersList = await headers();
    return headersList.get('x-forwarded-host') || headersList.get('host') || '';
  } catch {
    return '';
  }
}

/** true только для prod-сборки (и не на dev-хосте) */
export async function isProductionRequest() {
  const host = await getRequestHost();
  return allowsIndexing(host);
}

export async function getBaseUrl() {
  const host = await getRequestHost();

  if (host) {
    const hostname = host.split(':')[0].toLowerCase();
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${host}`;
    }
    return `https://${hostname}`;
  }

  // Fallback на этапе сборки, когда headers() недоступен
  const version = process.env.NEXT_PUBLIC_VERSION;
  switch (version) {
    case 'local':
      return 'http://localhost:3000';
    case 'dev':
      return 'https://dev.goconf.ru';
    case 'prod':
    case 'production':
      return 'https://goconf.ru';
    default:
      return process.env.NODE_ENV === 'production'
        ? 'https://goconf.ru'
        : 'http://localhost:3000';
  }
}
