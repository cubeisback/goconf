export const getApiUrl = (url) => {
  if (url.startsWith("http")) return url;
  return `https://goconf.ru${url}`;
};

const BASE_URL = 'https://goconf.ru';

function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return BASE_URL;
}

export default async function sitemap() {
  console.log('=== SITEMAP GENERATION STARTED ===');
  
  const currentBaseUrl = getBaseUrl();
  console.log('Current base URL:', currentBaseUrl);
  
  try {
    // Получаем страницы из WordPress
    console.log('Fetching WordPress pages...');
    const wpPages = await getWordPressPages();
    console.log('WordPress pages fetched:', wpPages.length);
    
    // Получаем события из WordPress
    console.log('Fetching WordPress events...');
    const wpEvents = await getWordPressEvents();
    console.log('WordPress events fetched:', wpEvents.length);
    
    // Главная страница отдельно
    const homepage = [
      {
        url: currentBaseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      }
    ];

    // Страницы из WordPress
    const pageRoutes = wpPages.map((page) => ({
      url: `${currentBaseUrl}/${page.slug}`,
      lastModified: new Date(page.modified),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // События из WordPress
    const eventRoutes = wpEvents.map((event) => ({
      url: `${currentBaseUrl}/event/${event.slug}`,
      lastModified: new Date(event.modified),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const allRoutes = [...homepage, ...pageRoutes, ...eventRoutes];
    console.log('Total routes generated:', allRoutes.length);
    console.log('=== SITEMAP GENERATION COMPLETED ===');
    
    return allRoutes;
  } catch (error) {
    console.error('=== SITEMAP GENERATION ERROR ===', error);
    // Возвращаем хотя бы главную страницу при ошибке
    return [
      {
        url: getBaseUrl(),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
    ];
  }
}

// Функция для получения страниц из WordPress REST API
async function getWordPressPages() {
  try {
    const apiUrl = getApiUrl('/backend/wp-json/wp/v2/pages?per_page=100&_fields=slug,modified');
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch pages: ${res.status}`);
    }
    
    const pages = await res.json();
    
    // Фильтруем главную страницу - она добавлена отдельно
    const filteredPages = pages.filter(page => 
      page.slug !== 'glavnaya' && 
      page.slug !== 'home' && 
      page.slug !== 'main'
    );
    
    console.log('Filtered pages:', filteredPages.length, 'from total:', pages.length);
    
    return filteredPages;
  } catch (error) {
    console.error('Error fetching WordPress pages:', error);
    return [];
  }
}

// Функция для получения ВСЕХ событий из WordPress REST API с пагинацией
async function getWordPressEvents() {
  let allEvents = [];
  let page = 1;
  let hasMore = true;
  
  try {
    while (hasMore) {
      const apiUrl = getApiUrl(`/backend/wp-json/wp/v2/events?page=${page}&per_page=100&_fields=slug,modified`);
      console.log(`Fetching events page ${page}...`);
      
      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`Failed to fetch events: ${res.status}`);
      }
      
      const events = await res.json();
      
      if (events.length === 0 || events.length < 100) {
        hasMore = false;
      }
      
      allEvents = allEvents.concat(events);
      console.log(`Page ${page}: ${events.length} events, total: ${allEvents.length}`);
      
      page++;
      
      if (page > 50) {
        console.warn('Too many events pages, stopping pagination');
        break;
      }
    }
    
    return allEvents;
  } catch (error) {
    console.error('Error fetching WordPress events:', error);
    return [];
  }
}