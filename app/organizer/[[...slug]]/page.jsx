import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
import OrganizerClient from './OrganizerClient';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { getApiUrl } from '@/functions/functions';
import { notFound } from 'next/navigation';

function normalizeSlug(slug) {
  if (!slug) return null;
  return Array.isArray(slug) ? slug[0] : slug;
}

// Генерируем статические пути на этапе сборки
export async function generateStaticParams() {
  try {
    const response = await fetch(getApiUrl('/backend/wp-json/org/v2/list/'), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    // Преобразуем данные в массив slug'ов
    return data.map(organizer => ({
      slug: [organizer.slug || organizer.id],
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = normalizeSlug(resolvedParams?.slug);
    if (!slug) {
      return {
        title: 'Организатор',
        description: 'Описание организатора',
      };
    }

    const seo = await getOrganizatorSeo(slug);
    const baseUrl = await getBaseUrl();
    
    if (!seo) {
      return {
        title: 'Организатор',
        description: 'Описание организатора',
      };
    }
    
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Организатор',
      description: 'Описание организатора',
    };
  }
}

// Получаем данные на сервере
async function getOrganizerData(slug) {
  try {
    const response = await fetch(
      getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${encodeURIComponent(slug)}`),
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching organizer data:', error);
    return null;
  }
}

async function getArchiveEvents(slug) {
  try {
    const response = await fetch(
      getApiUrl(`/backend/wp-json/org/v2/archive/?slug=${encodeURIComponent(slug)}`),
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      return { items: [] };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching archive events:', error);
    return { items: [] };
  }
}

export default async function OrganizerPage({ params }) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);

  if (!slug) {
    notFound();
  }
  
  // Загружаем данные на сервере
  const [organizerData, archiveData] = await Promise.all([
    getOrganizerData(slug),
    getArchiveEvents(slug)
  ]);
  
  // Если основные данные организатора не найдены, показываем 404
  if (!organizerData) {
    notFound();
  }
  
  // Передаем данные клиентскому компоненту
  return (
    <OrganizerClient 
      initialData={organizerData}
      initialArchiveEvents={archiveData?.items || []}
    />
  );
}
