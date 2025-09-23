import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

// export async function getOrganizatorSeo(slug) {
//   try {
//     const res = await axios.get(getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`));
// 	console.log('hui ', res)
//     return res.data?.seo || {};
//   } catch (err) {
//     console.error('SEO organizator fetch error:', err);
//     return {};
//   }
// }

export async function getOrganizatorSeo(slug) {
  try {
    const url = getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`);
    const res = await axios.get(url);
    console.log('SEO fetch:', url, res.data); // дебаг

    return res.data?.seo || {};
  } catch (err) {
    console.error('SEO fetch error:', err.message);
    return {};
  }
}