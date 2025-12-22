import { getEventSeo } from '@/lib/getEventSeo';
import EventClient from './EventClient';
import { getBaseUrl } from '@/lib/getBaseUrl';

export async function generateMetadata(props) {
	const { slug } = await props.params;
	const seo = await getEventSeo(slug);
	const baseUrl = getBaseUrl();
  
	return {
		title: seo?.title || 'Мероприятие',
		description: seo?.description || 'Описание мероприятия',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: `/event/${slug}`,
		},
		openGraph: {
			title: seo?.title,
			description: seo?.description,
			url: `/event/${slug}`,
			images: [
				{
					url: seo?.image || `${baseUrl}/images/svg/logo.svg`,
					width: 928,
					height: 342,
					alt: seo?.title || 'Изображение мероприятия',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: seo?.title,
			description: seo?.description,
			images: [seo?.image || `${baseUrl}/images/svg/logo.svg`],
		},
	};
  }  

export default function EventPage({ params }) {
  return <EventClient params={params} />;
}