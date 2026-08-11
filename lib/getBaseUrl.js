import { headers } from 'next/headers';

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
 * Индексация разрешена ТОЛЬКО когда одновременно:
 * - NEXT_PUBLIC_VERSION = prod/production
 * - Host = goconf.ru / www.goconf.ru
 * На dev.goconf.ru / local / VERSION=dev — всегда false.
 */
export function allowsIndexing(host = '') {
  const version = process.env.NEXT_PUBLIC_VERSION;

  if (version === 'dev' || version === 'local') return false;

  if (host) {
    if (isDevHost(host)) return false;
    if (!isProdHost(host)) return false;
    // Prod-хост: требуем prod-версию, если она задана
    if (version && version !== 'prod' && version !== 'production') return false;
    return true;
  }

  // Без host (SSG): только явная prod-сборка
  return version === 'prod' || version === 'production';
}

export async function getRequestHost() {
  try {
    const headersList = await headers();
    return headersList.get('x-forwarded-host') || headersList.get('host') || '';
  } catch {
    return '';
  }
}

/** true только для реального prod */
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
