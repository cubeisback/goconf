import { getEventSeo } from '@/lib/getEventSeo';
import EventClient from './EventClient';

export async function generateMetadata(props) {
	const { slug } = await props.params;
	const seo = await getEventSeo(slug);
  
	return {
	  title: seo?.title || 'Мероприятие',
	  description: seo?.description || 'Описание мероприятия',
	  openGraph: {
		title: seo?.title,
		description: seo?.description,
	  },
	};
  }  

export default function EventPage({ params }) {
  return <EventClient params={params} />;
}