import { headers } from 'next/headers';

/** Маркер актуального деплоя — ищи в pm2 logs / заголовке X-GoConf-Seo-Guard */
export const SEO_GUARD_BUILD = 'SEO_GUARD_v5_2026-08-11';

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
  return hostname === 'dev.goconf.ru' || hostname.startsWith('dev.');
}

/**
 * Выбираем публичный host из кандидатов (Host / X-Forwarded-Host).
 * За nginx иногда один из них = localhost — берём известный публичный домен.
 */
export function resolvePublicHost(...candidates) {
  const list = candidates.filter(Boolean).map((h) => String(h).split(',')[0].trim());

  for (const host of list) {
    const hostname = host.split(':')[0].toLowerCase();
    if (
      hostname === 'goconf.ru' ||
      hostname === 'www.goconf.ru' ||
      hostname === 'dev.goconf.ru'
    ) {
      return host;
    }
  }

  return list[0] || '';
}

/**
 * Индексация ТОЛЬКО по публичному Host = goconf.ru / www.
 * Не завязываемся на NEXT_PUBLIC_VERSION: на сервере билды/порты могут быть перепутаны,
 * но Host от nginx для публичных URL приходит корректно.
 */
export function allowsIndexing(host = '') {
  return isProdHost(host);
}

export function logSeoGuard(context, host = '') {
  console.log(SEO_GUARD_BUILD, context, {
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION || '(empty)',
    host: host || '(empty)',
    isProdHost: isProdHost(host),
    isDevHost: isDevHost(host),
    allowsIndexing: allowsIndexing(host),
  });
}

export async function getRequestHost() {
  try {
    const headersList = await headers();
    return resolvePublicHost(
      headersList.get('x-forwarded-host'),
      headersList.get('host'),
    );
  } catch {
    return '';
  }
}

/** true только для запросов на боевой домен */
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
