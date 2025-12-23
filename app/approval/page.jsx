
import { getApiUrl } from '@/functions/functions';
import { getBaseUrl } from '@/lib/getBaseUrl';
import ApprovalClient from './ApprovalClient';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=approval"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data?.seo;
	const baseUrl = getBaseUrl();

    return {
		title: seo?.title || 'Согласие на обработку персональных данных',
		description: seo?.description || 'Согласие на обработку персональных данных',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/approval/',
		},
		openGraph: {
			title: seo?.title || 'Согласие на обработку персональных данных',
			description: seo?.description || 'Согласие на обработку персональных данных',
			type: 'website',
			url: '/approval/',
		},
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Согласие на обработку персональных данных',
      description: 'Согласие на обработку персональных данных',
    };
  }
}

export default function AboutPage() {
  return <ApprovalClient />;
}