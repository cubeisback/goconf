import axios from "axios";
import ClientEvents from "./ClientEvents";
import { getApiUrl } from "@/functions/functions";

export async function generateMetadata({ params }) {
  const slug = params.filterParams?.join("/") || "";

  try {
    const response = await axios.post(
      getApiUrl("/backend/wp-json/events/v2/filter/"),
      { slug },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const seo = response.data?.seo || {};
    return {
      title: seo.title || "GoConf",
      description: seo.description || "События GoConf",
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: getApiUrl(`/events/${slug}`),
        siteName: "GoConf",
        type: "website",
      },
    };
  } catch (err) {
    console.error("generateMetadata error:", err.message);
    return {
      title: "GoConf",
      description: "События GoConf",
    };
  }
}

export default async function EventsPage({ params }) {
  const slug = params.filterParams?.join("/") || "";

  try {
    const response = await axios.post(
      getApiUrl("/backend/wp-json/events/v2/filter/"),
      { slug },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { events, total, h1, text, seo } = response.data;

    const formatsRes = await axios.get(getApiUrl("/backend/wp-json/events/v2/popular-formats/"));
    const formatItems = formatsRes.data.items;

    return (
      <ClientEvents
        events={events}
        total={total}
        pageH1={h1}
        pageText={text}
        formatItems={formatItems}
        slug={slug}
        initialSeo={seo}
      />
    );
  } catch (err) {
    console.error("SSR EventsPage error:", err.message);
    return <div>Ошибка загрузки данных</div>;
  }
}
