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

// Генерация XML
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
  const { page } = params;
  const currentBaseUrl = getBaseUrl();
  
  console.log(`Generating events sitemap for page: ${page}`);
  
  try {
    // Получаем события для указанной страницы
    const apiUrl = getApiUrl(`/backend/wp-json/sitemap/v2/events?page=${page}`);
    const res = await fetch(apiUrl, {
      next: { revalidate: 86400 } // Кэш на 24 часа для событий
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    
    if (!data.success || !data.data?.urls) {
      throw new Error('Invalid API response structure');
    }
    
    // Преобразуем данные
    const urls = data.data.urls.map(item => ({
      url: item.loc 
        ? item.loc.replace('https://goconf.ru', currentBaseUrl)
        : `${currentBaseUrl}/event/${item.slug}`,
      lastModified: new Date(item.lastmod || Date.now()),
      changeFrequency: item.changefreq || 'weekly',
      priority: item.priority || 0.8,
    }));
    
    console.log(`Generated ${urls.length} event URLs for page ${page}`);
    
    const sitemapXml = generateSitemapXml(urls);
    
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
    
  } catch (error) {
    console.error(`Error generating events sitemap page ${page}:`, error);
    
    // Возвращаем пустой sitemap при ошибке
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