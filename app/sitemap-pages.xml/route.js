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

export async function GET() {
  const currentBaseUrl = getBaseUrl();
  
  console.log('Generating pages sitemap');
  
  try {
    const apiUrl = getApiUrl('/backend/wp-json/sitemap/v2/pages');
    const res = await fetch(apiUrl, {
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    
    if (!data.success || !data.data?.urls) {
      throw new Error('Invalid response');
    }
    
    // Фильтруем главную страницу (glavnaya) и преобразуем
    const urls = data.data.urls
      .filter(item => item.slug !== 'glavnaya')
      .map(item => ({
        url: item.loc 
          ? item.loc.replace('https://goconf.ru', currentBaseUrl)
          : item.slug === ''
            ? currentBaseUrl
            : `${currentBaseUrl}/${item.slug}`,
        lastModified: new Date(item.lastmod || Date.now()),
        changeFrequency: item.changefreq || 'monthly',
        priority: item.priority || 0.6,
      }));
    
    console.log(`Generated ${urls.length} page URLs`);
    
    const sitemapXml = generateSitemapXml(urls);
    
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
    
  } catch (error) {
    console.error('Error generating pages sitemap:', error);
    
    const fallbackSitemap = generateSitemapXml([{
      url: currentBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    }]);
    
    return new NextResponse(fallbackSitemap, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}