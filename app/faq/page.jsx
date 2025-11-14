import FaqClient from './FaqClient';
import { getApiUrl } from '@/functions/functions';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/faq/"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data.data?.seo;

    return {
      title: seo?.title || 'Часто задаваемые вопросы',
      description: seo?.description || 'Ответы на популярные вопросы',
      openGraph: {
        title: seo?.title,
        description: seo?.description,
      },
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Часто задаваемые вопросы',
      description: 'Ответы на популярные вопросы',
    };
  }
}

export default function FaqPage() {
  return <FaqClient />;
}