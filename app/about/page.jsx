import { getApiUrl } from '@/functions/functions';
import AboutClient from './AboutClient';
import { getBaseUrl } from '@/lib/getBaseUrl';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/about/"), {
      next: { revalidate: 3600 } // Кэшируем на 1 час
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data.data?.seo;
	const baseUrl = await getBaseUrl();

    return {
		title: seo?.title || 'О проекте GoCONF',
		description: seo?.description || 'Самые интересные бизнес-мероприятия различных форматов от форумов до бизнес-семинаров по всей России',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/about/',
		},
		openGraph: {
			title: seo?.title || 'О проекте GoCONF',
			description: seo?.description || 'Самые интересные бизнес-мероприятия различных форматов от форумов до бизнес-семинаров по всей России',
			type: 'website',
			url: '/about/',
		},
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'О проекте GoCONF',
      description: 'Самые интересные бизнес-мероприятия различных форматов от форумов до бизнес-семинаров по всей России',
    };
  }
}

export default async function AboutPage() {
  const [aboutResponse, orgResponse] = await Promise.all([
    fetch(getApiUrl("/backend/wp-json/pages/v2/about/"), {
      next: { revalidate: 3600 },
    }),
    fetch(getApiUrl("/backend/wp-json/pages/v2/org/"), {
      next: { revalidate: 3600 },
    }),
  ]);

  const aboutData = aboutResponse.ok ? await aboutResponse.json() : null;
  const orgsData = orgResponse.ok ? await orgResponse.json() : null;

  return <AboutClient initialData={aboutData} orgsData={orgsData} />;
}
