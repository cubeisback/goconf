import OrgClient from './OrgClient';
import { getApiUrl } from '@/functions/functions';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/org/"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data.data?.seo;

    return {
      title: seo?.title || 'Организаторам',
      description: seo?.description || 'Страница организаторов мероприятий',
      openGraph: {
        title: seo?.title,
        description: seo?.description,
      },
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Организаторы',
      description: 'Страница организаторов мероприятий',
    };
  }
}

export default function OrgPage() {
  return <OrgClient />;
}