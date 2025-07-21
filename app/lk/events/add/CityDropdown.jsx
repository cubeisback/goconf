"use client"

import React, { useState, useRef, useEffect } from 'react';
import { css } from "@emotion/css";
import { AnimatePresence, motion } from 'framer-motion';
import ArrowDown from "@/public/images/svg/arrowDown.svg";
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";


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
//TODO стили вынести

const CityDropdown = ({ options, placeholder, handleDataOrganizaionCityChange, value }) => {
  const theme = useTheme();
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [showFullList, setShowFullList] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [values, setValues] = useState([]);

   useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setQuery(value);
      setSelectedValue(value);
    }
  }, [value]);
  
  useEffect(() => {    
    if (options) {
		const cityNames = options.map(city => city.name);
		setValues(cityNames)
    }
    
  }, [options]);

  useEffect(() => {
  if (isOpen && inputRef.current) {
    inputRef.current.focus();
  }
}, [isOpen]);
  
const filteredOptions = values.filter(option =>
	option.toLowerCase().includes(query.toLowerCase())
);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

const handleSelect = (value) => {
  handleDataOrganizaionCityChange(value);
  setQuery(value);
  setSelectedValue(value);
  setIsOpen(false);
  setShowFullList(false);
};

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && query.length > 0) {
      setQuery(''); // Очищаем инпут
      setSelectedValue(''); // Сбрасываем выбранное значение
      event.preventDefault(); // Предотвращаем удаление по одной букве
    }
  };

useEffect(() => {
	const handleClickOutside = (event) => {
		if (!dropdownRef.current?.contains(event.target)) {
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
	  style={{position: 'relative'}}
      ref={dropdownRef}
    >
      <Dropdown>
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <ArrowDown 
          className={css`
            cursor:pointer;
            transition: ${theme.transition};
            transform: rotate(${isOpen ? '-180deg' : '0deg'});
          `} 
          onClick={() => setIsOpen(prev => !prev)} 
        />
      </Dropdown>

		<AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
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

              @media(max-width: 1339px) {
                width: 100%;
              }
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
              <li key={99999} onClick={() => handleSelect('')}>
				Все города
			  </li>
              {(showFullList ? values : filteredOptions).map((option) => {
                const originalIndex = values.indexOf(option);
                return (
                  <li
                    key={originalIndex}
                    onClick={() => handleSelect(option)}
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

export default CityDropdown;