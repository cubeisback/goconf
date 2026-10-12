import { css } from '@emotion/css';

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

// export const getApiUrl = (url) => {
// 	if (typeof window === "undefined") {
// 	  // SSR (на сервере) — всегда отдаём полный URL
// 	  return `https://goconf.ru${url}`;
// 	}
  
// 	if (window.location.hostname === "localhost") {
// 	  return `https://goconf.ru${url}`;
// 	}
  
// 	// На клиенте, если не localhost
// 	return url;
//   };

// export const getApiUrl = (url) => {
//   console.log("getApiUrl input:", url, "typeof window:", typeof window);

//   if (url.startsWith("http")) return url;

//   if (typeof window === "undefined") {
//     const full = `https://goconf.ru${url}`;
//     console.log("SSR ->", full);
//     return full;
//   }

//   if (window.location.hostname === "localhost") {
//     const full = `https://goconf.ru${url}`;
//     console.log("Local client ->", full);
//     return full;
//   }

//   console.log("Client prod ->", url);
//   return url;
// };
export const getApiUrl = (url) => {
  if (url.startsWith("http")) return url;
  return `https://goconf.ru${url}`; // или без www, как у тебя реально
};



// utils/videoUtils.js
export const detectVideoType = (input) => {
  if (!input || input.trim() === '') return null;

  const trimmedInput = input.trim();

  // Проверяем, является ли ввод iframe
  if (trimmedInput.startsWith('<iframe')) {
    return parseIframe(trimmedInput);
  }

  // Проверяем, является ли ввод ссылкой
  if (trimmedInput.startsWith('http')) {
    return parseUrl(trimmedInput);
  }

  return null;
};

const parseIframe = (iframe) => {
  // Извлекаем src из iframe
  const srcMatch = iframe.match(/src=["']([^"']+)["']/);
  if (!srcMatch) return null;

  const src = srcMatch[1];
  return parseSource(src);
};

const parseUrl = (url) => {
  return parseSource(url);
};

const parseSource = (src) => {
  // YouTube
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    const videoId = extractYouTubeId(src);
    if (!videoId) return null;
    
    return {
      type: 'youtube',
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      originalSrc: src
    };
  }

  // VK
  if (src.includes('vk.com') || src.includes('vkvideo.ru')) {
    const videoId = extractVKId(src);
    if (!videoId) return null;
    
    return {
      type: 'vk',
      id: videoId,
      embedUrl: `https://vk.com/video_ext.php?${videoId}`,
      originalSrc: src
    };
  }

  return null;
};

const extractYouTubeId = (url) => {
  // Регулярки для разных форматов YouTube
  const patterns = [
    /(?:youtube\.com\/embed\/)([\w\-_]+)/,
    /(?:youtube\.com\/watch\?v=)([\w\-_]+)/,
    /(?:youtu\.be\/)([\w\-_]+)/,
    /(?:youtube\.com\/.*[?&]v=)([\w\-_]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

const extractVKId = (url) => {
  // Для ссылок типа https://vk.com/video-127553155_456244359
  const vkPattern1 = /video-(\d+_\d+)/;
  const match1 = url.match(vkPattern1);
  if (match1) return `oid=-${match1[1].split('_')[0]}&id=${match1[1].split('_')[1]}`;

  // Для ссылок типа https://vkvideo.ru/video-127553155_456244359
  const vkPattern2 = /video\/(?:video-)?(\d+_\d+)/;
  const match2 = url.match(vkPattern2);
  if (match2) return `oid=-${match2[1].split('_')[0]}&id=${match2[1].split('_')[1]}`;

  // Для embed ссылок
  const vkPattern3 = /video_ext\.php\?(.+)/;
  const match3 = url.match(vkPattern3);
  if (match3) return match3[1];

  return null;
};

// components/VideoPlayer.jsx
export const VideoPlayer = ({ videoData }) => {
  if (!videoData) return null;

  const { type, embedUrl } = videoData;

  const commonIframeProps = {
    width: "100%",
    height: "500",
    className: css`
      display: block;
      width: 100%;
      height: 500px;

      @media (max-width: 575px) {
        height: 250px;
      }
    `,
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    title: "Video player"
  };

  if (type === 'youtube') {
    return (
      <div className="video-container">
        <iframe
          src={embedUrl}
          {...commonIframeProps}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  if (type === 'vk') {
    return (
      <div className="video-container">
        <iframe
          src={embedUrl}
          {...commonIframeProps}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return null;
};
