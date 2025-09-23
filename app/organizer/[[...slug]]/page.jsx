// import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
// import OrganizerClient from './OrganizerClient';

// export async function generateMetadata(props) {
// 	const { slug } = await props.params;
// 	const seo = await getOrganizatorSeo(slug);
  
// 	return {
// 	  title: seo?.title || 'Организатор',
// 	  description: seo?.description || 'Описание организатора',
// 	  openGraph: {
// 		title: seo?.title,
// 		description: seo?.description,
// 	  },
// 	};
//   }  

// export default function OrganizerPage({ params }) {
//   return <OrganizerClient params={params} />;
// }

import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
import OrganizerClient from './OrganizerClient';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const seo = await getOrganizatorSeo(slug);

  return {
    title: seo?.title || 'Организатор',
    description: seo?.description || 'Описание организатора',
    openGraph: {
      title: seo?.title,
      description: seo?.description,
    },
  };
}

export default function OrganizerPage({ params }) {
  return <OrganizerClient params={params} />;
}
