"use client"

import React, { useState, useEffect, useRef } from 'react';

export const Selector = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null); // Реф для отслеживания компонента

  // Функция для переключения состояния выпадающего списка
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Функция для закрытия списка при клике вне компонента
  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Используем useEffect для добавления обработчика кликов по документу
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Очистка обработчика при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Функция для обработки выбора опции
  const handleOptionSelect = (option) => {
    // alert(`Вы выбрали: ${option}`);
    setIsOpen(false); // Закрыть список после выбора опции
  };

  return (
    <div ref={selectorRef} style={{ margin: '10px' }}>
      <button onClick={toggleDropdown} style={{ padding: '10px', cursor: 'pointer' }}>
        {label}
      </button>
      {isOpen && (
        <ul style={{ listStyle: 'none', padding: '10px', margin: '0', backgroundColor: '#f1f1f1', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          {options.map((option, index) => (
            <li
              key={index}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
              onClick={() => handleOptionSelect(option)} // Выбор опции
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

