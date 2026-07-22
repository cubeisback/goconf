import { getApiUrl } from '@/functions/functions';
import HomeClient from './HomeClient';
import { getBaseUrl } from '@/lib/getBaseUrl';

export async function generateMetadata() {
  try {
	const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/home/"), {
	  next: { revalidate: 3600 }
	});
	
	if (!response.ok) {
	  throw new Error('Failed to fetch SEO data');
	}
	
	const data = await response.json();
	const seo = data?.seo;
	const baseUrl = await getBaseUrl();

	return {
		title: seo?.title || 'Афиша бизнес-событий GoCONF',
		description: seo?.description || 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/',
		},
		openGraph: {
			title: seo?.title,
			description: seo?.description,
			url: '/',
		},
	};
  } catch (error) {
	console.error('Error fetching SEO data:', error);
	return {
	  title: 'Афиша бизнес-событий GoCONF',
	  description: 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
	};
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
    console.error('Error fetching interesting events:', error);
    return null;
  }
}

async function getPopularFormats() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/events/v2/popular-formats/"), {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching popular formats:', error);
    return [];
  }
}

async function getNearEventsFirstPage() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/events/v2/filter/"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ load_page: 1 }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return { events: [], total: 0 };
    }

    const data = await response.json();
    return {
      events: data.events || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Error fetching near events:', error);
    return { events: [], total: 0 };
  }
}

export default async function HomePage() {
  const [interestingEvents, popularFormats, nearEventsData] = await Promise.all([
    getInterestingEvents(),
    getPopularFormats(),
    getNearEventsFirstPage(),
  ]);

  const initialData = {
    interestingEvents,
    popularFormats,
    nearEvents: nearEventsData.events,
    nearEventsTotal: nearEventsData.total,
  };

  return <HomeClient initialData={initialData} />;
}