"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css, cx } from '@emotion/css';
import { Button, checkBox } from '@/styles/ui';
import { useTheme } from '@emotion/react';
import Google from "@/public/images/svg/google.svg";
import Yandex from "@/public/images/svg/yandex.svg";
import { PasswordInput } from '@/components/ui/PasswordInput';
import Link from 'next/link';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';
import { useAuthStore } from '@/store/useAuthStore';

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
	const login = useAuthStore.getState().login;

	const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
	// href="https://accounts.google.com/o/oauth2/v2/auth?client_id=879586637662-g3v612m81nt3lktccs13nvfg63v8qoqg.apps.googleusercontent.com&redirect_uri=http://localhost:3000/social-login/google&response_type=code&scope=openid%20email%20profile&access_type=online&prompt=consent"
	const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=879586637662-g3v612m81nt3lktccs13nvfg63v8qoqg.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(googleRedirectUri)}&response_type=code&scope=openid%20email%20profile&access_type=online&prompt=consent`;
	
	const yandexRedirectUri = process.env.NEXT_PUBLIC_YANDEX_REDIRECT_URI;
	// href="https://oauth.yandex.ru/authorize?response_type=code&client_id=27b4e4a2dfa544ec9bc5598b73516a32&redirect_uri=http://localhost:3000/social-login/yandex"
	const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=27b4e4a2dfa544ec9bc5598b73516a32&redirect_uri=${encodeURIComponent(yandexRedirectUri)}`;



	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");

	const [errors, setErrors] = useState({});

	// const [regResponse, setRegResponse] = useState(null)

	const [errorMessageRegistration, setErrorMessageRegistration] = useState(null);
	const handleSubmit = async(e) => {
		e.preventDefault();

		// const newErrors = {};
		// if (!firstName.trim()) newErrors.firstName = "Введите имя";
		// if (!lastName.trim()) newErrors.lastName = "Введите фамилию";
		// if (!email.trim()) newErrors.email = "Введите email";
		// if (!password.trim()) newErrors.password = "Введите пароль";

		// setErrors(newErrors);

		

		try {
			const response = await axios.post(
				getApiUrl("/backend/wp-json/users/v2/register/"), {
				firstname: firstName,
				lastname: lastName,
				password: password,
				// confirm_password: confirmPassword,
				email: email,
			});

			if (response.status === 200) {
				console.log('registration', response)
				onClose();
				setErrorMessageRegistration(null)

				//пробный логин после авторизации
				try {
					const response = await axios.post(
					getApiUrl("/backend/wp-json/users/v2/login/"),
						{
							password: password,
							email: email,
						}
					);

					if (response.status === 200) {
						login(response.data.token);
						onClose();
					}
				} catch (error) {
					console.log(error.response?.data?.message)
				}
				//пробный логин после авторизации
			}
		} catch(error) {
			console.error("Ошибка регистрации:", error);
			console.log(error.response?.data?.message)
			// error.response?.data?.message !== 'Parameter required' && setErrorMessageRegistration(error.response?.data?.message)
			setErrorMessageRegistration(error.response?.data?.message)
		}
	};

	const [emailLogin, setEmailLogin] = useState("");
	const [passwordLogin, setPasswordLogin] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/users/v2/login/"),
				{
					password: passwordLogin,
					email: emailLogin,
				}
			);
			console.log("login", response);

			if (response.status === 200) {
				login(response.data.token);
				onClose();
				setErrorMessage(null)
			}
		} catch (error) {
			console.error("Ошибка входа или запроса:", error);
			console.log(error.response?.data?.message)
			setErrorMessage(error.response?.data?.message)
		}
	};



	const [emailReset, setEmailReset] = useState("");

	const handleSubmitReset = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/users/v2/password-reset/"),
				{
					email: emailReset,
				}
			);
			console.log("reset", response);

			if (response.status === 200) {
				// login(response.data.token);
				// onClose();
				// setErrorMessage(null)
			}
		} catch (error) {
			console.error("Ошибка восстановления пароля:", error);
			// console.log(error.response?.data?.message)
			// setErrorMessage(error.response?.data?.message)
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
                    <a href={googleAuthUrl}>
						<Google />
					</a>
                    <a href={yandexAuthUrl}>
                      <Yandex />
                    </a>
                  </div>
                  <div className={modalTextWithLine}>
                    <p>Или войти с&nbsp;помощью&nbsp;эл. почты</p>
                  </div>

                  <form onSubmit={handleSubmitLogin} className={modalForm}>
                    <input type="email" placeholder="Электронная почта" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
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
						$button
						type="submit"
						style={{width: '100%'}}
						onClick={handleSubmitLogin}
					>
						<p>
							<span>Войти</span>
							<span>Войти</span>
						</p>
					</Button>
					{errorMessage && <p style={{color: '#f00', fontSize: 14, textAlign: 'center'}}>{errorMessage}</p>}
                  </form>
				  

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
						
						<input type="email" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)} />
						<PasswordInput text='Пароль' value={password} onChange={setPassword} />
						{/* <PasswordInput text='Подтверждение пароля' value={confirmPassword} onChange={setConfirmPassword} /> */}
						<Button $button type="submit" style={{width: '100%'}} onClick={handleSubmit}>
							<p>
								<span>Зарегистрироваться</span>
								<span>Зарегистрироваться</span>
							</p>
						</Button>
					
						{errorMessageRegistration && <p style={{color: '#f00', fontSize: 14, textAlign: 'center'}}>{errorMessageRegistration}</p>}
                    </form>
                    <div className={modalTextWithLine}>
                      <p>Зарегистрироваться через</p>
                    </div>
                    <div className={cx(modalSocials, css`margin-bottom: 0;`)}>
						<a href={googleAuthUrl}>
							<Google />
						</a>
						<a href={yandexAuthUrl}>
							<Yandex />
						</a>
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
                    <div className={css`font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Введите адрес электронной почты, и&nbsp;мы&nbsp;вышлем вам ссылку для сброса пароля.</div>
                    <form onSubmit={handleSubmitReset} className={modalForm}>
                      <input type="email" placeholder="Электронная почта" value={emailReset} onChange={(e) => setEmailReset(e.target.value)} />
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
                        <Button $button type="submit">
							<p>
								<span>Сбросить пароль</span>
								<span>Сбросить пароль</span>
							</p>
						</Button>
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
						<a href={googleAuthUrl}>
							<Google />
						</a>
						<a href={yandexAuthUrl}>
							<Yandex />
						</a>
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
  