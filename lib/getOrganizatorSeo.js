import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

export async function getOrganizatorSeo(slug) {
  try {
    const res = await axios.get(getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`));
    return res.data?.seo || {};
  } catch (err) {
    console.error('SEO organizator fetch error:', err);
    return {};
  }
}
