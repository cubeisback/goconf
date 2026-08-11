import { headers } from 'next/headers';

export function isProdHost(host) {
  const hostname = (host || '').split(':')[0].toLowerCase();
  return hostname === 'goconf.ru' || hostname === 'www.goconf.ru';
}

export async function getRequestHost() {
  try {
    const headersList = await headers();
    return headersList.get('x-forwarded-host') || headersList.get('host') || '';
  } catch {
    return '';
  }
}

/** true только для реального prod-домена (или fallback по env, если host недоступен) */
export async function isProductionRequest() {
  const version = process.env.NEXT_PUBLIC_VERSION;
  // Явные non-prod сборки никогда не индексируем
  if (version === 'dev' || version === 'local') return false;

  const host = await getRequestHost();
  // Host — главный критерий: даже prod-билд на dev.goconf.ru не индексируем
  if (host) return isProdHost(host);

  return version === 'prod' || version === 'production';
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
