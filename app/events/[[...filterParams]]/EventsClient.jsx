'use client';

import { useTheme } from '@emotion/react';
import { css, cx } from '@emotion/css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { Breadcrumbs, Container, EventsFilterBefore, EventsFilterTags, EventsPageText, EventsSearchInput, input, PagePromo, PageTitle } from "@/styles/ui";
import { Filter } from '@/components/Filter/Filter';
import { EventsFiltered } from '@/components/EventsFiltered';
import { Form } from '@/components/Form';
import SearchIcon from "@/public/images/svg/search.svg";
import { getApiUrl } from '@/functions/functions';

export default function EventsClient({ params, initialData }) {
  const theme = useTheme();
  
  // Инициализируем состояния из initialData
  const [events, setEvents] = useState(initialData.initialEvents || []);
  const [total, setTotal] = useState(initialData.initialTotal || 0);
  const [pageH1, setPageH1] = useState(initialData.h1 || initialData.pageH1 || 'Все мероприятия');
  const [pageText, setPageText] = useState(initialData.pageText || '');
  const [seoTitle, setSeoTitle] = useState(initialData.initialSeo?.title || '');
  const [seoDescription, setSeoDescription] = useState(initialData.initialSeo?.description || '');
  const [query, setQuery] = useState('');
  const [formatItems, setFormatItems] = useState(initialData.formatItems || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  // Загружаем форматы только если их нет в initialData
  useEffect(() => {
    if (!initialData.formatItems || initialData.formatItems.length === 0) {
      axios
        .get(getApiUrl("/backend/wp-json/events/v2/popular-formats/"))
        .then((response) => {
          setFormatItems(response.data.items);
        })
        .catch(console.error);
    }
  }, [initialData.formatItems]);

  // НОВАЯ функция для загрузки дополнительных событий с фильтрами
  const handleLoadMoreWithFilters = useCallback(async () => {
    const nextPage = currentPage + 1;
    setLoading(true);
    
    try {
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
      
      // Обновляем SEO данные если пришли
      if (response.data.seo) {
        setSeoTitle(response.data.seo.title || '');
        setSeoDescription(response.data.seo.description || '');
      }
      
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentFilters]);

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
        setSeoTitle(response.data.seo?.title || '');
        setSeoDescription(response.data.seo?.description || '');
        
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
        
        // Обновляем текст страницы если пришел
        if (!loadMore && response.data.text) {
          setPageText(response.data.text);
        }
        
        // Обновляем SEO данные если пришли
        if (response.data.seo) {
          setSeoTitle(response.data.seo.title || '');
          setSeoDescription(response.data.seo.description || '');
        }
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
      }
      
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    } finally {
      setLoading(false);
    }
  }, [query, currentFilters]);

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

  return (
    <>
      {/* Блок 1: Хедер с хлебными крошками и H1 */}
      <PagePromo>
        <Container>
          <Breadcrumbs>
            <Link href="/">Главная</Link>
            <p>{pageH1}</p>
          </Breadcrumbs>
          
          {/* H1 заголовок (данные пришли с сервера через initialData) */}
          <PageTitle>{pageH1}</PageTitle>

          {/* Форма поиска */}
          <EventsSearchInput onSubmit={handleSearchSubmit} >
            <input
              className={cx(input, css`padding: 0 4px;`)}
              type="text"
              placeholder='Поиск по мероприятиям'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>
              <SearchIcon style={{cursor: 'pointer'}} />
            </button>
          </EventsSearchInput>
        </Container>
      </PagePromo>

      <EventsFilterBefore>
        <Container>
          <Filter
            full
            setEvents={setEvents}
            setTotal={setTotal}
            setPageH1={setPageH1} // Обновляет H1 при фильтрации
            setPageText={setPageText} // Обновляет текст при фильтрации
            setQuery={setQuery}
            setSeoDescription={setSeoDescription}
            setSeoTitle={setSeoTitle}
            setCurrentFilters={setCurrentFilters}
            setCurrentPage={setCurrentPage}
            setLoading={setLoading}
          />
            
          <p style={{paddingBottom: 24}}>
            {total ? `Найдено событий: ${total}` : 'По заданным параметрам событий не найдено'}
          </p>

          <EventsFilterTags>
            {formatItems && formatItems.map((item, index) => (
              <Link
                key={index}
                href={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            ))}
          </EventsFilterTags>
        </Container>

        <EventsFiltered 
          onPage 
          events={events} 
          total={total} 
          loading={loading}
          onLoadMore={handleLoadMore}
          currentPage={currentPage}
        />

        {/* Блок 2: Текстовый блок (данные пришли с сервера через initialData) */}
        {pageText && (
          <div style={{padding: '64px 0', backgroundColor: '#F5F7FA'}}>
            <Container>
              <EventsPageText
                dangerouslySetInnerHTML={{ __html: pageText }} 
              />
            </Container>
          </div>
        )}

        <Form />
      </EventsFilterBefore>
    </>
  );
}