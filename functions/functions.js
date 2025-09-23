export function formatDate(dateString) {
  if (!dateString) return ""; // или вернуть null

  const [day, month, year] = dateString.split('.');

  // Проверяем что все части есть
  if (!day || !month || !year) return "";

  // month в JS начинается с 0 → поэтому -1
  const date = new Date(year, month - 1, day);

  if (isNaN(date)) return ""; // защита от Invalid Date

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date).replace(' г.', '');
}

export function formatPrice(price) {
  const str = String(price).replace(/\D/g, '');
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function decodeHtmlEntities(str) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.documentElement.textContent;
}


// export const getApiUrl = (url) => {
// 	if (typeof window !== "undefined" && window.location.hostname === "localhost") {
// 	  return `https://dev.goconf.ru${url}`;
// 	}
// 	return url;
// };

export const getApiUrl = (url) => {
	if (typeof window === "undefined") {
	  // SSR (на сервере) — всегда отдаём полный URL
	//   return `https://goconf.ru${url}`;
	  return `http://localhost:8080${url.replace(/^\/backend/, '')}`;
	}
  
	if (window.location.hostname === "localhost") {
	  return `https://goconf.ru${url}`;
	}
  
	// На клиенте, если не localhost
	return url;
  };
  
  