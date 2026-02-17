import { getApiUrl } from "@/functions/functions";
import axios from "axios";

export async function getEventSeo(rawSlug) {
	try {
		const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

		if (!slug) return {};

		const res = await fetch(
			getApiUrl(
				`/backend/wp-json/events/v2/single/?slug=${encodeURIComponent(slug)}`,
			),
			{
				next: { revalidate: 3600 },
			},
		);

		if (!res.ok) return {};

		const data = await res.json();
		return data?.seo || {};
	} catch (err) {
		console.error("SEO event fetch error:", err);
		return {};
	}
}
