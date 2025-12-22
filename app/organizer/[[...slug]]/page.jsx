import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
import OrganizerClient from './OrganizerClient';
import { getBaseUrl } from '@/lib/getBaseUrl';

export async function generateMetadata(props) {
	const { slug } = await props.params;
	const seo = await getOrganizatorSeo(slug);
	const baseUrl = getBaseUrl();
  
	return {
		title: seo?.title || 'Организатор',
		description: seo?.description || 'Описание организатора',
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: `/organizer/${slug}`,
		},
		openGraph: {
			title: seo?.title,
			description: seo?.description,
			url: `/organizer/${slug}`,
		},
	};
  }  

export default function OrganizerPage({ params }) {
  return <OrganizerClient params={params} />;
}