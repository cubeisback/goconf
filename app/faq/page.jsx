import { getBaseUrl } from '@/lib/getBaseUrl';
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
	const baseUrl = await getBaseUrl();

    return {
		title: seo?.title || 'Часто задаваемые вопросы',
		description: seo?.description || 'Ответы на популярные вопросы',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/faq/',
		},
		openGraph: {
			title: seo?.title,
			description: seo?.description,
			url: '/faq/',
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

export default async function FaqPage() {
  const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/faq/"), {
    next: { revalidate: 3600 },
  });

  const faqData = response.ok ? await response.json() : null;

  return <FaqClient initialData={faqData} />;
}