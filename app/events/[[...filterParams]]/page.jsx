import { getBaseUrl } from '@/lib/getBaseUrl';
import EventsClient from './EventsClient';
import { getSeoDataFromParams } from '@/lib/getSeoData';

export async function generateMetadata({ params }) {
  const filterParams = params?.filterParams || [];
  const seo = await getSeoDataFromParams(filterParams);
  const baseUrl = getBaseUrl();

  let canonicalPath = '/events';
  if (filterParams.length > 0) {
    canonicalPath += '/' + filterParams.join('/') + '/';
  } else {
    canonicalPath += '/';
  }

  return {
    title: seo?.title || 'Все мероприятия',
    description: seo?.description || 'Каталог мероприятий',
	metadataBase: new URL(baseUrl),
	alternates: {
		canonical: canonicalPath,
	},
    openGraph: {
		title: seo?.title,
		description: seo?.description,
		url: canonicalPath,
    },
  };
}

export default function EventsPage({ params }) {
  return <EventsClient params={params} />;
}