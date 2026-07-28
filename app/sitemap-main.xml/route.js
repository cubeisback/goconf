import { NextResponse } from 'next/server';

export const getApiUrl = (url) => {
  if (url.startsWith("http")) return url;
  return `https://goconf.ru${url}`;
};

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://goconf.ru';
  
  try {
    const apiUrl = getApiUrl('/backend/wp-json/sitemap/v2/main');
    const res = await fetch(apiUrl, { cache: 'no-store' });
    
    if (!res.ok) throw new Error('API error');
    
    const data = await res.json();
    
    if (!data.success || !data.data?.urls) {
      throw new Error('Invalid response');
    }
    
    const urls = data.data.urls.map(item => ({
      url: item.loc 
        ? item.loc.replace('https://goconf.ru', baseUrl)
        : `${baseUrl}/${item.slug || ''}`,
      lastModified: new Date(item.lastmod || Date.now()),
      changeFrequency: item.changefreq || 'monthly',
      priority: item.priority || 0.5,
    }));
    
    const sitemap = generateSitemapXml(urls);
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
    
  } catch (error) {
    const fallback = generateSitemapXml([{
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    }]);
    
    return new NextResponse(fallback, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}

function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
}