import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

export async function getOrganizatorSeo(slug) {
  try {
    const apiUrl = getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`);
    console.log('API URL:', apiUrl);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Is server:', typeof window === 'undefined');
    
    const res = await axios.get(apiUrl);
    console.log('Response status:', res.status);
    console.log('Response data:', res.data);
    
    return res.data?.seo || {};
  } catch (err) {
    console.error('SEO organizator fetch error:', err.message);
    console.error('Request URL was:', getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`));
    return {};
  }
}
