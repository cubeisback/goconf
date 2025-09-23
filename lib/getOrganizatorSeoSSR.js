// lib/getOrganizatorSeoSSR.js
import axios from 'axios';

export async function getOrganizatorSeoSSR(slug) {
  try {
    let url;

    if (process.env.NODE_ENV === 'production') {
      // На проде через локальный Apache
      url = `http://127.0.0.1:8080/backend/wp-json/org/v2/simple/?slug=${slug}`;
    } else {
      // Локально через стандартный URL
      url = `https://goconf.ru/backend/wp-json/org/v2/simple/?slug=${slug}`;
    }

    const res = await axios.get(url);
    return res.data?.seo || {};
  } catch (err) {
    console.error('SEO SSR fetch error:', err);
    return {};
  }
}
