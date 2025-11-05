"use client"

import React, { useState, useRef, useEffect } from 'react';
import { css } from "@emotion/css";
import { motion, AnimatePresence } from 'framer-motion';
import ArrowDown from "@/public/images/svg/arrowDown.svg";
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";

const EventDropdown = ({ options, placeholder, incomeFunction, items, type }) => {
  const theme = useTheme();

  const Dropdown = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-right: 16px;
    background-color: #fff;
    border-radius: 28px;
  `;
  
  const Input = styled.input`
    font-size: 14px;
    padding: 14px 0 14px 16px;
    background-color: transparent;

    &::placeholder {
      color:rgba(71, 71, 77, .64);
      font-size: 14px;
      line-height: 1.16;
      transition: ${theme.transition};
    }
        
    &:focus::placeholder {
      color:rgba(71, 71, 77, .24); 
    }
  `;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleFocus = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    console.log('items ', items)
  }, [items])

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

  // Надежная проверка и преобразование items в массив
  const getSafeItems = () => {
    if (!items) return [];
    if (Array.isArray(items)) return items;
    if (items.name) return [items]; // если передан одиночный объект
    return [];
  };

  const safeItems = getSafeItems();
  const inputValue = safeItems.map(item => item?.name).filter(Boolean).join(', ') || '';

  return (
    <div 
      style={{position: 'relative'}}
      ref={dropdownRef}
    >
      <Dropdown>
        <Input
          type="text"
          value={inputValue}
          readOnly
          onFocus={handleFocus}
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
			<li onClick={() => {setIsOpen(false), incomeFunction(null)}}>
				{type == 'org' && 'Организатор'}
			  </li>
              {(Array.isArray(options) ? options : []).map((option) => {
                return (
                  <li 
                    key={option.id}
                    onClick={() => {setIsOpen(false), incomeFunction(option)}}
                    className={css`
                      padding: 8px;
                      cursor: pointer;
                      color: ${
                        safeItems.some(item => item?.name === option?.name)
                          ? theme.colors.purple
                          : theme.colors.font
                      };
                    
                      &:hover {
                        color: ${theme.colors.purple};
                      }
                    `}
                  >{option.name}</li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDropdown;