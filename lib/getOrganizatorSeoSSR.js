import axios from "axios";

export async function getOrganizatorSeoSSR(slug) {
  try {
    // проверяем среду
    const isProd = process.env.NODE_ENV === "production";

    // в проде идём на боевой домен
    // локально — на localhost:8080 (или другой порт, если у тебя WP там крутится)
    const baseUrl = isProd
      ? "https://goconf.ru/backend"
      : "https://goconf.ru/backend";

    const res = await axios.get(`${baseUrl}/wp-json/org/v2/simple/?slug=${slug}`);
    return res.data?.seo || {};
  } catch (err) {
    console.error("SEO SSR fetch error:", err.message);
    return {};
  }
}
