import { getOrganizatorSeo } from '@/lib/getOrganizatorSeo';
import OrganizerClient from './OrganizerClient';
import { getApiUrl } from '@/functions/functions';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/lib/getBaseUrl';

// Не SSG: metadata/layout используют headers(), из-за этого на проде был 500
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

function normalizeSlug(slug) {
  if (!slug) return null;
  return Array.isArray(slug) ? slug[0] : slug;
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
    const organizerUrl = new URL(`/organizer/${slug}`, baseUrl).href;
    
    return {
      title: seo?.title || 'Организатор',
      description: seo?.description || 'Описание организатора',
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: organizerUrl,
      },
      openGraph: {
        title: seo?.title,
        description: seo?.description,
        url: organizerUrl,
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

async function getOrganizerData(slug) {
  try {
    const response = await fetch(
      getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${encodeURIComponent(slug)}`),
      { cache: 'no-store' }
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
      { cache: 'no-store' }
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
  try {
    const resolvedParams = await params;
    const slug = normalizeSlug(resolvedParams?.slug);

    if (!slug) {
      notFound();
    }
    
    const [organizerData, archiveData] = await Promise.all([
      getOrganizerData(slug),
      getArchiveEvents(slug)
    ]);
    
    if (!organizerData) {
      notFound();
    }
    
    return (
      <OrganizerClient 
        initialData={organizerData}
        initialArchiveEvents={archiveData?.items || []}
      />
    );
  } catch (error) {
    console.error('OrganizerPage error:', error);
    throw error;
  }
}
