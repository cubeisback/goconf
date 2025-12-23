
import { getApiUrl } from '@/functions/functions';
import { getBaseUrl } from '@/lib/getBaseUrl';
import PrivacyClient from './PrivacyClient';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=privacy"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data?.seo;
	const baseUrl = getBaseUrl();

    return {
		title: seo?.title || 'Политика конфиденциальности',
		description: seo?.description || 'Политика конфиденциальности',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/privacy/',
		},
		openGraph: {
			title: seo?.title || 'Политика конфиденциальности',
			description: seo?.description || 'Политика конфиденциальности',
			type: 'website',
			url: '/privacy/',
		},
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Политика конфиденциальности',
      description: 'Политика конфиденциальности',
    };
  }
}

export default function AboutPage() {
  return <PrivacyClient />;
}