"use client"


import { motion } from 'framer-motion';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { filterBtn } from "@/styles/ui";
import DropdownInput from "@/components/ui/DropdownInput";
import Datepicker from "@/components/ui/Datepicker";
import { useRouter } from "next/navigation";
import useFiltersStore from '@/store/useFiltersStore';

export const FilterOnMain = ({full, setEvents}) => {
    const theme = useTheme();

    const filtersData = useFiltersStore((state) => state.filtersData)

	const router = useRouter();

	const [filterUrl, setFilterUrl] = useState(null)
	const handleSubmit = () => {
		filterUrl &&
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

    return (
        <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={css`
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
                `}>
                    <div className={css`
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
                    `}>
                      <DropdownInput options={filtersData && filtersData.subjects} handleFilterChange={handleFilterChange} type={'direction'} placeholder={'Тематика'} />
                    </div>
                    <div className={css`
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
                    `}>
                      <DropdownInput options={filtersData && filtersData.cities} handleFilterChange={handleFilterChange} type={'city'} placeholder={'Город'} />
                    </div>
                    <div className={css`
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
                    `}>
                      <DropdownInput options={filtersData && filtersData.formats} handleFilterChange={handleFilterChange} type={'format'} placeholder={'Формат'} />
                    </div>
                    
                    
                    
                    
                    <Datepicker full={full} title={'Начало'} handleFilterChange={handleFilterChange} type={'start'} />
                    <Datepicker full={full} title={'Окончание'} handleFilterChange={handleFilterChange} type={'end'} fixmob={true} /> {/*TODO Передалать на экран*/}

                    {!full && <div className={filterBtn} onClick={()=>handleSubmit()}>Найти</div>}
                    
        </motion.div>
    )
};