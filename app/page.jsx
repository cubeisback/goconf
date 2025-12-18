import { getApiUrl } from '@/functions/functions';
import HomeClient from './HomeClient';

export async function generateMetadata() {
  try {
	const response = await fetch(getApiUrl("/backend/wp-json/pages/v2/home/"), {
	  next: { revalidate: 3600 }
	});
	
	if (!response.ok) {
	  throw new Error('Failed to fetch SEO data');
	}
	
	const data = await response.json();
	const seo = data?.seo;

	return {
	  title: seo?.title || 'Афиша бизнес-событий GoCONF',
	  description: seo?.description || 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
	  openGraph: {
		title: seo?.title,
		description: seo?.description,
	  },
	};
  } catch (error) {
	console.error('Error fetching SEO data:', error);
	return {
	  title: 'Афиша бизнес-событий GoCONF',
	  description: 'Делаем поиск профессиональных событий удобным, а привлечение участников эффективным',
	};
  }
}

export default function HomePage({ params }) {
  return <HomeClient params={params} />;
}