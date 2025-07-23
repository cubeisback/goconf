import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

export async function getEventSeo(slug) {
  try {
    const res = await axios.get(getApiUrl(`/backend/wp-json/events/v2/single/?slug=${slug}`));
    return res.data?.seo || {};
  } catch (err) {
    console.error('SEO event fetch error:', err);
    return {};
  }
}
