
import { getApiUrl } from '@/functions/functions';
import { getBaseUrl } from '@/lib/getBaseUrl';
import OfferClient from './OfferClient';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=offer"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data?.seo;
	const baseUrl = getBaseUrl();

    return {
		title: seo?.title || 'Публичная оферта',
		description: seo?.description || 'Публичная оферта',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/offer/',
		},
		openGraph: {
			title: seo?.title || 'Публичная оферта',
			description: seo?.description || 'Публичная оферта',
			type: 'website',
			url: '/offer/',
		},
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Публичная оферта',
      description: 'Публичная оферта',
    };
  }
}

export default function AboutPage() {
  return <OfferClient />;
}