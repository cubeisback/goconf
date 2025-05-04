import axios from 'axios';

export async function getSeoDataFromParams(filterParams) {
  const defaultForm = {
    city: null,
    format: null,
    direction: null,
    dateStart: null,
    dateEnd: null,
    isOnline: false,
    isFree: false,
  };

  const filters = filterParams.reduce((acc, param) => {
    const [key, value] = param.split('_');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const requestBody = {
    ...defaultForm,
    ...filters,
    isOnline: filters.isOnline === 'true',
    isFree: filters.isFree === 'true',
  };

  try {
    const res = await axios.post(
      'https://dev.goconf.ru/wp-json/events/v2/filter/',
      requestBody,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return res.data.seo || {};
  } catch (err) {
    console.error('SEO fetch error:', err);
    return {};
  }
}
