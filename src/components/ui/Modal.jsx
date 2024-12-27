import React from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/css';
import { Button } from '../../pages/ui';
import { NavLink } from 'react-router';

const modalBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const modalContent = css`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;


export const Modal = ({ isOpen, onClose }) => {
    return (
      <>
        {isOpen && (
          <motion.div
            className={modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose} // Закрытие при клике на фон
          >
            <motion.div
              className={modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} // Не закрывать при клике на модальное окно
            >
              <h2>Модалка</h2>
              <p>текст</p>
              <NavLink to="/lk"><Button onClick={onClose}>Войти</Button></NavLink>
            </motion.div>
          </motion.div>
        )}
      </>
    );
};
  