"use client"

import { breadcrumbs, container, input, pagePromo, pageTitle } from "@/styles/ui";
import { Filter } from '@/components/Filter/Filter';
import { css, cx } from '@emotion/css';
import { MainEvents } from '@/components/MainEvents';
import { Form } from '@/components/Form';
// import SearchIcon from "@/public/images/svg/search.svg";
// const SearchIcon = () => (
// 	<img src="@/public/images/svg/search.svg" alt="CalendarIcon" />
//   );
import { useTheme } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { EventsFiltered } from '@/components/EventsFiltered';
import axios from 'axios';
import Link from "next/link";
// import { NavLink } from 'react-router';
// import { DocumentDescription, DocumentTitle } from '../functions/DocumentMeta';

const Events = () => {
    const theme = useTheme();
    const [events, setEvents] = useState(null)
    const [total, setTotal] = useState(null)
    const [pageH1, setPageH1] = useState(null)
    const [pageText, setPageText] = useState(null)
	const [seoTitle, setSeoTitle] = useState(null)
	const [seoDescription, setSeoDescription] = useState(null)
    
    const [formatItems, setFormatItems] = useState(null)
    useEffect(() => {
      axios
        .get("https://dev.goconf.ru/wp-json/events/v2/popular-formats/")
        .then((response) => {
            setFormatItems(response.data.items)
            console.log('popular-formats ', response.data)
        })
        .catch((error) => {
            console.log(error)
        });

    }, [])

	const [query, setQuery] = useState('');
	  
	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		// const trimmed = query.trim();
		// if (!trimmed) return;
		// console.log('tuta', encodeURIComponent(trimmed))
	
		try {
		  const response = await axios.post(
			"https://dev.goconf.ru/wp-json/events/v2/search/",
			{search: query}
		  );
		  setEvents(response.data.events);
		  setTotal(response.data.total);
		  setSeoTitle(response.data.seo.title);
		  setSeoDescription(response.data.seo.description);
		  console.log('из поиска ', response.data);
		} catch (error) {
		  console.error('Ошибка при поиске:', error);
		}
	}, [query, setFormatItems]);

    return (
        <>
		{/* <DocumentTitle value={seoTitle} /> */}
		{/* <DocumentDescription value={seoDescription} /> */}
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <Link href="/">Главная</Link>
                        <p>{pageH1 && pageH1}</p>
                    </div>
                    <h1 className={pageTitle}>{pageH1 && pageH1}</h1>
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
								type="text" placeholder='Поиск по мероприятиям' 
								value={query} 
								onChange={(e) => setQuery(e.target.value)} 
							/>
							<button type='submit'>
								search
								{/* <SearchIcon className={css`cursor: pointer;`} /> */}
							</button>
					</form>
                </div>
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
                <div className={container}>
                    <Filter full={true} setEvents={setEvents} setTotal={setTotal} setPageH1={setPageH1} setPageText={setPageText} setQuery={setQuery} setSeoDescription={setSeoDescription} setSeoTitle={setSeoTitle} />

                    {total ? <p className={css`padding-bottom: 24px;`}>Найдено событий: {total}</p> : null}
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
                        {/* <div>Конференции по&nbsp;маркетингу</div>
                        <div>Бизнес-семинары</div>
                        <div>Конференции в Москве</div>
                        <div>Выставки в Санкт-Петербурге</div>
                        <div>Конференции в Москве</div> */}

                    {formatItems && formatItems.map((item, index) => (
                        <Link href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`} key={index} dangerouslySetInnerHTML={{ __html: item.name }} />
                    ))}
                    </div>
                    
                </div>

                {/* <MainEvents onPage={true} events={events} /> */}
				<p>2</p>
                <EventsFiltered onPage={true} events={events} />
				<p>1</p>

                <div className={css`
                        padding: 64px 0;
                        background-color: #F5F7FA;
                `}>
                    <div className={container}>
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            gap: 16px;
                            
                            p {
                                color: #47474D;
                            }
                        `} dangerouslySetInnerHTML={{ __html: pageText && pageText }} />
                            
                        {/* </div> */}
                    </div>
                </div>

                <Form />
            </div>
        </>
    );
}

export default Events;