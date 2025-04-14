
import { motion } from 'framer-motion';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { checkBox, filterBtn } from "../../pages/ui";
import DropdownInput from "../ui/DropdownInput";
import Datepicker from "../ui/Datepicker";
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import useFiltersStore from '../../store/useFiltersStore';

export const Filter = ({full, setEvents, setTotal, setPageH1, setPageText, setQuery, setSeoTitle, setSeoDescription}) => {
    const theme = useTheme();

    const filtersData = useFiltersStore((state) => state.filtersData)

    const location = useLocation();
    const navigate = useNavigate();
  
    // Парсим фильтры из URL
    const filterParams = useMemo(() => {
      const pathAfterEvents = location.pathname.replace(/^\/events\/?/, "");
      return pathAfterEvents ? pathAfterEvents.split("/") : [];
    }, [location.pathname]);
  
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
      if (filterParams.length > 0) {
        const filters = filterParams.reduce((acc, param) => {
          const [key, value] = param.split("_");
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});
  
        console.log("Parsed filters from URL:", filters);
  
        setFilterValues(filters);
        const updatedForm = {
          city: filters.city || null,
          format: filters.format || null,
          direction: filters.direction || null,
          dateStart: filters.start || null,
          dateEnd: filters.end || null,
          isOnline: filters.isOnline === "true",
          isFree: filters.isFree === "true",
        };
        setFormData(updatedForm);
        handleSubmit(updatedForm); // Отправляем запрос сразу
      } else {
        const defaultForm = {
          city: null,
          format: null,
          direction: null,
          dateStart: null,
          dateEnd: null,
          isOnline: false,
          isFree: false,
        };
        setFilterValues({});
        setFormData(defaultForm);
        handleSubmit(defaultForm);
      }
    }, [filterParams]);
  
    // Обновление фильтра и URL
    // const handleFilterChange = (newValue, type) => {
    //   const updatedFilters = { ...filterValues, [type]: newValue };
    //   setFilterValues(updatedFilters);
  
    //   // Обновляем URL
    //   const filterString = Object.entries(updatedFilters)
    //     .map(([key, value]) => `${key}_${value}`)
    //     .join("/");
  
    //   navigate(`/events/${filterString}`);
  
    //   const updatedForm = {
    //     ...formData,
    //     [type]: newValue,
    //   };
    //   setFormData(updatedForm);
    //   handleSubmit(updatedForm);
    // };

    const handleFilterChange = (newValue, type) => {
      const updatedFilters = { ...filterValues, [type]: newValue };
      setFilterValues(updatedFilters);
    
      // const filterString = Object.entries(updatedFilters)
      //   .map(([key, value]) => `${key}_${value}`)
      //   .join("/");

        const order = ['direction', 'city', 'format', 'start', 'end'];

      const filterString = order
        .filter(key => updatedFilters[key])
        .map(key => `${key}_${updatedFilters[key]}`)
        .join('/');
    
      navigate(`/events/${filterString}`);
    
      // Здесь больше не вызываем handleSubmit — это сделает useEffect
      setFormData(prev => ({
        ...prev,
        [type]: newValue
      }));
    };
  
    // Отправка запроса
    const handleSubmit = async (data) => {
      try {
        const res = await axios.post(
          "https://dev.goconf.ru/backend/wp-json/events/v2/filter/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", res);
        setEvents(res.data.events);
        setTotal(res.data.total);
        setPageH1(res.data.h1);
        setPageText(res.data.text);
		setSeoTitle(res.data.seo.title);
		setSeoDescription(res.data.seo.description);
      } catch (err) {
        console.log("Error:", err.message);
      }
    };
  
    // Здесь можешь рендерить список events и форму фильтрации
    const handleBooleanFilterChange = (key) => {
      const updatedForm = {
        ...formData,
        [key]: !formData[key],
      };
      setFormData(updatedForm);
      handleSubmit(updatedForm);
    };

const resetFilter = () => {
  // Сброс в начальное состояние
  const defaultForm = {
    city: null,
    format: null,
    direction: null,
    dateStart: null,
    dateEnd: null,
    isOnline: false,
    isFree: false,
  };

  setQuery(''); // Удаляем значение поиска
  setFilterValues({});
  setFormData(defaultForm);
  navigate("/events"); // Удаляем фильтры из URL
  handleSubmit(defaultForm); // Делаем новый запрос
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
                    margin-bottom: ${full ? '24px' : '95px' };
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
                      flex:  ${full ? '1' : '0 1 calc(16.666666% - 13.333333px)' };
                      max-width: ${full ? '' : 'calc(16.666666% - 13.333333px)'};

                      @media(max-width: 1339px) {
                        flex: 0 1 calc(33.3333333% - 10.666666px);
                        max-width: calc(33.3333333% - 10.666666px);
                      }
                      @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                      }
                    `}>
                      <DropdownInput full={full} options={filtersData && filtersData.subjects} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'direction'} placeholder={'Тематика'} />
                    </div>
                    <div className={css`
                      flex: ${full ? '1' : '0 1 calc(16.666666% - 13.333333px)' };
                      max-width: ${full ? '' : 'calc(16.666666% - 13.333333px)'};

                      @media(max-width: 1339px) {
                        flex: 0 1 calc(33.3333333% - 10.666666px);
                        max-width: calc(33.3333333% - 10.666666px);
                      }
                      @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                      }
                    `}>
                      <DropdownInput full={full} options={filtersData && filtersData.cities} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'city'} placeholder={'Город'} />
                    </div>
                    <div className={css`
                      flex: ${full ? '1' : '0 1 calc(16.666666% - 13.333333px)' };
                      max-width: ${full ? '' : 'calc(16.666666% - 13.333333px)'};

                      @media(max-width: 1339px) {
                        flex: 0 1 calc(33.3333333% - 10.666666px);
                        max-width: calc(33.3333333% - 10.666666px);
                      }
                      @media(max-width: 575px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                      }
                    `}>
                      <DropdownInput full={full} options={filtersData && filtersData.formats} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'format'} placeholder={'Формат'} />
                    </div>
                    
                    
                    
                    
                    <Datepicker full={full} title={'Начало'} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'start'} />
                    <Datepicker full={full} title={'Окончание'} fixmob={true} handleFilterChange={handleFilterChange} filterValues={filterValues} type={'end'} /> {/*TODO Передалать на экран*/}

                    {full && 
                      <div className={css`
                        flex: 0 1 100%;
                        max-width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        margin-top: 8px;
                        flex-wrap: wrap;
                        gap: 24px;
                      `}>
                        <div className={css`
                          display: flex;
                          gap: 24px;

                          @media(max-width: 575px) {
                            flex: 0 1 100%;
                            max-width: 100%;
                            justify-content: space-between;
                          }

                          div {
                            color:#fff;
                            font-size:14px;
                            line-height:1.16;
                          }
                        `}>
                          <div className={checkBox}>
                            <input type="checkbox" id="expample1" 
                            checked={formData.isOnline}
                            onChange={() => handleBooleanFilterChange("isOnline")}
                             />
                            
                            <label htmlFor="expample1">Онлайн</label>
                          </div>
                          <div className={checkBox}>
                            <input type="checkbox" id="expample2" 
                            checked={formData.isFree}
                            onChange={() => handleBooleanFilterChange("isFree")}
                            />
                            <label htmlFor="expample2">Бесплатное</label>
                          </div>
                        </div>
                        <div className={css`
                          color: #fff;
                          font-size: 14px;
                          line-height: 1.16;
                          position: relative;
                          padding-left: 40px;
                          cursor: pointer;

                          @media(max-width: 575px) {
                            margin: 0 auto;
                          }

                          &::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: -3px;
                            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 12C2 6.47715 6.57241 2 12.2128 2C16.3345 2 19.8859 4.39078 21.4995 7.83333M21.4995 7.83333H18.1702M21.4995 7.83333L22 4.22222M22 12C22 17.5229 17.4276 22 11.7872 22C7.66554 22 4.11413 19.6092 2.5005 16.1667M2.5005 16.1667H5.82979M2.5005 16.1667L2 19.7778" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
                            width: 24px;
                            height: 24px;
                            transition: ${theme.transition};
                          }

                          &:hover::before {
                              transform: rotate(180deg);
                          }
                        `} onClick={()=>resetFilter()}>
                          <p>Сбросить фильтр</p>
                        </div>
                      </div>
                    }
                    
        </motion.div>
    )
};