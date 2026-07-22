import { getBaseUrl } from '@/lib/getBaseUrl';
import EventsClient from './EventsClient';
import { getSeoDataFromParams } from '@/lib/getSeoData';
import { getApiUrl } from '@/functions/functions';

// Функция для получения данных страницы (SEO + текст + h1)
async function getPageData(filterParams = []) {
  const defaultForm = {
    city: null,
    format: null,
    direction: null,
    dateStart: null,
    dateEnd: null,
    isOnline: false,
    isFree: false,
  };

  // Преобразуем filterParams в объект фильтров
  const filters = filterParams.reduce((acc, param) => {
    const [key, value] = param.split('_');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const requestBody = {
    ...defaultForm,
    ...filters,
    isOnline: filters.isOnline === 'true',
    isFree: filters.isFree === 'true',
  };

  try {
    const response = await fetch(
      getApiUrl('/backend/wp-json/events/v2/filter/'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch page data');
    }
    
    const data = await response.json();
    console.log('Events filter response (SSR):', data);
    
    return {
      h1: data.h1 || 'Все мероприятия', // Используем h1 из ответа API
      pageText: data.text || '',
      events: data.events || [],
      pastEvents: data.past_events || [],
      total: data.total || 0,
      seo: data.seo || {},
      // Добавляем fallback на случай если h1 нет в ответе
      pageH1: data.h1 || (data.seo?.title ? data.seo.title : 'Все мероприятия')
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    
    return {
      h1: 'Все мероприятия',
      pageText: '<p>Каталог мероприятий. Найдите подходящее событие для себя!</p>',
      events: [],
      pastEvents: [],
      total: 0,
      seo: {},
      pageH1: 'Все мероприятия'
    };
  }
}

// Функция для получения популярных форматов
async function getFormatItems() {
  try {
    const response = await fetch(
      getApiUrl('/backend/wp-json/events/v2/popular-formats/'),
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching format items:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const filterParams = params?.filterParams || [];
  const seo = await getSeoDataFromParams(filterParams);
  const baseUrl = await getBaseUrl();

  let canonicalPath = '/events';
  if (filterParams.length > 0) {
    canonicalPath += '/' + filterParams.join('/');
  } else {
    canonicalPath += '';
  }

  return {
    title: seo?.title || 'Все мероприятия',
    description: seo?.description || 'Каталог мероприятий',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: canonicalPath,
    },
  };
}

export default async function EventsPage({ params }) {
  const filterParams = params?.filterParams || [];
  
  // Получаем данные на сервере
  const pageData = await getPageData(filterParams);
  const formatItems = await getFormatItems();
  
  // Формируем initialData для клиента
  const initialData = {
    // Данные для блоков (будут в клиентском компоненте)
    h1: pageData.h1, // Используем h1 из API
    pageH1: pageData.h1, // Для обратной совместимости
    pageText: pageData.pageText,
    
    // Данные для работы компонента
    initialEvents: pageData.events,
    initialPastEvents: pageData.pastEvents,
    initialTotal: pageData.total,
    initialSeo: pageData.seo,
    
    // Дополнительные данные
    filterParams,
    formatItems,
  };
  
  return <EventsClient params={params} initialData={initialData} />;
}