import { getEventSeo } from '@/lib/getEventSeo';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { getApiUrl } from '@/functions/functions';
import EventClient from './EventClient';
import { notFound } from 'next/navigation';

// Генерируем статические пути на этапе сборки
export async function generateStaticParams() {
  try {
    const response = await fetch(getApiUrl('/backend/wp-json/events/v2/list/'), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    // Преобразуем данные в массив slug'ов
    return data.map(event => ({
      slug: [event.slug || event.id],
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = params;
    const seo = await getEventSeo(slug);
    const baseUrl = getBaseUrl();
    
    if (!seo) {
      return {
        title: 'Мероприятие',
        description: 'Описание мероприятия',
      };
    }
    
    return {
      title: seo.title || 'Мероприятие',
      description: seo.description || 'Описание мероприятия',
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `/event/${slug}`,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: `/event/${slug}`,
        images: [
          {
            url: seo.image || `${baseUrl}/images/svg/logo.svg`,
            width: 928,
            height: 342,
            alt: seo.title || 'Изображение мероприятия',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title,
        description: seo.description,
        images: [seo.image || `${baseUrl}/images/svg/logo.svg`],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Мероприятие',
      description: 'Описание мероприятия',
    };
  }
}

// Получаем данные на сервере
async function getEventData(slug) {
  try {
    const response = await fetch(
      getApiUrl(`/backend/wp-json/events/v2/single/?slug=${slug}`),
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event data:', error);
    return null;
  }
}

async function getInterestingEvents() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/events/v2/interesting-events/"), {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching interesting events for event page:', error);
    return null;
  }
}

async function getSimilarEvents(id) {
  try {
    const response = await fetch(getApiUrl(`/backend/wp-json/events/v2/similar-events/?id=${id}`), {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return { items: [] };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar events:', error);
    return { items: [] };
  }
}

export default async function EventPage({ params }) {
  const { slug } = params;
  
  // Загружаем данные на сервере
  const eventData = await getEventData(slug);
  
  // Если данные не найдены, показываем 404
  if (!eventData) {
    notFound();
  }

  const [interestingEvents, similarEvents] = await Promise.all([
    getInterestingEvents(),
    getSimilarEvents(eventData.data?.ID),
  ]);
  
  // Передаем данные клиентскому компоненту
  return (
    <EventClient
      initialData={eventData}
      initialInterestingEvents={interestingEvents}
      initialSimilarEvents={similarEvents?.items || []}
    />
  );
}