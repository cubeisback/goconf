
import { motion } from 'framer-motion';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { checkBox, filterBtn } from "../../pages/ui";
import DropdownInput from "../ui/DropdownInput";
import Datepicker from "../ui/Datepicker";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6', 'Ы'];

export const Filter = ({full}) => {
    const theme = useTheme();

    //Список городов
    const [cities, setCities] = useState([]);

    useEffect(() => {
      const getCities = async () => {
        const url = `https://raw.githubusercontent.com/pensnarik/russian-cities/refs/heads/master/russian-cities.json`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
  
          if (data) {
            // Сортировка: Москва и Санкт-Петербург всегда на первом месте
            const sortedCities = data
              .map(city => city.name) // Получаем список городов
              .sort((a, b) => {
                if (a === 'Москва') return -1;  // Москва на первом месте
                if (b === 'Москва') return 1;
                if (a === 'Санкт-Петербург') return -1; // Санкт-Петербург на втором месте
                if (b === 'Санкт-Петербург') return 1;
                return a.localeCompare(b); // Остальные города сортируем по алфавиту
              });
  
            setCities(sortedCities); // Устанавливаем в состояние
          }
        } catch (error) {
          console.error('Ошибка при получении городов:', error);
        }
      };
  
      getCities();
    }, []);

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
                    {/* <div className={filterSelector} ref={selectorRef}>
                        <label onClick={()=>setShowSelect(true)}>
                            <p ref={labelRef}>Тематика</p>
                            <ArrowDown />
                        </label>
                        <motion.div 
                        initial={{ pointerEvents: 'none', opacity: 0 }}
                        animate={{ opacity: showSelect ? 1 : 0, pointerEvents: showSelect ? 'all' : 'none' }}
                        transition={{ duration: 0.3 }}
                        style={{position: "absolute", zIndex: 2}}
                        >
                            <p onClick={(e)=>changeSel(e)}>Тематика1</p>
                            <p onClick={(e)=>changeSel(e)}>Тематика2</p>
                            <p onClick={(e)=>changeSel(e)}>Тематика3</p>
                        </motion.div>
                    </div> */}
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
                      <DropdownInput options={options} placeholder={'Тематика'} />
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
                      <DropdownInput options={cities} placeholder={'Город'} />
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
                      <DropdownInput options={options} placeholder={'Формат'} />
                    </div>
                    
                    
                    
                    
                    <Datepicker full={full} title={'Начало'} />
                    <Datepicker full={full} title={'Окончание'} />

                    {!full && <div className={filterBtn}>Найти</div>}

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
                            <input type="checkbox" id="expample1" />
                            <label htmlFor="expample1">Онлайн</label>
                          </div>
                          <div className={checkBox}>
                            <input type="checkbox" id="expample2" />
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
                          }
                        `}>
                          <p>Сбросить фильтр</p>
                        </div>
                      </div>
                    }
                    
        </motion.div>
    )
};