'use client';

import { useTheme } from '@emotion/react';
import { css, cx } from '@emotion/css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { Breadcrumbs, breadcrumbs, Container, input, PagePromo, pageTitle } from "@/styles/ui";
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
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [currentFilters, setCurrentFilters] = useState({});

	useEffect(() => {
		axios
			.get(getApiUrl("/backend/wp-json/events/v2/popular-formats/"))
			.then((response) => {
				setFormatItems(response.data.items);
			})
			.catch(console.error);
	}, []);

	// НОВАЯ функция для загрузки дополнительных событий с фильтрами
const handleLoadMoreWithFilters = useCallback(async () => {
    const nextPage = currentPage + 1;
    setLoading(true);
    
    try {
        // Используем тот же эндпоинт, что и в фильтрах
        const response = await axios.post(
            getApiUrl("/backend/wp-json/events/v2/filter/"),
            {
                ...currentFilters,
                load_page: nextPage
            }
        );
        
        // Защита от дубликатов
        setEvents(prev => {
            const eventsMap = new Map();
            prev.forEach(event => eventsMap.set(event.id, event));
            response.data.events.forEach(event => eventsMap.set(event.id, event));
            return Array.from(eventsMap.values());
        });
        
        setTotal(response.data.total);
        setCurrentPage(nextPage);
        
        console.log('Догрузка - загружено событий:', response.data.events.length, 'Всего:', response.data.total);
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
    } finally {
        setLoading(false);
    }
}, [currentPage, currentFilters]);

	const [activeMode, setActiveMode] = useState('filters'); // 'filters' | 'search' | 'all'

const handleSearchSubmit = useCallback(async (e, page = 1, loadMore = false) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    try {
        // Если поиск не пустой - используем поиск
        if (query.trim()) {
            const response = await axios.post(
                getApiUrl("/backend/wp-json/events/v2/search/"),
                { 
                    search: query,
                    load_page: page,
                }
            );
            
            if (loadMore) {
                // Защита от дубликатов при догрузке
                setEvents(prev => {
                    const eventsMap = new Map();
                    prev.forEach(event => eventsMap.set(event.id, event));
                    response.data.events.forEach(event => eventsMap.set(event.id, event));
                    return Array.from(eventsMap.values());
                });
            } else {
                setEvents(response.data.events);
                setCurrentPage(1);
            }
            
            setTotal(response.data.total);
            setSeoTitle(response.data.seo.title);
            setSeoDescription(response.data.seo.description);
            
            console.log('Поиск - загружено событий:', response.data.events.length, 'Всего:', response.data.total);
        } 
        // Если поиск пустой И есть активные фильтры - используем фильтры
        else if (Object.keys(currentFilters).length > 0) {
            const response = await axios.post(
                getApiUrl("/backend/wp-json/events/v2/filter/"),
                {
                    ...currentFilters,
                    load_page: page
                }
            );
            
            if (loadMore) {
                // Защита от дубликатов при догрузке
                setEvents(prev => {
                    const eventsMap = new Map();
                    prev.forEach(event => eventsMap.set(event.id, event));
                    response.data.events.forEach(event => eventsMap.set(event.id, event));
                    return Array.from(eventsMap.values());
                });
            } else {
                setEvents(response.data.events);
                setCurrentPage(1);
            }
            
            setTotal(response.data.total);
            console.log('Фильтры - загружено событий:', response.data.events.length, 'Всего:', response.data.total);
        }
        // Если поиск пустой И нет фильтров - загружаем все события
        else {
            const response = await axios.post(
                getApiUrl("/backend/wp-json/events/v2/filter/"),
                {
                    load_page: page
                }
            );
            
            if (loadMore) {
                // Защита от дубликатов при догрузке
                setEvents(prev => {
                    const eventsMap = new Map();
                    prev.forEach(event => eventsMap.set(event.id, event));
                    response.data.events.forEach(event => eventsMap.set(event.id, event));
                    return Array.from(eventsMap.values());
                });
            } else {
                setEvents(response.data.events);
                setCurrentPage(1);
            }
            
            setTotal(response.data.total);
            console.log('Все события - загружено:', response.data.events.length, 'Всего:', response.data.total);
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
    } finally {
        setLoading(false);
    }
}, [query, currentFilters]);


	


	// Функция для определения, какую функцию загрузки использовать
	// const handleLoadMore = useCallback(() => {
	// 	// Если есть активные фильтры (не только поиск), используем фильтрованную загрузку
	// 	if (Object.keys(currentFilters).length > 0 && 
	// 		(!query || Object.keys(currentFilters).some(key => 
	// 			key !== 'dateStart' && key !== 'dateEnd' && currentFilters[key]))) {
	// 		handleLoadMoreWithFilters();
	// 	} else {
	// 		// Иначе используем поисковую загрузку
	// 		handleSearchSubmit(null, currentPage + 1, true);
	// 	}
	// }, [currentPage, currentFilters, query, handleSearchSubmit, handleLoadMoreWithFilters]);
	
	// Функция для загрузки дополнительных событий
const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    
    if (query.trim()) {
        // Если есть поисковый запрос - используем поиск
        handleSearchSubmit(null, nextPage, true);
    } else if (Object.keys(currentFilters).length > 0) {
        // Если есть фильтры - используем фильтры
        handleLoadMoreWithFilters();
    } else {
        // Иначе загружаем все события
        handleSearchSubmit(null, nextPage, true);
    }
}, [currentPage, query, currentFilters, handleSearchSubmit, handleLoadMoreWithFilters]);

// Функция для сброса поиска (при очистке поля)
// const handleSearchReset = useCallback(() => {
//     setQuery('');
//     // При сбросе поиска загружаем события с текущими фильтрами
//     if (Object.keys(currentFilters).length > 0) {
//         // Используем фильтры
//         handleLoadMoreWithFilters(); // Это перезагрузит события с фильтрами
//     } else {
//         // Или загружаем все события
//         handleSearchSubmit(null, 1, false);
//     }
// }, [currentFilters, handleLoadMoreWithFilters, handleSearchSubmit]);

// useEffect(() => {
//     if (Object.keys(currentFilters).length > 0 && query) {
//         setQuery(''); // Сбрасываем поисковый запрос при применении фильтров
//     }
// }, [currentFilters]);

	return (
		<>
			<PagePromo>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<p>{pageH1}</p>
					</Breadcrumbs>
					<h1 className={pageTitle}>{pageH1}</h1>

					<form onSubmit={handleSearchSubmit} className={css`
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
			</PagePromo>

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
						setCurrentFilters={setCurrentFilters}
						setCurrentPage={setCurrentPage} // Добавляем для сброса пагинации
						setLoading={setLoading}
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

				<EventsFiltered 
					onPage 
					events={events} 
					total={total} 
					loading={loading}
					onLoadMore={handleLoadMore}
					currentPage={currentPage}
				/>

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
