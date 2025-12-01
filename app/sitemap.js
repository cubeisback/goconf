// export const getApiUrl = (url) => {
//   if (url.startsWith("http")) return url;
//   return `https://goconf.ru${url}`;
// };

// const BASE_URL = 'https://goconf.ru';

// function getBaseUrl() {
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:3000';
//   }
//   return BASE_URL;
// }

// export default async function sitemap() {
//   console.log('=== SITEMAP GENERATION STARTED ===');
  
//   const currentBaseUrl = getBaseUrl();
//   console.log('Current base URL:', currentBaseUrl);
  
//   try {
//     // Получаем страницы из WordPress
//     console.log('Fetching WordPress pages...');
//     const wpPages = await getWordPressPages();
//     console.log('WordPress pages fetched:', wpPages.length);
    
//     // Получаем события из WordPress
//     console.log('Fetching WordPress events...');
//     const wpEvents = await getWordPressEvents();
//     console.log('WordPress events fetched:', wpEvents.length);
    
//     // Главная страница отдельно
//     const homepage = [
//       {
//         url: currentBaseUrl,
//         lastModified: new Date(),
//         changeFrequency: 'weekly',
//         priority: 1.0,
//       }
//     ];

//     // Страницы из WordPress
//     const pageRoutes = wpPages.map((page) => ({
//       url: `${currentBaseUrl}/${page.slug}`,
//       lastModified: new Date(page.modified),
//       changeFrequency: 'monthly',
//       priority: 0.6,
//     }));

//     // События из WordPress
//     const eventRoutes = wpEvents.map((event) => ({
//       url: `${currentBaseUrl}/event/${event.slug}`,
//       lastModified: new Date(event.modified),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//     }));

//     const allRoutes = [...homepage, ...pageRoutes, ...eventRoutes];
//     console.log('Total routes generated:', allRoutes.length);
//     console.log('=== SITEMAP GENERATION COMPLETED ===');
    
//     return allRoutes;
//   } catch (error) {
//     console.error('=== SITEMAP GENERATION ERROR ===', error);
//     // Возвращаем хотя бы главную страницу при ошибке
//     return [
//       {
//         url: getBaseUrl(),
//         lastModified: new Date(),
//         changeFrequency: 'monthly',
//         priority: 1,
//       },
//     ];
//   }
// }

// // Функция для получения страниц из WordPress REST API
// async function getWordPressPages() {
//   try {
//     const apiUrl = getApiUrl('/backend/wp-json/wp/v2/pages?per_page=100&_fields=slug,modified');
//     const res = await fetch(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
    
//     if (!res.ok) {
//       throw new Error(`Failed to fetch pages: ${res.status}`);
//     }
    
//     const pages = await res.json();
    
//     // Фильтруем главную страницу - она добавлена отдельно
//     const filteredPages = pages.filter(page => 
//       page.slug !== 'glavnaya' && 
//       page.slug !== 'home' && 
//       page.slug !== 'main'
//     );
    
//     console.log('Filtered pages:', filteredPages.length, 'from total:', pages.length);
    
//     return filteredPages;
//   } catch (error) {
//     console.error('Error fetching WordPress pages:', error);
//     return [];
//   }
// }

// // Функция для получения ВСЕХ событий из WordPress REST API с пагинацией
// async function getWordPressEvents() {
//   let allEvents = [];
//   let page = 1;
//   let hasMore = true;
  
//   try {
//     while (hasMore) {
//       const apiUrl = getApiUrl(`/backend/wp-json/wp/v2/events?page=${page}&per_page=100&_fields=slug,modified`);
//       console.log(`Fetching events page ${page}...`);
      
//       const res = await fetch(apiUrl, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!res.ok) {
//         if (res.status === 400) {
//           hasMore = false;
//           break;
//         }
//         throw new Error(`Failed to fetch events: ${res.status}`);
//       }
      
//       const events = await res.json();
      
//       if (events.length === 0 || events.length < 100) {
//         hasMore = false;
//       }
      
//       allEvents = allEvents.concat(events);
//       console.log(`Page ${page}: ${events.length} events, total: ${allEvents.length}`);
      
//       page++;
      
//       if (page > 50) {
//         console.warn('Too many events pages, stopping pagination');
//         break;
//       }
//     }
    
//     return allEvents;
//   } catch (error) {
//     console.error('Error fetching WordPress events:', error);
//     return [];
//   }
// }


// VARIANT 2

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
    // Получаем все данные из единого API
    console.log('Fetching unified sitemap data...');
    const sitemapItems = await getSitemapData();
    console.log('Sitemap items fetched:', sitemapItems.length);
    
    // Преобразуем данные в формат для sitemap.xml
    const routes = sitemapItems.map(item => {
      // Определяем URL
      let url;
      if (item.loc) {
        // Используем loc из API, но заменяем домен на текущий (для локальной разработки)
        url = item.loc.replace('https://goconf.ru', currentBaseUrl);
      } else if (item.slug === '') {
        // Главная страница
        url = currentBaseUrl;
      } else if (item.type === 'event') {
        // События
        url = `${currentBaseUrl}/event/${item.slug}`;
      } else {
        // Страницы
        url = `${currentBaseUrl}/${item.slug}`;
      }
      
      // Определяем дату последнего изменения
      let lastModified;
      if (item.lastmod) {
        lastModified = new Date(item.lastmod);
      } else {
        // Если даты нет, используем текущую
        lastModified = new Date();
      }
      
      // Определяем частоту обновления
      let changeFrequency;
      if (item.changefreq) {
        changeFrequency = item.changefreq;
      } else if (item.type === 'event') {
        changeFrequency = 'weekly';
      } else {
        changeFrequency = 'monthly';
      }
      
      // Определяем приоритет
      let priority;
      if (item.priority) {
        priority = item.priority;
      } else if (item.slug === '') {
        priority = 1.0; // Главная страница
      } else if (item.type === 'event') {
        priority = 0.8; // События
      } else {
        priority = 0.6; // Страницы
      }
      
      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    });
    
    // Фильтруем дубликаты и ненужные записи
    const filteredRoutes = routes.filter((route, index, self) => {
      // Убираем дубликаты по URL
      const isDuplicate = self.findIndex(r => r.url === route.url) !== index;
      if (isDuplicate) {
        console.log(`Removing duplicate: ${route.url}`);
        return false;
      }
      
      // Убираем записи без URL
      if (!route.url || route.url.trim() === '') {
        return false;
      }
      
      // Убираем главную страницу с slug 'glavnaya'
      if (route.url.includes('/glavnaya') || route.url.endsWith('/glavnaya')) {
        console.log(`Removing /glavnaya page: ${route.url}`);
        return false;
      }
      
      return true;
    });
    
    console.log('Total routes generated:', filteredRoutes.length);
    console.log('=== SITEMAP GENERATION COMPLETED ===');
    
    return filteredRoutes;
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

// Функция для получения данных из sitemap API
async function getSitemapData() {
  try {
    const apiUrl = getApiUrl('/backend/wp-json/sitemap/v2/get/');
    console.log('Fetching from:', apiUrl);
    
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Кэшируем на 1 час
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    
    // Проверяем структуру ответа
    if (data.success && data.data && Array.isArray(data.data.urls)) {
      return data.data.urls;
    } else {
      console.warn('Unexpected response structure:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return [];
  }
}