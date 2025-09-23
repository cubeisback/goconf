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

import { getOrganizatorSeoSSR } from '@/lib/getOrganizatorSeoSSR';
import OrganizerClient from './OrganizerClient';

export async function generateMetadata(props) {
  const { slug } = props.params;

  // SSR-запрос через локальный сервер
  const seo = await getOrganizatorSeoSSR(slug);

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