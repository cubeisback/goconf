// "use client"

import { motion } from 'framer-motion';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { CheckBox, checkBox, FilterBlock, FilterBlockItem, FilterBlockMore, FilterBlockMoreLeft, FilterBlockMoreRight } from "@/styles/ui";
import DropdownInput from "../ui/DropdownInput";
import Datepicker from "../ui/Datepicker";
import axios from 'axios';
import useFiltersStore from '../../store/useFiltersStore';
import { usePathname, useRouter } from 'next/navigation';
import { getApiUrl } from '@/functions/functions';
import { useDateStore } from '@/store/useDateStore';

export const Filter = ({
	full, 
	setEvents, 
	setTotal, 
	setPageH1, 
	setPageText, 
	setQuery, 
	setSeoTitle, 
	setSeoDescription,
	setCurrentFilters,
	setCurrentPage,
	setLoading
}) => {
    const theme = useTheme();

    const filtersData = useFiltersStore((state) => state.filtersData)
	console.log('дата для фильров', filtersData)

	const router = useRouter();
	const pathname = usePathname();

	const filterParams = useMemo(() => {
		const pathAfterEvents = pathname.replace(/^\/events\/?/, "");
		return pathAfterEvents ? pathAfterEvents.split("/") : [];
	  }, [pathname]);
  
    const [filterValues, setFilterValues] = useState({});
    const [formData, setFormData] = useState({
      city: null,
      format: null,
      direction: null,
      dateStart: null,
      dateEnd: null,
      isOnline: false,
      isFree: false,
    });
  
    // Обновление formData из URL и отправка запроса
    useEffect(() => {
    if (typeof window !== 'undefined') {
        const sessionDate = window.sessionStorage.getItem('date-store');
        const parsedDate = sessionDate ? JSON.parse(sessionDate) : null;
        
        let formDataToSet;

        if (filterParams.length > 0) {
            const filters = filterParams.reduce((acc, param) => {
                const [key, value] = param.split("_");
                if (key && value) acc[key] = value;
                return acc;
            }, {});

            console.log("Parsed filters from URL:", filters);
            setFilterValues(filters);

            formDataToSet = {
                city: filters.city || null,
                format: filters.format || null,
                direction: filters.direction || null,
                dateStart: filters.start || parsedDate?.state?.mainDates?.dateStart || null,
                dateEnd: filters.end || parsedDate?.state?.mainDates?.dateEnd || null,
                isOnline: filters.isOnline === "true",
                isFree: filters.isFree === "true",
            };
        } else {
            setFilterValues({});
            formDataToSet = {
                city: null,
                format: null,
                direction: null,
                dateStart: parsedDate?.state?.mainDates?.dateStart || null,
                dateEnd: parsedDate?.state?.mainDates?.dateEnd || null,
                isOnline: false,
                isFree: false,
            };
        }

        setFormData(formDataToSet);
        if (setQuery) {
            setQuery('');
        }
        if (setCurrentFilters) {
            setCurrentFilters(formDataToSet);
        }
        
        handleFilterSubmit(formDataToSet, 1);
    }
}, [filterParams]);

    const handleFilterChange = (newValue, type) => {
		const updatedFilters = { ...filterValues, [type]: newValue };
		setFilterValues(updatedFilters);

		const order = ['direction', 'city', 'format'];
		const filterString = order
			.filter(key => updatedFilters[key])
			.map(key => `${key}_${updatedFilters[key]}`)
			.join('/');
		
		router.push(`/events/${filterString}`);
		
		const updatedForm = {
			...formData,
			[type]: newValue
		};
		
		setFormData(updatedForm);
		if (setQuery) {
			setQuery('');
		}
		handleFilterSubmit(updatedForm, 1);
	};
  
    // Отправка запроса
	const handleFilterSubmit = async (data, page = 1) => {
    console.log('запрос ушел с фильтрами:', data);
    setLoading(true);
    try {
        const res = await axios.post(
            getApiUrl("/backend/wp-json/events/v2/filter/"),
            {
                ...data,
                load_page: page
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        
        console.log("Запрос из фильтра:", res.data);
        
        // Если это не первая страница, защищаем от дубликатов
        if (page > 1) {
            setEvents(prev => {
                const eventsMap = new Map();
                prev.forEach(event => eventsMap.set(event.id, event));
                res.data.events.forEach(event => eventsMap.set(event.id, event));
                return Array.from(eventsMap.values());
            });
        } else {
            setEvents(res.data.events);
        }
        
        setTotal(res.data.total);
        setPageH1(res.data.h1);
        setPageText(res.data.text);
        setSeoTitle(res.data.seo.title);
        setSeoDescription(res.data.seo.description);
        
        // Сохраняем текущие фильтры
        if (setCurrentFilters) {
            setCurrentFilters(data);
        }
        
        // Сбрасываем пагинацию при новом фильтре (только если page = 1)
        if (setCurrentPage && page === 1) {
            setCurrentPage(1);
        }
        
        useDateStore.getState().resetMainDates();
    } catch (err) {
        console.log("Error:", err.message);
    } finally {
        setLoading(false);
    }
};
  
    // Обновляем обработчики
	const handleBooleanFilterChange = (key) => {
		const updatedForm = {
			...formData,
			[key]: !formData[key],
		};
		setFormData(updatedForm);
		handleFilterSubmit(updatedForm, 1);
	};

	const handleDateChange = (newValue, type) => {
		const updatedForm = {
			...formData,
			[type === 'start' ? 'dateStart' : 'dateEnd']: newValue,
		};
		setFormData(updatedForm);
		if (setQuery) {
			setQuery('');
		}
		handleFilterSubmit(updatedForm, 1);
	};


	const resetFilter = () => {
		const defaultForm = {
			city: null,
			format: null,
			direction: null,
			dateStart: null,
			dateEnd: null,
			isOnline: false,
			isFree: false,
		};

		setQuery('');
		setFilterValues({});
		setFormData(defaultForm);
		router.push("/events");
		handleFilterSubmit(defaultForm, 1);
	};

    return (
        <FilterBlock full={true}>
                    <FilterBlockItem full={true}>
                      <DropdownInput full={full} options={filtersData && filtersData.subjects} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'direction'} placeholder={'Тематика'} />
                    </FilterBlockItem>
                    <FilterBlockItem full={true}>
                      <DropdownInput full={full} options={filtersData && filtersData.cities} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'city'} placeholder={'Город'} />
                    </FilterBlockItem>
                    <FilterBlockItem full={true}>
                      <DropdownInput full={full} options={filtersData && filtersData.formats} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'format'} placeholder={'Формат'} />
                    </FilterBlockItem>
                    
                    
                    <Datepicker full={full} title={'Начало'} handleFilterChange={handleDateChange} filterValues={filterValues} type={'start'} />
                    <Datepicker full={full} title={'Окончание'} fixmob={true} handleFilterChange={handleDateChange} filterValues={filterValues} type={'end'} /> {/*TODO Передалать на экран*/}

                    {full && 
                      <FilterBlockMore>
                        <FilterBlockMoreLeft>
                          <CheckBox>
                            <input type="checkbox" id="expample1" 
                            checked={formData.isOnline}
                            onChange={() => handleBooleanFilterChange("isOnline")}
                             />
                            
                            <label htmlFor="expample1">Онлайн</label>
                          </CheckBox>
                          <CheckBox>
                            <input type="checkbox" id="expample2" 
                            checked={formData.isFree}
                            onChange={() => handleBooleanFilterChange("isFree")}
                            />
                            <label htmlFor="expample2">Бесплатное</label>
                          </CheckBox>
                        </FilterBlockMoreLeft>
                        <FilterBlockMoreRight onClick={()=>resetFilter()}>
                          <p>Сбросить фильтр</p>
                        </FilterBlockMoreRight>
                      </FilterBlockMore>
                    }
                    
        </FilterBlock>
    )
};