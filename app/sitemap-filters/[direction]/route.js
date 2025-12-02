import { NextResponse } from 'next/server';

export const getApiUrl = (url) => {
  if (url.startsWith("http")) return url;
  return `https://goconf.ru${url}`;
};

function getBaseUrl() {
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://goconf.ru';
}

function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(item => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified.toISOString()}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('')}
</urlset>`;
}

export async function GET(request, { params }) {
  const { direction } = params;
  const currentBaseUrl = getBaseUrl();
  
  console.log(`Generating filters sitemap for direction: ${direction}`);
  
  try {
    const apiUrl = getApiUrl(`/backend/wp-json/sitemap/v2/filters?direction=${direction}`);
    const res = await fetch(apiUrl, {
      next: { revalidate: 604800 } // Кэш на 7 дней для фильтров (очень редко меняются)
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    
    if (!data.success || !data.data?.urls) {
      throw new Error('Invalid API response structure');
    }
    
    // Преобразуем данные для фильтров
    const urls = data.data.urls.map(item => ({
      url: item.loc 
        ? item.loc.replace('https://goconf.ru', currentBaseUrl)
        : `${currentBaseUrl}/events?direction=${direction}${item.slug ? `&${item.slug}` : ''}`,
      lastModified: new Date(item.lastmod || Date.now()),
      changeFrequency: item.changefreq || 'monthly',
      priority: item.priority || 0.4,
    }));
    
    console.log(`Generated ${urls.length} filter URLs for direction ${direction}`);
    
    const sitemapXml = generateSitemapXml(urls);
    
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=259200',
      },
    });
    
  } catch (error) {
    console.error(`Error generating filters sitemap for direction ${direction}:`, error);
    
    const emptySitemap = generateSitemapXml([]);
    
    return new NextResponse(emptySitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache',
      },
    });
  }
}