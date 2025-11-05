"use client"

import Link from "next/link";

import { css, cx } from "@emotion/css";
import { Button, input, inputItem, UserMain } from "@/styles/ui";
import EditIcon from "@/public/images/svg/edit.svg";
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import axios from "axios";
import { getApiUrl } from "@/functions/functions";
import styled from "@emotion/styled";

//TODO перенести весь компонент в основной page.jsx

const UserMainScreen = () => {
    const theme = useTheme();

	const [userData, setUserData] = useState({
		email: '',
		first_name: '',
		last_name: '',
		phone: '',
		info: {
			name: '',
			address: '',
			rs: '',
			inn: '',
			kpp: '',
			ogrn: '',
		},
	});

	const handleGetUserInfo = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);

		const token = authToken?.state?.token;
		try {
			const response = await axios.get(
			getApiUrl("/backend/wp-json/account/v2/profile/"),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log("get ", response);

			if (response.status === 200) {
				const data = response.data;
				setUserData({
					email: data.data?.email || '',
					first_name: data.data?.first_name || '',
					last_name: data.data?.last_name || '',
					phone: data.data?.phone || '',
					info: {
						name: data.info?.name || '',
						address: data.info?.address || '',
						rs: data.info?.rs || '',
						inn: data.info?.inn || '',
						kpp: data.info?.kpp || '',
						ogrn: data.info?.ogrn || '',
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(()=>{
		handleGetUserInfo()
	},[])

	const [infoChangeSuccess, setInfoChangeSuccess] = useState(false);
	
	useEffect(()=>{
		infoChangeSuccess && setTimeout(()=>{
			setInfoChangeSuccess(false)
		}, 3000)
	}, [infoChangeSuccess])

	const handleUpdateUserInfo = async(number) => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;

		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/account/v2/update/"),
			number === 1 ?
			{
				first_name: userData.first_name,
				last_name: userData.last_name,
				phone: userData.phone,
				// email: userData.email
			}
			:
			{
				info: {
					name: userData.info.name,
					address: userData.info.address,
					rs: userData.info.rs,
					inn: userData.info.inn,
					kpp: userData.info.kpp,
					ogrn: userData.info.ogrn,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);

			if (response.status === 200) {
				console.log("Update successful", response.data);
				setInfoChangeSuccess(true)
			}
		} catch (error) {
			console.error("Update error", error);
		}
	};

    const [activeTab, setActiveTab] = useState(1)
        const tabItem = css`
            background-color: #fff;
            transition: ${theme.transition};
            padding: 14px 32px;
            cursor: pointer;
            border-radius: 32px;
        `;
        const tabItemActive = css`
            background-color: ${theme.colors.purple};
            color: #fff;
        `;

	// Установить новый пароль:
	// POST: https://dev.goconf.ru/wp-json/account/v2/password/
	// Параметры: 
	// password*
	// confirm_password*


	const Error = styled.div`
		font-size: 12px;
		color: #FC1234;
		padding-left: 10px;
	`;

	const [passwordChange, setPasswordChange] = useState('');
	const [passwordChangeConfirm, setPasswordChangeConfirm] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
	
	useEffect(()=>{
		passwordChangeSuccess && setTimeout(()=>{
			setPasswordChangeSuccess(false)
		}, 3000)
	}, [passwordChangeSuccess])

	const handleUpdateUserPassword = async () => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;

		console.log('pswd change', passwordChange, passwordChangeConfirm);

		// 1. Проверка на пустые пароли
		if (!passwordChange.trim() || !passwordChangeConfirm.trim()) {
			setPasswordError('Заполните пароли');
			return;
		}

		// 2. Проверка на совпадение
		if (passwordChange !== passwordChangeConfirm) {
			setPasswordError('Пароли не совпадают');
			return;
		}

		// 3. Проверка сложности пароля
		const strongPasswordRegex = /^(?=.*\d).{8,}$/; // хотя бы одна цифра и минимум 8 символов
		if (!strongPasswordRegex.test(passwordChange)) {
			setPasswordError('Пароль должен содержать не менее 8 символов и содержать хотя бы одну цифру');
			return;
		}

		// Если всё ок
		setPasswordError('');
		setPasswordChangeSuccess(true);
		try {
			const response = await axios.post(
			getApiUrl('/backend/wp-json/account/v2/password/'),
			{
				password: passwordChange,
				confirm_password: passwordChangeConfirm,
			},
			{
				headers: {
				Authorization: `Bearer ${token}`,
				},
			}
			);

			if (response.status === 200) {
			console.log('Update password successful', response.data);
			}
		} catch (error) {
			console.error('Update password error', error);
		}
	};


    return(
        <UserMain
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                font-family: Impact;
                font-size: 36px;
                line-height: 1.12;
                margin-bottom: 16px;

                @media(max-width: 575px) {
                    font-size: 28px;
                }
            `}>Мой профиль</div>
            {/* <div className={css`
                display: flex;
                gap: 4px;
                align-items: center;
                margin-bottom: 24px;
            `}>
                <div>Статус профиля:</div>
                <Link  href="/cabinet/status" className={css`color: ${theme.colors.purple};display: flex;align-items: center;gap: 4px;`}>Базовый <EditIcon /></Link>
            </div> */}
            <div className={css`
                display: flex;
                gap: 4px;
                padding: 4px;
                background-color: #fff;
                border-radius: 28px;
                max-width: max-content;
                margin-bottom: 32px;

                @media(max-width: 575px) {
                    flex-direction: column;
                    max-width: 100%;
                }
            `}>
                <div className={cx(tabItem, activeTab === 1 && tabItemActive)} onClick={()=>setActiveTab(1)}>Личные данные</div>
                <div className={cx(tabItem, activeTab === 2 && tabItemActive)} onClick={()=>setActiveTab(2)}>Данные об организации</div>
            </div>
            <AnimatePresence>
                {activeTab === 1 ? (
                    <motion.div
                        key="tab1"
                        initial={{opacity: 0, y: 40}}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <div className={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 24px;
                            margin-bottom: 40px;
                        `}>
                            <div className={inputItem}>
                                <p>Имя</p>
                                <input type="text" className={input} value={userData.first_name} placeholder="Имя" onChange={(e) => setUserData(prev => ({ ...prev, first_name: e.target.value }))} />
                            </div>
                            <div className={inputItem}>
                                <p>Фамилия</p>
                                <input type="text" className={input} value={userData.last_name} placeholder="Фамилия" onChange={(e) => setUserData(prev => ({ ...prev, last_name: e.target.value }))} />
                            </div>
                            <div className={inputItem}>
                                <p>E-mail</p>
                                <input type="email" className={input} value={userData.email} placeholder="Электронная почта" 
								// onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
								readOnly
								style={{opacity: 0.64, pointerEvents: 'none'}}
								 />
                            </div>
                            <div className={inputItem}>
                                <p>Телефон</p>
                                <input type="text" className={input} value={userData.phone} placeholder="Телефон" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            </div>
								{infoChangeSuccess && 
									<AnimatePresence>
										<motion.div 
											initial={{ opacity: 0, x: -20, }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 0 }}
											transition={{ duration: .3 }}
											style={{width: '100%'}}
											>
											<Error style={{color: theme.colors.purple}}>Данные успешно сохранены</Error>
										</motion.div>
									</AnimatePresence>
								}
                            <Button 
								// className={cx(css`opacity: .2; pointer-events: none;`)}
								onClick={()=>handleUpdateUserInfo(1)}
							>
								<p>
									<span>Сохранить изменения</span>
									<span>Сохранить изменения</span>
								</p>
							</Button>
                        </div>
                        <div className={css`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 24px;
                        `}>
                            <div className={css`
                                font-family: Impact;
                                font-size: 36px;
                                line-height: 1.12;
                                margin-bottom: 32px;
                                flex: 0 1 100%;
                                max-width: 100%;

                                @media(max-width: 575px) {
                                    margin-bottom: 0;
                                    font-size: 28px;
                                }
                            `}>Изменить пароль</div>
                            <div className={inputItem}>
                                <p>Пароль</p>
                                <PasswordInput text='Введите пароль' value={passwordChange} onChange={setPasswordChange} style={passwordError ? { borderColor: "#FC1234" } : {}} />
								{passwordChangeSuccess && 
									<AnimatePresence>
										<motion.div 
											initial={{ opacity: 0, x: -20, }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 0 }}
											transition={{ duration: .3 }}
											>
											<Error style={{color: theme.colors.purple}}>Пароль успешно изменен</Error>
										</motion.div>
									</AnimatePresence>
								}
								{passwordError && 
									<AnimatePresence>
										<motion.div 
											initial={{ opacity: 0, x: -20, }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 0 }}
											transition={{ duration: .3 }}
											>
											<Error>{passwordError}</Error>
										</motion.div>
									</AnimatePresence>
								}
                            </div>
                            <div className={inputItem}>
                                <p>Повторите пароль</p>
                                <PasswordInput text='Повторите пароль' value={passwordChangeConfirm} onChange={setPasswordChangeConfirm} style={passwordError ? { borderColor: "#FC1234" } : {}} />
                            </div>
                            <Button
								onClick={()=>handleUpdateUserPassword()}
							>
								<p>
									<span>Сохранить изменения</span>
									<span>Сохранить изменения</span>
								</p>
							</Button>
                        </div>
                    </motion.div>
                ) : (
                <motion.div
                    key="tab2"
                    initial={{opacity: 0, y: 40}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .3 }}
                    
                >
                    <div className={css`margin-bottom: 32px;`}>Юридическая информация, необходимая для выставления счетов</div>
                    <div className={css`
                        display: flex;
                        flex-wrap: wrap;
                        gap: 24px;
                    `}>
                        <div className={inputItem}>
                            <p>Юридическое наименование</p>
                            <input type="text" className={input} placeholder='Юридическое наименование' 
							value={userData.info.name}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								name: e.target.value
							}
							}))}
							/>
                        </div>
                        <div className={inputItem}>
                            <p>Юридический адрес</p>
                            <input type="text" className={input} placeholder="Юридический адрес"
							value={userData.info.address}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								address: e.target.value
							}
							}))}
							/>
                        </div>
                        <div className={inputItem}>
                            <p>Рассчетный счет</p>
                            <input type="text" className={input} placeholder='Рассчетный счет'
							value={userData.info.rs}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								rs: e.target.value
							}
							}))} 
							/>
                        </div>
                        <div className={inputItem}>
                            <p>ИНН</p>
                            <input type="text" className={input} placeholder="ИНН"
							value={userData.info.inn}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								inn: e.target.value
							}
							}))}  />
                        </div>
                        <div className={inputItem}>
                            <p>КПП</p>
                            <input type="text" className={input} placeholder="КПП"
							value={userData.info.kpp}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								kpp: e.target.value
							}
							}))}
							/>
                        </div>
                        <div className={inputItem}>
                            <p>ОГРН</p>
                            <input type="text" className={input} placeholder="ОГРН"
							value={userData.info.ogrn}
							onChange={(e) =>
							setUserData(prev => ({
							...prev,
							info: {
								...prev.info,
								ogrn: e.target.value
							}
							}))} 
							/>
                        </div>
						{infoChangeSuccess && 
									<AnimatePresence>
										<motion.div 
											initial={{ opacity: 0, x: -20, }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 0 }}
											transition={{ duration: .3 }}
											style={{width: '100%'}}
											>
											<Error style={{color: theme.colors.purple}}>Данные успешно сохранены</Error>
										</motion.div>
									</AnimatePresence>
								}
                        <Button onClick={()=>handleUpdateUserInfo(2)}>Сохранить изменения</Button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </UserMain>
    )
};

export default UserMainScreen;