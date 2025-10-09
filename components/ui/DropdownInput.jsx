"use client"

import React, { useState, useRef, useEffect } from 'react';
import { css } from "@emotion/css";
import { motion, AnimatePresence } from 'framer-motion';
import ArrowDown from "@/public/images/svg/arrowDown.svg";
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";


// const InputArrow = styled
  const Dropdown = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-right: 16px;
    background-color: #fff;
    border-radius: 28px;
`
const Input = styled.input`
    font-size: 14px;
    padding: 14px 0 14px 16px;
    background-color: transparent;

    &::placeholder {
        color:rgba(71, 71, 77, .64);
        font-size: 14px;
        line-height: 1.16;
        transition: .3s ease-in-out;
    }
            
    &:focus::placeholder {
        color:rgba(71, 71, 77, .24); 
    }
`

const DropdownInput = ({ full, options, placeholder, isSimple, handleFilterChange, type, filterValues, incomeFunction }) => {
  const theme = useTheme();



  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [showFullList, setShowFullList] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [keys, setKeys] = useState([]);    // Стейт для ключей
  const [values, setValues] = useState([]); // Стейт для значений

  useEffect(() => {    
    if (options) {
      const keysArray = Object.keys(options);
      const valuesArray = Object.values(options);
      setKeys(keysArray);  // Заполняем стейт ключей
      setValues(valuesArray); // Заполняем стейт значений

      if(filterValues) {
        const checkedValue = filterValues[type];
        if (checkedValue) {
          setSelectedValue(options[checkedValue] ?? '');
          setQuery(options[checkedValue] ?? '');
        } else {
          // если значение отсутствует, сбрасываем выбор
          setSelectedValue(null);
          setQuery('');
        }
      }
    }
    
  }, [options, filterValues]);  // Эффект сработает, когда данные изменятся
  
  // Фильтрация опций на основе введенного текста
  const filteredOptions = values.filter(option =>
		// option.includes(query) && option.toLowerCase().includes(query.toLowerCase())
		option.toLowerCase().includes(query?.toLowerCase())
  );

  const handleChange = (event) => {
    setQuery(event.target.value);
    setIsOpen(true); // Открыть список при вводе
    setShowFullList(false); // Показывать фильтрованный список при вводе
  };

  const handleSelect = (value, type, index, e) => {
    // if(!isSimple) {
      setSelectedValue(value);
      setQuery(value); // Подставляем выбранное значение в инпут
      setIsOpen(false); // Закрыть список после выбора
      setShowFullList(true); // Показывать полный список после выбора
    // } else {
    //   setSelectedValue(value);
    //   setQuery(value);
    //   setShowFullList(true);
    // }
    if(handleFilterChange) {
      handleFilterChange(keys[index], type);
    //   console.log('asfas', keys[index], type)
    }
    console.log('values', values)
	// console.log('pidr', value, index, keys[index])
    incomeFunction(keys[index])
	
  };

  const handleFocus = () => {
    setIsOpen(true); // Открыть список при фокусе
    setShowFullList(true); // Показывать полный список при фокусе
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && query.length > 0) {
      setQuery(''); // Очищаем инпут
      setSelectedValue(''); // Сбрасываем выбранное значение
      event.preventDefault(); // Предотвращаем удаление по одной букве
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
    //   className={css`
    //     position: relative;
    //     // ${isSimple && 'cursor: pointer;'}
    //   `}
	  style={{position: 'relative'}}
      ref={dropdownRef}
    //   onClick={()=>{isSimple && setIsOpen(prev => !prev)}}
    >
      <Dropdown>
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
          placeholder={placeholder}
        />
        <ArrowDown 
          className={css`
            cursor:pointer;
            transition: ${theme.transition};
            transform: rotate(${isOpen ? '-180deg' : '0deg'});
            // ${isSimple && 'pointer-events: none;'}
          `} 
          onClick={() => setIsOpen(prev => !prev)} 
        />
      </Dropdown>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, pointerEvents: 'none' }}
            animate={{ opacity: 1, y: 0, pointerEvents: 'all' }}
            exit={{ opacity: 0, y: 10, pointerEvents: 'none' }}
            transition={{ duration: .2 }}
            className={css`
              position: absolute;
              z-index: 2;
              border-radius: 28px;
              background-color: #fff;
              box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
              width: ${full ? '100%' : '150%'};
              left: 0;
              top: calc(100% + 4px);
              padding: 12px 14px 12px 0;

              @media(max-width: 1339px) {
                width: 100%;
              }
            `}>
            <ul
              className={css`
                list-style-type: none;
                max-height: 240px;
                overflow-y: auto;
                overflow-x: hidden;

                &::-webkit-scrollbar {
                  width: 4px;
                }

                &::-webkit-scrollbar-track {
                  background: #fff;
                }

                &::-webkit-scrollbar-thumb {
                  background: ${theme.colors.purple};
                  border-radius: 4px;
                }

                & > li {
                  padding: 12px 16px;
                  font-size: 14px;
                  line-height: 1.16;
                  cursor: pointer;
                  transition: ${theme.transition};
                }
              `}
            >
              <li onClick={() => handleSelect('', type, 99999)}>
				{type == 'direction' && 'Все тематики'}
				{type == 'city' && 'Все города'}
				{type == 'format' && 'Все форматы'}
				{type == 'status' && 'Статус'}
			  </li>
              {(showFullList ? values : filteredOptions).map((option) => {
                const originalIndex = values.indexOf(option);
                return (
                  <li
                    key={originalIndex}
                    onClick={() => handleSelect(option, type, originalIndex)}
                    className={css`
                      padding: 8px;
                      cursor: pointer;
                      color: ${option === selectedValue ? `${theme.colors.purple}` : `${theme.colors.font}`};

                      &:hover {
                        color: ${theme.colors.purple};
                      }
                    `}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownInput;