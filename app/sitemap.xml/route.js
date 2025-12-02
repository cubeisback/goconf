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

function generateSitemapIndexXml(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;
}

export async function GET() {
  const currentBaseUrl = getBaseUrl();
  
  console.log('Generating main sitemap index');
  
  try {
    // Получаем индекс sitemap из WordPress
    const apiUrl = getApiUrl('/backend/wp-json/sitemap/v2/index/');
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Кэш на 1 час
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.success || !data.data?.sitemaps) {
      throw new Error('Invalid API response structure');
    }
    
    // Преобразуем каждый sitemap, добавляя .xml ко всем URL
    const sitemaps = data.data.sitemaps.map(sitemap => {
  let url;
  
  if (sitemap.loc) {
    // Извлекаем информацию из backend URL
    const backendPath = sitemap.loc.replace('https://goconf.ru/backend/wp-json/sitemap/v2/', '');
    
    // Определяем тип и создаем фронтенд URL
    if (backendPath.startsWith('main')) {
      // Главный sitemap - прямая ссылка
      url = `${currentBaseUrl}/sitemap-main.xml`;
    } else if (backendPath.startsWith('events')) {
      // События - извлекаем номер страницы
      const page = backendPath.includes('page=') ? backendPath.split('page=')[1] : '1';
      // URL с дефисом для rewrites
      url = `${currentBaseUrl}/sitemap-events-${page}.xml`;
    } else if (backendPath.startsWith('pages')) {
      // Страницы - прямая ссылка
      url = `${currentBaseUrl}/sitemap-pages.xml`;
    } else if (backendPath.startsWith('filters')) {
      // Фильтры - извлекаем направление
      const match = backendPath.match(/direction=([^&]*)/);
      const direction = match ? match[1] : 'none';
      // URL с дефисом для rewrites
      url = `${currentBaseUrl}/sitemap-filters-${direction}.xml`;
    } else {
      // Неизвестный тип - оставляем как есть
      url = sitemap.loc;
    }
  } else {
    // Если нет loc, создаем fallback URL
    url = `${currentBaseUrl}/sitemap-unknown.xml`;
  }
  
  // Убедимся, что все URL sitemap заканчиваются на .xml
  // (кроме тех, что уже содержат параметры или являются внешними ссылками)
  if (!url.includes('?') && !url.endsWith('.xml') && url.startsWith(currentBaseUrl)) {
    url = `${url}.xml`;
  }
  
  return {
    url: url,
    lastModified: new Date(sitemap.lastmod || Date.now()),
  };
});
    
    console.log(`Generated ${sitemaps.length} sitemap entries`);
    
    const sitemapIndexXml = generateSitemapIndexXml(sitemaps);
    
    return new NextResponse(sitemapIndexXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
    
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    
    // Fallback - только главная страница
    const fallbackSitemap = generateSitemapIndexXml([{
      url: `${currentBaseUrl}/sitemap-main.xml`,
      lastModified: new Date(),
    }]);
    
    return new NextResponse(fallbackSitemap, {
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache',
      },
    });
  }
}