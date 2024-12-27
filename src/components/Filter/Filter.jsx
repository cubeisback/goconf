import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; //TODO remove
import { motion } from 'framer-motion';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { filterBtn, filterSelector } from "../../pages/ui";
import { ReactComponent as ArrowDown } from '../../images/svg/arrowDown.svg';

export const Filter = ({full}) => {
    const theme = useTheme();

    const [startDate, setStartDate] = useState();
    const [showDate, setShowDate] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const datePickerRef = useRef(null);
    const selectorRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setShowSelect(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const labelRef = useRef(null)
    const changeSel = (e) => {
        setShowSelect(false);
        labelRef.current.textContent = e.target.textContent;
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
                `}>
                    
                    <div className={filterSelector} ref={selectorRef}>
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
                    </div>
                    <div className={filterSelector}>Город</div>
                    <div className={filterSelector}>Формат</div>
                    <div className={filterSelector} onClick={()=>setShowDate(true)}>Начало
                        <motion.div
                            initial={{ pointerEvents: 'none', y: 18, opacity: 0 }}
                            animate={{ opacity: showDate ? 1 : 0, y: showDate ? 18 : 40, pointerEvents: showDate ? 'all' : 'none' }}
                            transition={{ duration: 0.3 }}
                            style={{position: "absolute", zIndex: 10}}
                            ref={datePickerRef}
                        >
                            <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); console.log(date)}} inline />
                        </motion.div>
                    </div>
                    <div className={filterSelector}>Окончание</div>
                    <div className={filterBtn}>Найти</div>

                    {full && 
                      <div className={css`
                        flex: 0 1 100%;
                        max-width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        margin-top: 8px;
                      `}>
                        <div className={css`
                          display: flex;
                          gap: 24px;

                          div {
                            color:#fff;
                            font-size:14px;
                            line-height:1.16;
                          }
                        `}>
                          <div>Онлайн</div>
                          <div>Бесплатное</div>
                        </div>
                        <div className={css`color:#fff;font-size:14px;line-height:1.16;`}>Сбросить фильтр</div>
                      </div>
                    }
                    
        </motion.div>
    )
};