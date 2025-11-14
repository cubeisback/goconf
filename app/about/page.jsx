
import { getApiUrl } from '@/functions/functions';
import AboutClient from './AboutClient';

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

    return {
      title: seo?.title || 'О проекте GoCONF',
      description: seo?.description || 'Самые интересные бизнес-мероприятия различных форматов от форумов до бизнес-семинаров по всей России',
      openGraph: {
        title: seo?.title || 'О проекте GoCONF',
        description: seo?.description || 'Самые интересные бизнес-мероприятия различных форматов от форумов до бизнес-семинаров по всей России',
        type: 'website',
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

export default function AboutPage() {
  return <AboutClient />;
}