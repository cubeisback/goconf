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
	// На сервере (SSR)
	if (typeof window === "undefined") {
		// В development используем внешний API
		if (process.env.NODE_ENV === "development") {
			return `https://goconf.ru${url}`;
		}
		// В production на сервере используем localhost (API на том же сервере)
		return `http://localhost${url}`;
	}
  
	// На клиенте в development (localhost)
	if (window.location.hostname === "localhost") {
		return `https://goconf.ru${url}`;
	}
  
	// На клиенте в production
	return url;
};
