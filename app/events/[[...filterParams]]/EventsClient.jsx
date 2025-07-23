'use client';

import { useTheme } from '@emotion/react';
import { css, cx } from '@emotion/css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { Breadcrumbs, breadcrumbs, Container, input, pagePromo, pageTitle } from "@/styles/ui";
import { Filter } from '@/components/Filter/Filter';
import { EventsFiltered } from '@/components/EventsFiltered';
import { Form } from '@/components/Form';
import SearchIcon from "@/public/images/svg/search.svg";
import { getApiUrl } from '@/functions/functions';

export default function EventsClient({ params }) {
	const theme = useTheme();
	const [events, setEvents] = useState(null);
	const [total, setTotal] = useState(null);
	const [pageH1, setPageH1] = useState(null);
	const [pageText, setPageText] = useState(null);
	const [seoTitle, setSeoTitle] = useState(null);
	const [seoDescription, setSeoDescription] = useState(null);
	const [query, setQuery] = useState('');
	const [formatItems, setFormatItems] = useState(null);

	useEffect(() => {
		axios
			.get(getApiUrl("/backend/wp-json/events/v2/popular-formats/"))
			.then((response) => {
				setFormatItems(response.data.items);
			})
			.catch(console.error);
	}, []);

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://dev.goconf.ru/wp-json/events/v2/search/",
				{ search: query }
			);
			setEvents(response.data.events);
			setTotal(response.data.total);
			setSeoTitle(response.data.seo.title);
			setSeoDescription(response.data.seo.description);
		} catch (error) {
			console.error('Ошибка при поиске:', error);
		}
	}, [query]);

	return (
		<>
			<div className={pagePromo}>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<p>{pageH1}</p>
					</Breadcrumbs>
					<h1 className={pageTitle}>{pageH1}</h1>

					<form onSubmit={handleSubmit} className={css`
						background-color: #fff;
						border-radius: 28px;
						padding: 14px 16px;
						width: 608px;
						font-size: 14px;
						line-height: 1.16;
						display: flex;
						gap: 8px;
						align-items: center;

						@media(max-width: 640px) {
							width: 100%;
						}

						& > button {
							background: transparent;
							display: flex;
						}
					`}>
						<input
							className={cx(input, css`padding: 0 4px;`)}
							type="text"
							placeholder='Поиск по мероприятиям'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type='submit'>
							<SearchIcon className={css`cursor: pointer;`} />
						</button>
					</form>
				</Container>
			</div>

			<div className={css`
				position: relative;

				&::before {
					content: '';
					position: absolute;
					left: -100vw;
					top: 0;
					width: 200vw;
					height: 80px;
					background-color: #F5F7FA;
					z-index: -1;
				}
			`}>
				<Container>
					<Filter
						full
						setEvents={setEvents}
						setTotal={setTotal}
						setPageH1={setPageH1}
						setPageText={setPageText}
						setQuery={setQuery}
						setSeoDescription={setSeoDescription}
						setSeoTitle={setSeoTitle}
					/>
						
					{/* {total && <p className={css`padding-bottom: 24px;`}>Найдено событий: {total}</p>} */}
					<p className={css`padding-bottom: 24px;`}>{total ? `Найдено событий: ${total}` : 'По заданным параметрам событий не найдено'}</p>

					<div className={css`
						display: flex;
						gap: 16px;
						flex-wrap: wrap;

						a {
							padding: 7px 12px 9px;
							border-radius: 8px;
							background-color: #F5F7FA;
							font-size: 14px;
							font-weight: 500;
							cursor: pointer;
							transition: ${theme.transition};

							&:hover {
								background-color: ${theme.colors.green};
							}

							br {
								display: none;
							}

							&.active {
								background-color: ${theme.colors.green};
							}
						}
					`}>
						{formatItems && formatItems.map((item, index) => (
							<Link
								key={index}
								href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`}
								dangerouslySetInnerHTML={{ __html: item.name }}
							/>
						))}
					</div>
				</Container>

				<EventsFiltered onPage events={events} total={total} />

				<div className={css`
					padding: 64px 0;
					background-color: #F5F7FA;
				`}>
					<Container>
						<div className={css`
							display: flex;
							flex-direction: column;
							gap: 16px;

							p {
								color: #47474D;
							}
						`} dangerouslySetInnerHTML={{ __html: pageText }} />
					</Container>
				</div>

				<Form />
			</div>
		</>
	);
}
