"use client"


import { motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { filterBtn } from "@/styles/ui";
import DropdownInput from "@/components/ui/DropdownInput";
import Datepicker from "@/components/ui/Datepicker";
import { useRouter } from "next/navigation";
import useFiltersStore from '@/store/useFiltersStore';
import { useDateStore } from '@/store/useDateStore';
import styled from "@emotion/styled";

export const FilterOnMain = ({full, setEvents}) => {
    const theme = useTheme();

    const filtersData = useFiltersStore((state) => state.filtersData)
	
	const setDateStart = useDateStore((state) => state.setDateStart);
  	const setDateEnd = useDateStore((state) => state.setDateEnd);
	const handleStartDateChange = (date) => {
	    setDateStart(date); // сохраняем дату начала
		console.log('votdata', date)
	};

	const handleEndDateChange = (date) => {
		setDateEnd(date); // сохраняем дату конца
		console.log('votdata', date)
	};

	const router = useRouter();

	const [filterUrl, setFilterUrl] = useState('')
	const handleSubmit = () => {
		// filterUrl &&
		router.push(`/events/${filterUrl}`);
	};

	const [filterValues, setFilterValues] = useState({});
	const handleFilterChange = (newFilter, type) => {
		const updatedFilters = { ...filterValues, [type]: newFilter };
		setFilterValues(updatedFilters);

		const order = ['direction', 'city', 'format'];

		const filterString = order
			.filter(key => updatedFilters[key])
			.map(key => `${key}_${updatedFilters[key]}`)
			.join('/');

		setFilterUrl(filterString);
	}

	const AnimatedFilterBlock = styled(motion.div)`
	min-height: 80px;
	width: 100%;
                    border-radius: 28px;
                    background-color: ${theme.colors.purple};
                    margin-bottom: ${full ? '16px' : '95px' };
                    display: flex;
                    gap: 16px;
                    padding: 16px;
                    align-items: center;
                    flex-wrap: wrap;

                    @media(max-width: 1339px) {
                      margin-bottom: ${full ? '24px' : '-48px'};
                      padding-bottom: ${full ? '16px' : '80px'};
                    }
	`
	const FilterItem = styled.div`
	flex: 0 1 ${full ? 'calc(20% - 13.333333px)' : 'calc(16.666666% - 13.333333px)' };
                      max-width: ${full ? 'calc(20% - 13.333333px)' : 'calc(16.666666% - 13.333333px)'};

                      @media(max-width: 1339px) {
                        flex: 0 1 calc(33.3333333% - 10.666666px);
                        max-width: calc(33.3333333% - 10.666666px);
                      }
                      @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                      }
	`

    return (
        <AnimatedFilterBlock
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                >
                    <FilterItem>
                      <DropdownInput options={filtersData && filtersData.subjects} handleFilterChange={handleFilterChange} type={'direction'} placeholder={'Тематика'} />
                    </FilterItem>
                    <FilterItem>
                      <DropdownInput options={filtersData && filtersData.cities} handleFilterChange={handleFilterChange} type={'city'} placeholder={'Город'} />
                    </FilterItem>
                    <FilterItem>
                      <DropdownInput options={filtersData && filtersData.formats} handleFilterChange={handleFilterChange} type={'format'} placeholder={'Формат'} />
                    </FilterItem>
                    
                    <Datepicker full={full} title={'Начало'} handleFilterChange={handleFilterChange} setStoreDate={handleStartDateChange} type={'start'} />
                    <Datepicker full={full} title={'Окончание'} handleFilterChange={handleFilterChange} setStoreDate={handleEndDateChange} type={'end'} fixmob={true} /> {/*TODO Передалать на экран*/}

                    {!full && <div className={filterBtn} onClick={()=>handleSubmit()}>
						<span>Найти</span>
					</div>}
                    
        </AnimatedFilterBlock>
    )
};