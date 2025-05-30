"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css, cx } from '@emotion/css';
import { Button, checkBox } from '@/styles/ui';
import { useTheme } from '@emotion/react';
import Google from "@/public/images/svg/google.svg";
import { PasswordInput } from '@/components/ui/PasswordInput';
import Link from 'next/link';
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

    &::placeholder {
      color: rgba(71, 71, 77, .64);
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

  & > div {
    border: 1px solid #D7DADD;
    border-radius: 100%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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

export const Modal = ({ isOpen, onClose }) => {
  	const theme = useTheme();


  	// const handleSubmit = async (data) => {
	// 	console.log('запрос ушел ')
	// 	try {
	// 	  const res = await axios.post(
	// 		getApiUrl("/backend/wp-json/events/v2/filter/"),
	// 		data,
	// 		{
	// 		  headers: {
	// 			"Content-Type": "application/json",
	// 		  },
	// 		}
	// 	  );
	// 	  console.log("Response:", res);
	// 	  setEvents(res.data.events);
	// 	  setTotal(res.data.total);
	// 	  setPageH1(res.data.h1);
	// 	  setPageText(res.data.text);
	// 	setSeoTitle(res.data.seo.title);
	// 	setSeoDescription(res.data.seo.description);
	// 	useDateStore.getState().resetMainDates();
	// 	} catch (err) {
	// 	  console.log("Error:", err.message);
	// 	}
	// };

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [regResponse, setRegResponse] = useState(null)

	const handleSubmit = async(e) => {
		e.preventDefault();

		// Простейшая валидация
		if (password !== confirmPassword) {
		alert("Пароли не совпадают");
		return;
		}

		try {
			const response = await axios.post(
				getApiUrl("/backend/wp-json/users/v2/register/"), {
				firstname: firstName,
				lastname: lastName,
				password: password,
				confirm_password: confirmPassword,
				email: email,
			});

			if (response.status === 200) {
				alert("Вы успешно зарегистрированы!");
				console.log('registration', response)
				setRegResponse(response)
				// или редирект, или очистка формы
			}
		} catch(error) {
		console.error("Ошибка регистрации:", error);
		alert(error.response?.data?.message || "Произошла ошибка");
		}
	};

	const [emailLogin, setEmailLogin] = useState("");
	const [passwordLogin, setPasswordLogin] = useState("");
	// const handleSubmitLogin = async(e) => {
	// 	e.preventDefault();

	// 	try {
	// 		const response = await axios.post(
	// 			getApiUrl("/backend/wp-json/users/v2/login/"), {
	// 			password: passwordLogin,
	// 			email: emailLogin,
	// 		});

	// 		console.log('login', response)

	// 		if (response.status === 200) {
	// 			alert("Вход выполнен");
	// 			// console.log(response)
	// 			// или редирект, или очистка формы
	// 		}
	// 	} catch(error) {
	// 	console.error("Ошибка регистрации:", error);
	// 	alert(error.response?.data?.message || "Произошла ошибка");
	// 	}
	// };

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		try {
			// 1. Авторизация
			const response = await axios.post(
			getApiUrl("/backend/wp-json/users/v2/login/"),
			{
				password: passwordLogin,
				email: emailLogin,
			}
			);

			console.log("login", response);

			if (response.status === 200) {
			alert("Вход выполнен");
			}
		} catch (error) {
			console.error("Ошибка входа или запроса:", error);
			alert(error.response?.data?.message || "Произошла ошибка");
		}
	};


	

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
                
                {view === 1 ? 
                <>
                
                <div className={modalContentTop}>
                  <div className={modalTitle}>Войти</div>
                  <div className={modalSocials}>
                    <div>
                      <Google />
                    </div>
                    <div>
                      <Google />
                    </div>
                    <div>
                      <Google />
                    </div>
                  </div>
                  <div className={modalTextWithLine}>
                    <p>Или войти с&nbsp;помощью&nbsp;эл. почты</p>
                  </div>

                  <form onSubmit={handleSubmitLogin} className={modalForm}>
                    <input type="text" placeholder="Электронная почта" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
                    <PasswordInput text='Пароль' value={passwordLogin} onChange={setPasswordLogin} />
                    <div className={cx(checkBox, css`
                      label::before {
                        border-color: rgba(16, 16, 16, 0.2);
                      }
                      label::after {
                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.883 6.88398L9.883 17.884C9.39485 18.3721 8.60339 18.3721 8.11523 17.884L3.11523 12.884L4.883 11.1162L8.99912 15.2323L19.1152 5.11621L20.883 6.88398Z" fill="%23fff"/></svg>');
                                    
                      }
                      input:checked ~ label {
                        &::before {
                          background-color: ${theme.colors.purple};
                          border-color: ${theme.colors.purple};
                        }
                      }
                    `)}>
                      <input type="checkbox" id="logex1" />
                      <label htmlFor="logex1">Запомнить меня</label>
                    </div>

                    <Button 
						type="submit"
						className={css`width: 100%!important;margin-bottom: 16px;`}
						onClick={handleSubmitLogin}
					>Войти</Button>
                  </form>

                  {/* <Link href="/lk" className={css`width: 100%;`}>
                    <Button 
						onClick={onClose} 
						className={css`width: 100%!important;margin-bottom: 16px;`}
					>Войти</Button>
                  </Link> */}
                  <div className={css`
                    color: ${theme.colors.purple};
                    font-size: 14px;
                    line-height: 1.16;
                    text-align: center;
                    cursor: pointer;
                  `} onClick={()=>setView(3)}>Забыли пароль?</div>
                </div>
                
                <div className={modalContentBottom}>
                  <div className={css`font-size: 14px;line-height: 1.16;`}>Еще нет аккаунта?&nbsp;<div className={css`color: ${theme.colors.purple};display: inline;cursor:pointer;`} onClick={()=>setView(2)}>Зарегистрироваться</div></div>
                  <div className={css`font-size: 14px;line-height: 1.16;`}>При регистрации и&nbsp;входе вы&nbsp;соглашаетесь <Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>с&nbsp;условиями использования</Link> и&nbsp;<Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>политикой конфиденциальности</Link></div>
                </div>
                </>
                : view === 2 ?
                <>
                  <div className={modalContentTop}>
                    <div className={modalTitle}>Зарегистрироваться</div>
                    <form onSubmit={handleSubmit} className={modalForm}>
                      <input type="text" placeholder="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input type="text" placeholder="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      <input type="text" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <PasswordInput text='Пароль' value={password} onChange={setPassword} />
                      <PasswordInput text='Подтверждение пароля' value={confirmPassword} onChange={setConfirmPassword} />
                      <Button type="submit" className={css`width: 100%!important;margin-bottom: 24px;`} onClick={handleSubmit}>Зарегистрироваться</Button>

					  {regResponse && <>
					  <h2 style={{color: 'green', fontSize: 14, margin: '5px 0'}}>Response: </h2>
					  <p style={{color: 'green', fontSize: 14, margin: '5px 0'}}>{regResponse.data.message}</p>
					  <a style={{color: 'green', fontSize: 14, margin: '5px 0'}} href={regResponse.data.data.link} target='_blank'>{regResponse.data.data.link}</a>
					  </>}
                    </form>
                    <div className={modalTextWithLine}>
                      <p>Зарегистрироваться через</p>
                    </div>
                    <div className={cx(modalSocials, css`margin-bottom: 0;`)}>
                      <div><Google/></div>
                      <div><Google/></div>
                      <div><Google/></div>
                    </div>
                  </div>
                  <div className={modalContentBottom}>
                    <div className={css`font-size: 14px;line-height: 1.16;`}>Уже есть аккаунт?&nbsp;<div className={css`color: ${theme.colors.purple};display: inline;cursor:pointer;`} onClick={()=>setView(1)}>Войти</div></div>
                    <div className={css`font-size: 14px;line-height: 1.16;`}>При регистрации и&nbsp;входе вы&nbsp;соглашаетесь <Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>с&nbsp;условиями использования</Link> и&nbsp;<Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>политикой конфиденциальности</Link></div>
                  </div>
                </>
                : 
                <>
                  <div className={cx(modalContentTop, css`padding: 40px 40px 8px;`)}>
                    <div className={modalTitle}>Забыли пароль?</div>
                    <div className={css`font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Введите свое имя пользователя или адрес электронной почты, и&nbsp;мы&nbsp;вышлем вам ссылку для сброса пароля.</div>
                    <form action="" className={modalForm}>
                      <input type="text" placeholder="Электронная почта или имя пользователя" />
                      <div className={css`
                        display: flex;
                        gap: 16px;
                        justify-content: space-between;

                        div {
                          flex: 1;
                          padding: 14px 18px;
                          justify-content: center;
                        };
                      `}>
                        <Button>Сбросить пароль</Button>
                        <Button className={css`
                          background-color: #fff!important;
                          color: ${theme.colors.purple}!important;
                        `} onClick={()=>setView(1)}>Назад</Button>
                      </div>
                    </form>
                    <div className={modalTextWithLine}>
                      <p>Зарегистрироваться через</p>
                    </div>
                    <div className={cx(modalSocials, css`margin-bottom: 0;`)}>
                      <div><Google/></div>
                      <div><Google/></div>
                      <div><Google/></div>
                    </div>
                  </div>
                  <div className={modalContentBottom}>
                    <div className={css`font-size: 14px;line-height: 1.16;`}>Уже есть аккаунт?&nbsp;<div className={css`color: ${theme.colors.purple};display: inline;cursor:pointer;`} onClick={()=>setView(1)}>Войти</div></div>
                    <div className={css`font-size: 14px;line-height: 1.16;`}>При регистрации и&nbsp;входе вы&nbsp;соглашаетесь <Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>с&nbsp;условиями использования</Link> и&nbsp;<Link href="/lk" className={css`color: ${theme.colors.purple};display:inline;`}>политикой конфиденциальности</Link></div>
                  </div>
                </>
                }
                

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
};
  