
import { getApiUrl } from '@/functions/functions';
import { getBaseUrl } from '@/lib/getBaseUrl';
import AgreementClient from './AgreementClient';

export async function generateMetadata() {
  try {
    const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=agreement"), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    
    const data = await response.json();
    const seo = data?.seo;
	const baseUrl = await getBaseUrl();

    return {
		title: seo?.title || 'Пользовательское соглашение',
		description: seo?.description || 'Пользовательское соглашение',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/agreement/',
		},
		openGraph: {
			title: seo?.title || 'Пользовательское соглашение',
			description: seo?.description || 'Пользовательское соглашение',
			type: 'website',
			url: '/agreement/',
		},
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return {
      title: 'Пользовательское соглашение',
      description: 'Пользовательское соглашение',
    };
  }
}

export default async function AgreementPage() {
  const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/page/?slug=agreement"), {
    next: { revalidate: 3600 },
  });

  const pageData = response.ok ? await response.json() : null;

  return <AgreementClient initialData={pageData} />;
}