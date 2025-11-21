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
import "@/components/ui/my-datepicker.css";

const EventDate = ({title, fixmob, initialDate, changeDate, whatDate, error}) => {
    const [startDate, setStartDate] = useState(initialDate || null);
    const [showDate, setShowDate] = useState(false);
    const datePickerRef = useRef(null);

	useEffect(() => {
	if (initialDate) {
		setStartDate(initialDate);
	}
	}, [initialDate]);

    const customRu = {
      ...ru,
      localize: {
        ...ru.localize,
        month: (n) => ru.localize.month(n).charAt(0).toUpperCase() + ru.localize.month(n).slice(1),
        day: (n) => ru.localize.day(n).charAt(0).toUpperCase(),
      },
    };


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
            flex: 0 1 100%;
            max-width: 100%;
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

			@media(max-width: 575px) {
				flex: 0 1 100%;
				max-width: 100%;
			}
			${error && 'border-color: #FC1234;'}
          `)} onClick={()=>setShowDate(true)}>
              <p>{startDate ? startDate : title}</p>
              <CalendarIcon />
              <motion.div
                  initial={{ pointerEvents: 'none', x: 0, opacity: 0 }}
                  animate={{ opacity: showDate ? 1 : 0, x: showDate ? 0 : 40, pointerEvents: showDate ? 'all' : 'none' }}
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
					minDate={new Date()}
                    onChange={(date) => {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
                        const year = date.getFullYear();

                        const formattedDate = `${day}.${month}.${year}`;
                        setStartDate(formattedDate);
                        setTimeout(()=>{
                          setShowDate(false);
                        }, 0)
                        changeDate(formattedDate, whatDate)
                    }}
                    inline
                />
                </div>
              </motion.div>
          </div>
    )
}

export default EventDate;