import { getApiUrl } from '@/functions/functions';

export async function getOrganizatorSeo(slug) {
  try {
    const res = await fetch(getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`), {
      next: { revalidate: 60 }, // кэш на 60 сек для SSR
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    return data?.seo || {};
  } catch (err) {
    console.error('SEO organizator fetch error:', err);
    return {};
  }
}
