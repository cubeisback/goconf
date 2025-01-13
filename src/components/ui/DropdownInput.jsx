import React, { useState, useRef, useEffect } from 'react';
import { css } from "@emotion/css";
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as ArrowDown } from '../../images/svg/arrowDown.svg';
import { useTheme } from '@emotion/react';

const DropdownInput = ({ options, onSelect, placeholder }) => {
  const theme = useTheme();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Фильтрация опций на основе введенного текста
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event) => {
    setQuery(event.target.value);
    setIsOpen(true); // Открыть список при вводе
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setQuery(value); // Подставляем выбранное значение в инпут
    setIsOpen(false); // Закрыть список после выбора
    // onSelect(value); // Вызываем callback с выбранным значением
  };

  const handleFocus = () => {
    setIsOpen(true); // Открыть список при фокусе
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
    <div className={css`
      position: relative;
    `} ref={dropdownRef}>
      <div className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding-right: 16px;
        background-color: #fff;
        border-radius: 28px;
      `}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={css`
              font-size: 14px;
              padding: 14px 0 14px 16px;
              background-color: transparent;

              &::placeholer {
                color:rgba(71, 71, 77, .64);
                font-size: 14px;
                line-height: 1.16;
                transition: ${theme.transition};
              }
              
              &:focus::placeholder {
                color:rgba(71, 71, 77, .24); 
              }
            `}
          />
        
        <ArrowDown className={css`cursor:pointer;`} onClick={()=>setIsOpen(prev => !prev)} />
      </div>
      
      <AnimatePresence>
      {isOpen && filteredOptions.length > 0 && (
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
            width: 100%;
            left: 0;
            top: calc(100% + 4px);
            padding: 12px 14px 12px 0;
          `}>
        <ul 
          
          className={css`
            list-style-type: none;
            max-height: 161px;
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
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={css`
                padding: 8px;
                cursor: ponter;
                color: ${option === selectedValue ? `${theme.colors.purple}`: `${theme.colors.font}`};

                &:hover {
                  color: ${theme.colors.purple};
                }
              `}
            >
              {option}
            </li>
          ))}
        </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownInput;
