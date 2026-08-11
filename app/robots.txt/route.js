import {
  getRequestHost,
  isProductionRequest,
  logSeoGuard,
  SEO_GUARD_BUILD,
} from '@/lib/getBaseUrl';

// Disallow на local + dev; боевой robots — только production-сборка
const NON_PROD_ROBOTS = `User-agent: *
Disallow: /
`;

const PROD_ROBOTS = `User-agent: *
Disallow: /backend/wp-admin/
Disallow: /backend/wp-includes/
Disallow: /backend/wp-content/
Disallow: /backend/xmlrpc.php
Disallow: /backend/
Disallow: /cabinet
Disallow: /social-login/
Allow: /
Allow: /backend/wp-json/
Allow: /backend/wp-content/uploads/
Allow: /backend/*.png
Allow: /backend/*.jpg
Allow: /backend/*.jpeg
Allow: /backend/*.webp
Allow: /backend/*.svg


User-agent: GoogleBot
Disallow: /backend/wp-admin/
Disallow: /backend/wp-includes/
Disallow: /backend/wp-content/
Disallow: /backend/xmlrpc.php
Disallow: /backend/
Disallow: /cabinet
Allow: /backend/wp-json/
Allow: /backend/wp-content/uploads/
Allow: /backend/*.png
Allow: /backend/*.jpg
Allow: /backend/*.jpeg
Allow: /backend/*.webp
Allow: /backend/*.svg
Allow: /backend/wp-admin/admin-ajax.php

User-agent: Yandex
Disallow: /backend/wp-admin/
Disallow: /backend/wp-includes/
Disallow: /backend/wp-content/
Disallow: /backend/xmlrpc.php
Disallow: /backend/
Disallow: /cabinet
Allow: /backend/wp-json/
Allow: /backend/wp-content/uploads/
Allow: /backend/*.png
Allow: /backend/*.jpg
Allow: /backend/*.jpeg
Allow: /backend/*.webp
Allow: /backend/*.svg
Allow: /backend/wp-admin/admin-ajax.php
Clean-param: utm_source&utm_medium&utm_campaign
Clean-param: openstat

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: BingAI
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: ai-seo
Allow: /

Sitemap: https://goconf.ru/sitemap.xml
`;

export const dynamic = 'force-dynamic';

export async function GET() {
  const host = await getRequestHost();
  const isProd = await isProductionRequest();
  const version = process.env.NEXT_PUBLIC_VERSION || '(empty)';

  logSeoGuard('robots.txt', host);

  return new Response(isProd ? PROD_ROBOTS : NON_PROD_ROBOTS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, must-revalidate',
      'X-GoConf-Seo-Guard': SEO_GUARD_BUILD,
      'X-GoConf-Version': version,
      'X-GoConf-Host': host || '(empty)',
      'X-GoConf-Robots-Mode': isProd ? 'allow-prod' : 'disallow-all',
    },
  });
}
