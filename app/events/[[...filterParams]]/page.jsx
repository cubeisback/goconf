// app/events/[[...filterParams]]/page.jsx

// import { Metadata } from 'next';
import EventsClient from './EventsClient';
import { getSeoDataFromParams } from '@/lib/getSeoData';

export async function generateMetadata({ params }) {
  const filterParams = params?.filterParams || [];
  const seo = await getSeoDataFromParams(filterParams);

  return {
    title: seo?.title || 'Все мероприятия',
    description: seo?.description || 'Каталог мероприятий',
    openGraph: {
      title: seo?.title,
      description: seo?.description,
    },
  };
}

export default function EventsPage({ params }) {
  return <EventsClient params={params} />;
}