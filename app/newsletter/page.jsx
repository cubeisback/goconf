
import { getApiUrl } from '@/functions/functions';
import { getBaseUrl } from '@/lib/getBaseUrl';
import NewsletterClient from './NewsletterClient';

export async function generateMetadata() {
  try {
	const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=newsletter"), {
	  next: { revalidate: 3600 }
	});
	
	if (!response.ok) {
	  throw new Error('Failed to fetch SEO data');
	}
	
	const data = await response.json();
	const seo = data?.seo;
	const baseUrl = getBaseUrl();

	return {
		title: seo?.title || 'Согласие на получение рекламной рассылки',
		description: seo?.description || 'Согласие на получение рекламной рассылки',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/newsletter/',
		},
		openGraph: {
			title: seo?.title || 'Согласие на получение рекламной рассылки',
			description: seo?.description || 'Согласие на получение рекламной рассылки',
			type: 'website',
			url: '/newsletter/',
		},
	};
  } catch (error) {
	console.error('Error fetching SEO data:', error);
	return {
	  title: 'Согласие на получение рекламной рассылки',
	  description: 'Согласие на получение рекламной рассылки',
	};
  }
}

export default function AboutPage() {
  return <NewsletterClient />;
}