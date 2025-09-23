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

// app/[slug]/page.jsx (или соответствующий путь)
import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
import OrganizerClient from './OrganizerClient';

// Отключаем ISR, всегда свежие данные
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = params;

  let seo = {};
  try {
    seo = await getOrganizatorSeo(slug);
    // безопасный лог — только данные, без циклических ссылок
    console.log('✅ PROD SEO for', slug, seo);
  } catch (err) {
    console.error('❌ SEO fetch error:', err);
  }

  return {
    title: seo?.title || 'Организатор',
    description: seo?.description || 'Описание организатора',
    openGraph: {
      title: seo?.title || 'Организатор',
      description: seo?.description || 'Описание организатора',
    },
  };
}

export default async function OrganizerPage({ params }) {
  const seo = await getOrganizatorSeo(params.slug);

  return (
    <div>
      <OrganizerClient params={params} />

      {/* Временный дебаг-панель */}
      <div style={{ background: '#eee', padding: '10px', marginTop: '20px' }}>
        <h3>SEO DEBUG:</h3>
        <pre>{JSON.stringify(seo, null, 2)}</pre>
      </div>
    </div>
  );
}
