import { getEventSeo } from "@/lib/getEventSeo";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { getApiUrl } from "@/functions/functions";
import EventClient from "./EventClient";
import { notFound } from "next/navigation";

// Разрешаем динамические параметры
export const dynamicParams = true;

// ISR – обновление раз в час
export const revalidate = 3600;

// Нормализация slug для [[...slug]]
function normalizeSlug(slug) {
	if (!slug) return null;
	return Array.isArray(slug) ? slug[0] : slug;
}

// ---------------- METADATA ----------------

export async function generateMetadata({ params }) {
	try {
		const slug = normalizeSlug(params.slug);
		if (!slug) return {};

		const seo = await getEventSeo(slug);
		const baseUrl = await getBaseUrl();

		if (!seo) {
			return {
				title: "Мероприятие",
				description: "Описание мероприятия",
			};
		}

		return {
			title: seo.title || "Мероприятие",
			description: seo.description || "Описание мероприятия",
			metadataBase: new URL(baseUrl),
			alternates: {
				canonical: `/event/${slug}`,
			},
			openGraph: {
				title: seo.title,
				description: seo.description,
				url: `/event/${slug}`,
				images: [
					{
						url: seo.image || `${baseUrl}/images/svg/logo.svg`,
						width: 928,
						height: 342,
						alt: seo.title || "Изображение мероприятия",
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title: seo.title,
				description: seo.description,
				images: [seo.image || `${baseUrl}/images/svg/logo.svg`],
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Мероприятие",
			description: "Описание мероприятия",
		};
	}
}

// ---------------- API ----------------

async function getEventData(slug) {
	try {
		const response = await fetch(
			getApiUrl(
				`/backend/wp-json/events/v2/single/?slug=${encodeURIComponent(
					slug,
				)}`,
			),
			{
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) return null;

		return await response.json();
	} catch (error) {
		console.error("Error fetching event data:", error);
		return null;
	}
}

async function getInterestingEvents() {
	try {
		const response = await fetch(
			getApiUrl("/backend/wp-json/events/v2/interesting-events/"),
			{
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) return null;

		return await response.json();
	} catch (error) {
		console.error("Error fetching interesting events:", error);
		return null;
	}
}

async function getSimilarEvents(id) {
	try {
		const response = await fetch(
			getApiUrl(`/backend/wp-json/events/v2/similar-events/?id=${id}`),
			{
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) return { items: [] };

		return await response.json();
	} catch (error) {
		console.error("Error fetching similar events:", error);
		return { items: [] };
	}
}

// ---------------- PAGE ----------------

export default async function EventPage({ params }) {
	const slug = normalizeSlug(params.slug);

	if (!slug) {
		notFound();
	}

	const eventData = await getEventData(slug);

	if (!eventData) {
		notFound();
	}

	const [interestingEvents, similarEvents] = await Promise.all([
		getInterestingEvents(),
		getSimilarEvents(eventData?.data?.ID),
	]);

	return (
		<EventClient
			initialData={eventData}
			initialInterestingEvents={interestingEvents}
			initialSimilarEvents={similarEvents?.items || []}
		/>
	);
}
