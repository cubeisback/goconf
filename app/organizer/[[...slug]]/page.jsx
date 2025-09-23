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

export default async function OrganizerPage({ params }) {
  const seo = await getOrganizatorSeo(params.slug);

  return (
    <div>
      <OrganizerClient params={params} />

      {/* Временный дебаг */}
      <div style={{ background: '#eee', padding: '10px', marginTop: '20px' }}>
        <h3>SEO DEBUG:</h3>
        <pre>{JSON.stringify(seo, null, 2)}</pre>
      </div>
    </div>
  );
}