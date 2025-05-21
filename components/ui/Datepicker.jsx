"use client"

import { css, cx } from "@emotion/css"
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
const CalendarIcon = () => (
  <img src="/images/svg/calendar.svg" alt="CalendarIcon" />
);
import { filterSelector } from "@/styles/ui";
import DatePicker from "react-datepicker";
import {ru} from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css"; //TODO remove

const Datepicker = ({full, title, fixmob, handleFilterChange, filterValues, type, setStoreDate}) => {
    const [startDate, setStartDate] = useState(null);
    const [showDate, setShowDate] = useState(false);
    const datePickerRef = useRef(null);

    const customRu = {
      ...ru,
      localize: {
        ...ru.localize,
        month: (n) => ru.localize.month(n).charAt(0).toUpperCase() + ru.localize.month(n).slice(1),
        day: (n) => ru.localize.day(n).charAt(0).toUpperCase(),
      },
    };

    //   useEffect(() => {
    //       if(filterValues) {
    //         const checkedValue = filterValues[type];
    //         if (checkedValue) {
    //           setStartDate(filterValues[type])
    //         } else {
    //           setStartDate(null)
    //         }
    //       }
    //   }, [filterValues]);
	useEffect(() => {
  if (filterValues && filterValues[type]) {
    setStartDate(filterValues[type]);
  } else {
    // Попытка получить дату из sessionStorage
	if (typeof window !== 'undefined') {
		const sessionDate = window.sessionStorage.getItem('date-store');
		if (sessionDate) {
			const parsed = JSON.parse(sessionDate);
			// onesadasd = parsed?.state?.mainDates?.dateStart || null;
      		// dateEnd = parsed?.state?.mainDates?.dateEnd || null;
			console.log(parsed?.state?.mainDates?.dateStart, 'ASDGAJSDJASHDASHD')
			if(type == 'start') {
				setStartDate(parsed?.state?.mainDates?.dateStart);
			} else {
				setStartDate(parsed?.state?.mainDates?.dateEnd);
			}

		// setStartDate(sessionDate);
		// handleFilterChange(sessionDate, type); // Запустить обработчик фильтрации
		// setStoreDate && setStoreDate(sessionDate); // Синхронизировать со store
		} else {
		setStartDate(null);
		}
	}
    
  }
}, [filterValues]);


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
            setShowDate(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function parseDateString(dateString) {
      const [day, month, year] = dateString.split('.');
      return new Date(`${year}-${month}-${day}`);
    }

    return (
        <div className={cx(filterSelector, css`
            flex: 0 1 ${full ? '180px' : 'calc(16.666666% - 13.333333px)' };
            max-width: ${full ? '180px' : 'calc(16.666666% - 13.333333px)'};
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            & > div {
                background-color: transparent;
                box-shadow: none;
                width: 0;
                height: 0;

                @media(max-width: 991px) {
                  left: ${fixmob && '-30vw'};
                }
            }
          `)} onClick={()=>setShowDate(true)}>
              <p>{startDate ? startDate : title}</p>
              <CalendarIcon />
              <motion.div
                  initial={{ pointerEvents: 'none', y: 18, opacity: 0 }}
                  animate={{ opacity: showDate ? 1 : 0, y: showDate ? 18 : 40, pointerEvents: showDate ? 'all' : 'none' }}
                  transition={{ duration: 0.3 }}
                  style={{position: "absolute", zIndex: 10}}
                  ref={datePickerRef}
              >
                <div className={css`
                    position: relative;

                        .react-datepicker {
                            font-family: inherit;
                        }
                    `}>
                  <DatePicker 
                    selected={startDate ? parseDateString(startDate) : null} 
                    locale={customRu}
                    onChange={(date) => {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
                        const year = date.getFullYear();

                        const formattedDate = `${day}.${month}.${year}`;
                        setStartDate(formattedDate);
                        setTimeout(()=>{
                          setShowDate(false);
                        }, 0)
                        handleFilterChange(formattedDate, type)
						// console.log('type', type)
						setStoreDate && setStoreDate(formattedDate)
                    }}
                    inline
                />
                </div>
              </motion.div>
          </div>
    )
}

export default Datepicker;