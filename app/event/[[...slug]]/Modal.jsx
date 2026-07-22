"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css } from '@emotion/css';
import { Button } from '@/styles/ui';
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";
import { useAuthReady } from '@/hooks/useAuthReady';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';

const modalBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const modalContent = css`
  background: white;
  border-radius: 28px;
  max-width: 480px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 111px 31px 0px rgba(0, 0, 0, 0.00), 0px 71px 28px 0px rgba(0, 0, 0, 0.01), 0px 40px 24px 0px rgba(0, 0, 0, 0.05), 0px 18px 18px 0px rgba(0, 0, 0, 0.09), 0px 4px 10px 0px rgba(0, 0, 0, 0.10);
  position: relative;
  overflow: hidden;

  @media(max-width: 510px) {
    max-width: calc(100vw - 30px);
  }
`;

const modalForm = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  input {
    padding: 16px;
    border: 1px solid #D7DADD;
    border-radius: 28px;
	font-size: 14px;
	transition: .3s ease-in-out;

    &::placeholder {
      color: rgba(71, 71, 77, .64);
	  font-size: 14px;
    }
  }
`;

const modalTitle = css`
  text-align: center;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.34;

  @media(max-width: 575px) {
    font-size: 20px;
  }
`;

const modalContentTop = css`
  padding: 40px 64px 24px;

  @media(max-width: 575px) {
    padding: 24px 16px;
	overflow-y: auto;
	max-height: 90vh;
  }
`;

const modalContentBottom = css`
  padding: 24px 64px 40px;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media(max-width: 575px) {
    padding: 24px 16px;
  }
`;

const modalSocials = css`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;

  & > a {
    border: 1px solid #D7DADD;
    border-radius: 100%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

	&:nth-of-type(2) {
		background: #FC3F1D;
		border-color: #FC3F1D;
	}
  }
`;

const modalText = css`
	display: flex;
	gap: 16px;
	flex-direction: column;
	margin-bottom: 32px;

	p {
		color: #47474D;
		font-size: 14px;
		line-height: 1.16;
	}
`;

const modalEventText = css`
	color: #47474D;
	border-bottom: 1px solid #D7DADD;
	margin-bottom: 16px;
	padding-bottom: 16px;

	p {
		margin-bottom: 4px;
		font-size: 14px;
		line-height: 1.16;
		font-weight: bold;
	}
	span {
		font-size: 18px;
		line-height: 1.36;
	}
`;

const modalTextWithLine = css`
  position: relative;
  margin-bottom: 24px;
  text-align: center;

  p {
    background-color: #fff;
    position: relative;
    width: max-content;
    margin: 0 auto;
    padding: 0 16px;
    font-size: 14px;
    line-height: 1.16;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    background-color: #D7DADD;
    height: 1px;
  }
`;

const Error = styled.div`
	font-size: 12px;
	margin-top: -16px;
	margin-bottom: -8px;
	color: #FC1234;
	padding-left: 10px;
`

const ConfirmWindow = styled(motion.div)`
	border-radius: 28px;
	background-color: #fff;
	box-shadow: 0px 111px 31px 0px rgba(0, 0, 0, 0.00), 0px 71px 28px 0px rgba(0, 0, 0, 0.01), 0px 40px 24px 0px rgba(0, 0, 0, 0.05), 0px 18px 18px 0px rgba(0, 0, 0, 0.09), 0px 4px 10px 0px rgba(0, 0, 0, 0.10);
	position: relative;
	padding: 40px 64px;
	text-align: center;
	max-width: 480px;
`;
const ConfirmWindowTitle = styled.div`
	margin: 8px 0 16px;
	font-size: 24px;
	font-weight: bold;
	line-height: 1.34;
	color: #191921;
`;

const ConfirmWindowText = styled.div`
	font-size: 14px;
	line-height: 1.16;
	margin-bottom: 32px;
`;

const ModalBackdrop = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const ModalClose = styled.div`
	position: absolute;
	top: 16px;
	right: 16px;
	width: 32px;
	height: 32px;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 9L23 23M23 9L9 23" stroke="%238553F9" stroke-width="2" stroke-linecap="round"/></svg>');
	cursor: pointer;
	transition: .3s ease-in-out;

	&:hover {
	  transform: rotate(180deg);
	}
`;

export const ModalEvent = ({ isOpen, onClose, onReg, eventName, eventId }) => {
  	const theme = useTheme();

  const modalClose = css`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 9L23 23M23 9L9 23" stroke="%238553F9" stroke-width="2" stroke-linecap="round"/></svg>');
    cursor: pointer;
    transition: ${theme.transition};

    &:hover {
      transform: rotate(180deg);
    }
  `;

  const [view, setView] = useState(1);
  const { ready } = useAuthReady();
const [accessWasSended, setAccessWasSended] = useState();
  const sendEventAccess = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
		try {
				const response = await axios.post(
				getApiUrl("/backend/wp-json/events/v2/access-request/"),
				{id: eventId},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('sendEventAccess', response)
				if (response.status === 200) {
					setView(2)
				}
		} catch (error) {
			console.error("Update password error", error);
			setAccessWasSended('Запрос уже отправлен, дождитесь ответа')
			setView(2)
		}
	};
    return (
      <>
        <AnimatePresence>
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
                <div className={modalClose} onClick={onClose}></div>
                
                {!ready ? 
                <div className={modalContentTop}>
                  <div className={modalTitle}>Запрос на&nbsp;редактирование</div>
				  <div className={modalText}>
					<p>Мы&nbsp;публикуем события из&nbsp;открытых источников. Если это ваше мероприятие и&nbsp;вы&nbsp;хотите получить доступ к&nbsp;его редактированию, пожалуйста, зарегистрируйтесь на&nbsp;сайте.</p>
					<p style={{fontWeight: 700}}>Совет: зарегистрируйтесь с&nbsp;корпоративной почты&nbsp;&mdash; это значительно ускорит модерацию.</p>
					<p>После авторизации откройте карточку события на&nbsp;сайте и&nbsp;нажмите кнопку &laquo;Отправить запрос&raquo;. После подтверждения владения событие появится в&nbsp;вашем личном кабинете, и&nbsp;вы&nbsp;сможете управлять&nbsp;им.</p>
					{/* <p>Кроме того, всем подтвержденным профилям автоматически активируется тариф <span style={{color: '#8553F9'}}>&laquo;Расширенный&raquo;</span> для первого события.</p> */}
				  </div>
				  <Button $button type="submit" style={{width: '100%'}} onClick={()=>{onClose(), onReg()}}>
							<p>
								<span>Регистрация</span>
								<span>Регистрация</span>
							</p>
					</Button>
                </div>
                : 
					view === 1 ?
                  <div className={modalContentTop}>
					<div className={modalTitle}>Запрос на&nbsp;редактирование</div>
					<div className={modalEventText}>
						<p>Мероприятие</p>
						<span>{eventName}</span>
					</div>
					<div className={modalText}>
						<p>Если это ваше событие и&nbsp;вы&nbsp;хотите получить доступ к&nbsp;его редактированию, нажмите кнопку &laquo;Отправить запрос&raquo;.</p>
						<p>После подтверждения владения событие появится в&nbsp;вашем личном кабинете, и&nbsp;вы&nbsp;сможете управлять&nbsp;им, указывать ссылку на&nbsp;сайт или форму регистрации, а&nbsp;также воспользоваться опциями для продвижения.</p>
						<p>Обычно проверка занимает не&nbsp;более 12&nbsp;часов, и&nbsp;вы&nbsp;получите уведомление на&nbsp;почту.</p>
						<p>Если вы&nbsp;зарегистрировались не&nbsp;с&nbsp;корпоративной почты, нам могут понадобиться дополнительные уточнения&nbsp;&mdash; в&nbsp;этом случае мы&nbsp;свяжемся с&nbsp;вами по&nbsp;email.</p>
					</div>
					<Button $button type="submit" style={{width: '100%'}} onClick={sendEventAccess}>
								<p>
									<span>Отправить запрос</span>
									<span>Отправить запрос</span>
								</p>
						</Button>
					</div>
					:
					<div className={modalContentTop}>
						<div className={modalTitle}>Запрос отправлен</div>
						<div className={modalText}>
							<p><b>Мероприятие</b>&nbsp;&mdash; {eventName}</p>
							{accessWasSended ?
							<p>{accessWasSended}</p>
							:
							<p>Запрос успешно отправлен. В&nbsp;ближайшее время мы&nbsp;его обработаем. На&nbsp;контактный E-mail придет уведомление с&nbsp;результатами обработки. В&nbsp;случае успеха, событие появится в&nbsp;вашем личном кабинете.</p>
							}
						</div>
						<Button $button type="submit" style={{width: '100%'}} onClick={onClose}>
								<p>
									<span>Всё понятно</span>
									<span>Всё понятно</span>
								</p>
						</Button>
					</div>
                }
                

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

		{/* {showSuccesWindow &&
		
		<ModalBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
				<ConfirmWindow
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				>
					<ModalClose onClick={()=>setShowSuccesWindow(false)} />
					<SuccessReg />
					<ConfirmWindowTitle>Вы успешно зарегистрировались</ConfirmWindowTitle>
					<ConfirmWindowText>На&nbsp;указанный e-mail отправлена ссылка для подтверждения регистрации</ConfirmWindowText>
					<Button onClick={()=>setShowSuccesWindow(false)} full="true">
						<p>
							<span>Вернуться на&nbsp;сайт</span>
							<span>Вернуться на&nbsp;сайт</span>
						</p>
					</Button>
				</ConfirmWindow>
				
			</ModalBackdrop>
		} */}
      </>
    );
};
  