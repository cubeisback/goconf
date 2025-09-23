import axios from "axios";

export async function getOrganizatorSeoSSR(slug) {
  try {
    if (typeof window === "undefined") {
      // SSR на проде
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // временно для обхода SSL
      const res = await axios.get(
        `https://goconf.ru/backend/wp-json/org/v2/simple/?slug=${slug}`
      );
      return res.data?.seo || {};
    }
    return {};
  } catch (err) {
    console.error("SEO SSR fetch error:", err);
    return {};
  }
}
