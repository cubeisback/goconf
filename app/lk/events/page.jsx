"use client"

import { css, cx } from "@emotion/css";
import { Button, Container, input, inputItem, inputRadio, inputRadioActive, LkWrapper, UserEventsBlock, UserEventsBlockHead, UserEventsBlockItem, UserEventsBlockItemTop, UserEventsBlockItemTopIcons, UserEventsBlockItemTopPublishDate, UserEventsBlockItemTopStatus, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import { motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import EditIcon from "@/public/images/svg/edit.svg";
import RemoveIcon from "@/public/images/svg/remove.svg";
import CheckIcon from "@/public/images/svg/check.svg";
import UpIcon from "@/public/images/svg/up.svg";
import InfoIcon from "@/public/images/svg/info.svg";
import DropdownInput from "@/components/ui/DropdownInput";
import LkMenu from "@/components/ui/LkMenu";
import Link from "next/link";
import axios from "axios";
import { formatDate, formatPrice, getApiUrl } from "@/functions/functions";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6', 'Ы'];

const UserEvents = () => {
    const theme = useTheme();
    const [view, setView] = useState(1);
	// const [editId, setEditId] = useState(null);
    
    // TODO
    // Разобраться с обложкой и анонсом (cover anons). Не везде есть оба значения


    const [radios, setRadios] = useState(1);


	// https://dev.goconf.ru/wp-json/account/v2/events/
	const [events, setEvents] = useState(null)
	const handleGetEvents = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;

			try {
				const response = await axios.get(
				getApiUrl("/backend/wp-json/account/v2/events/"),
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('events', response.data.items)
				if (response.status === 200) {
					setEvents(response.data.items)
					// console.log("events", response.data);
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	};

	// TODO
	// дата старта событий
	// добавить поиски у выпадающих списков
	// проверка токена
	// удалить дату публикации если пустая
	// TODO

	useEffect(() => {
		handleGetEvents()
	}, []);

	// https://dev.goconf.ru/wp-json/account/v2/events/remove/
	const handleRemoveEvent = async(id) => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;

			try {
				const response = await axios.get(
				getApiUrl(`/backend/wp-json/account/v2/events/remove/?id=${id}`),
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				// console.log('events', response.data.items)
				if (response.status === 200) {
					// setEvents(response.data.items)
					// console.log("events", response.data);
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	}


	const [dataForPayments, setDataForPayment] = useState({
		id: '',
		title: '',

		promo: 'cost_7',
		tariff: 0,
		pay: 'pay_ur',

		info: {
			name: '',
			address: '',
			inn: '',
			kpp: '',
		},
	});

	useEffect(()=>{
		console.log(dataForPayments)
	}, [dataForPayments])

	const getTariffs = async() => {
			try {
				const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/promotion/tariffs/"),
				);
				console.log('tariffs', response.data)
				if (response.status === 200) {
					// console.log("events", response.data);
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	};

	const [tariffOne, setTariffOne] = useState(true);
	const [tariffTwo, setTariffTwo] = useState(false);


	const getHist = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
			try {
				const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/promotion/history/"),
					{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('history', response.data)
				if (response.status === 200) {
					// console.log("events", response.data);
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	};

	const getUrData = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
			try {
				const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/promotion/ur_info/"),
					{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('ur_info', response.data)
				if (response.status === 200) {
					setDataForPayment((prev) => ({
						...prev,
						info: {
							name: response.data.name,
							address: response.data.address,
							inn: response.data.inn,
							kpp: response.data.kpp
						}
					}));
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	};

	const addOrder = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
			try {
				const response = await axios.post(
				getApiUrl("/backend/wp-json/account/v2/promotion/add/"),
				dataForPayments,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('addOrder', response.data)
				if (response.status === 200) {
					// console.log("events", response.data);
				}
			} catch (error) {
				console.error("Update password error", error);
			}
	};
	


    return(
        <LkWrapper>
            <Container>
                <div style={{display: 'flex', gap: 64}}>
                    <LkMenu />
                
        {view === 1 && 
        <UserMain
        	initial={{ opacity: 0, x: 50 }}
        	animate={{ opacity: 1, x: 0 }} 
        	transition={{ duration: .3 }}>
            <UserMainTitles>
                <UserMainTitlesTitle>Мои мероприятия</UserMainTitlesTitle>
                {/* <Link href="/lk/add">+ Добавить событие</Link> */}
				<Link href="/lk/events/add"><Button 
				// onClick={()=>setView(5)}
				>
					<p>
						<span>+ Добавить событие</span>
						<span>+ Добавить событие</span>
					</p>
				</Button>
				</Link>
            </UserMainTitles>
            
            <div style={{marginBottom: '32px', display: 'flex', gap: '16px'}}>
                <div style={{flex: '0 1 300px'}}>
                    <p style={{marginBottom: '8px', color: '#47474D', fontSize: 14, lineHeight: 1.16}}>Статус</p>
                    <DropdownInput options={options} placeholder={'Тематика'} isSimple />
                </div>
                <div style={{flex: '0 1 300px'}}>
                    <p style={{marginBottom: '8px', color: '#47474D', fontSize: 14, lineHeight: 1.16}}>Дата проведения</p>
                    <DropdownInput options={options} placeholder={'Предстоящие'} isSimple />
                </div>
            </div>

            <UserEventsBlock>
				{events && events.map((event, index) => (
					<div key={index}>
					<UserEventsBlockHead>
						<div style={{display: 'flex', alignItems: 'center', fontSize: 14}}>Тариф <b style={{marginLeft: 4}}>&laquo;Базовый&raquo;</b> <span style={{width: 20, height: 20, backgroundColor: '#D7DADD', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',  marginLeft: 8}}>?</span></div>
                        <div style={{fontSize: 14}}>Подключите тариф <span style={{color: '#8553F9', fontWeight: 500}}>&laquo;Расширенный&raquo;</span> для доступа ко&nbsp;всем возможностям</div>
					</UserEventsBlockHead>
					<UserEventsBlockItem>
						<UserEventsBlockItemTop>
							{event.status === 'publish' ? 
							<UserEventsBlockItemTopStatus style={{backgroundColor: '#69B90F'}}>Опубликовано</UserEventsBlockItemTopStatus>
							: event.status === 'draft' ? 
							<UserEventsBlockItemTopStatus style={{backgroundColor: '#B5B7B9'}}>Черновик</UserEventsBlockItemTopStatus>
							:
							<UserEventsBlockItemTopStatus style={{backgroundColor: '#8553F9'}}>На модерации</UserEventsBlockItemTopStatus>
							}
							
							<UserEventsBlockItemTopPublishDate>Дата публикации: {event.date_publish}</UserEventsBlockItemTopPublishDate>
							<UserEventsBlockItemTopIcons>
								<Link href={`/lk/events/edit/?id=${event.id}`}>
									<EditIcon  />
								</Link>
								<RemoveIcon onClick={()=>handleRemoveEvent(event.id)} />
							</UserEventsBlockItemTopIcons>
						</UserEventsBlockItemTop>
						<div style={{marginBottom: 8, fontSize: 20, fontWeight: 500, lineHeight: 1.4}}>{event.title && event.title}</div>
						{!event.online &&
							<div className={css`margin-bottom: 24px;color: #8553F9;font-weight: 500;`}>{event.cost && formatPrice(event.cost)} руб.</div>
						}
						<div className={css`
                                display: flex;flex-direction: column;gap: 8px;margin-bottom: 24px;

                                @media(max-width: 575px) {
                                    width: 100%;
                                }
                        `}>
                            <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Даты проведения:</b>&nbsp; 
															{
																(() => {
																	const [d1, m1, y1] = event.date_start.split('.');
																	const [d2, m2, y2] = event.date_end.split('.');
							
																	if (event.date_start === event.date_end) {
																	return formatDate(event.date_start);
																	} else if (m1 === m2 && y1 === y2) {
																	// Берём отформатированную дату и убираем оттуда число, оставляя "июня 2025"
																	const formatted = formatDate(event.date_start);
																	const [, monthAndYear] = formatted.split(' ', 2); // может вернуть только месяц
																	const rest = formatted.slice(formatted.indexOf(' ') + 1); // "июня 2025"
																	return `${d1}–${d2} ${rest}`;
																	} else {
																	return (
																		<>
																		{formatDate(event.date_start)} -<br />
																		{formatDate(event.date_end)}
																		</>
																	);
																	}
																})()
																}
							</div>
                            <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Организатор:</b> ????</div>
                        </div>
						<Button onClick={()=>{
							setDataForPayment((prev) => ({
								...prev,
								id: event.id,
								title: event.title
							}));
							getUrData();
							setView(2)}}>Опции для продвижения</Button>
					</UserEventsBlockItem>
					</div>
				))}
				{/* <p>статичные</p>
                <div className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;

                    @media(max-width: 575px) {
                        padding: 16px;
                    }
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        margin-bottom: 24px;

                        @media(max-width: 575px) {
                            flex-wrap: wrap;
                            justify-content: space-between;
                        }
                    `}>
                        <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #8553F9; font-size: 14px; line-height: 1.16;`}>На модерации</div>
                        <div className={css`
                            flex: 1; font-size: 14px; line-height: 1.16; color: #47474D;

                            @media(max-width: 575px) {
                                order: 1;
                                flex: 0 1 100%;
                                max-width: 100%;
                            }
                        `}>Дата публикации: 27 сентября 2024</div>
                        <div className={css`display: flex; gap: 16px;`}>
                            <EditIcon />
                            <RemoveIcon />
                        </div>
                    </div>
                    <div className={css`margin-bottom: 8px;font-size: 20px;font-weight: 500;line-height: 1.4;`}>Налоговая и юридическая безопасность селлера на маркетплейсах</div>
                    <div className={css`margin-bottom: 24px;color: #8553F9;font-weight: 500;`}>32 900 руб.</div>
                    <div className={css`
                        display: flex;justify-content: space-between;align-items: flex-end;

                        @media(max-width: 575px) {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 16px;
                        }
                    `}>
                        <div>
                            <div className={css`
                                display: flex;flex-direction: column;gap: 8px;margin-bottom: 24px;

                                @media(max-width: 575px) {
                                    width: 100%;
                                }
                            `}>
                                <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Даты проведения:</b> 25-27 июля 2024</div>
                                <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Организатор:</b> ЦРБК</div>
                            </div>
                            <Button className={cx(css`
                                background-color: #fff!important;color: #8553F9!important;
                                
                                @media(max-width: 575px) {
                                    width: 100%!important;
                                }
                            `)} onClick={()=>setView(2)}>Продвигать событие</Button>
                        </div>
                        <div className={css`
                            border-radius: 16px;
                            background-color: #F5F7FA;
                            padding: 12px 16px;
                            display: flex;
                            gap: 8px;

                            @media(max-width: 575px) {
                                width: 100%;

                                div {
                                    flex: 1;
                                }
                            }

                            p {
                                margin-bottom: 4px;
                                font-weight: 500;
                            }

                            span {
                                font-size: 14px;
                                line-height: 1.16;
                            }
                        `}>
                            <div>
                                <p>327</p>
                                <span>Просмотров</span>
                            </div>
                            <div>
                                <p>25</p>
                                <span>Переходов</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={css`
                        background-color: #8553F9; border-radius: 28px 28px 0px 0px; padding: 16px 32px; display: flex; justify-content: space-between; color: #fff;

                        @media(max-width: 575px) {
                            flex-direction: column;
                        }
                    `}>
                        <div className={css`display: flex;align-items: center;gap: 16px;`}><UpIcon/> Событие продвигается</div>
                        <div>До окончания осталось <b>7 дней</b></div>
                    </div>
                 
                    <div className={css`
                        border-radius: 0 0 28px 28px;
                        background-color: #fff;
                        box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                        padding: 24px 32px;

                        @media(max-width: 575px) {
                            padding: 16px;
                        }
                    `}>
                        <div className={css`
                            display: flex;
                            gap: 16px;
                            align-items: center;
                            margin-bottom: 24px;

                            @media(max-width: 575px) {
                                flex-wrap: wrap;
                                justify-content: space-between;
                            }
                        `}>
                            <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #69B90F; font-size: 14px; line-height: 1.16;`}>Опубликовано</div>
                            <div className={css`
                                flex: 1; font-size: 14px; line-height: 1.16; color: #47474D;

                                @media(max-width: 575px) {
                                    order: 1;
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                }
                            `}>Дата публикации: 27 сентября 2024</div>
                            <div className={css`display: flex; gap: 16px;`}>
                                <EditIcon />
                                <RemoveIcon />
                            </div>
                        </div>
                        <div className={css`margin-bottom: 8px;font-size: 20px;font-weight: 500;line-height: 1.4;`}>Налоговая и юридическая безопасность селлера на маркетплейсах</div>
                        <div className={css`margin-bottom: 24px;color: #8553F9;font-weight: 500;`}>бесплатно</div>
                        <div className={css`
                            display: flex;justify-content: space-between;align-items: flex-end;

                            @media(max-width: 575px) {
                                flex-direction: column;
                                align-items: flex-start;
                                gap: 16px;
                            }
                        `}>
                            <div>
                                <div className={css`
                                    display: flex;flex-direction: column;gap: 8px;

                                    @media(max-width: 575px) {
                                        width: 100%;
                                    }
                                `}>
                                    <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Даты проведения:</b> 25-27 июля 2024</div>
                                    <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Организатор:</b> ЦРБК</div>
                                </div>
                            </div>
                            <div className={css`
                                border-radius: 16px;
                                background-color: #F5F7FA;
                                padding: 12px 16px;
                                display: flex;
                                gap: 8px;

                                @media(max-width: 575px) {
                                    width: 100%;

                                    div {
                                        flex: 1;
                                    }
                                }

                                p {
                                    margin-bottom: 4px;
                                    font-weight: 500;
                                }

                                span {
                                    font-size: 14px;
                                    line-height: 1.16;
                                }
                            `}>
                                <div>
                                    <p>327</p>
                                    <span>Просмотров</span>
                                </div>
                                <div>
                                    <p>25</p>
                                    <span>Переходов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;

                    @media(max-width: 575px) {
                        padding: 16px;
                    }
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        margin-bottom: 24px;

                        @media(max-width: 575px) {
                            flex-wrap: wrap;
                            justify-content: space-between;
                        }
                    `}>
                        <div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #FF5B3B; font-size: 14px; line-height: 1.16;display: flex;align-items:center;gap:8px;position: relative;`}>
                            <p>Отклонено</p>
                            <div className={css`
                                svg {
                                    margin-bottom: -3px;
                                }
                                span {
                                    position: absolute;
                                    border-radius: 8px;
                                    border: 1px solid #F5F7FA;
                                    background: #fff;
                                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                                    color: #47474D;
                                    padding: 7px 16px 9px;
                                    width: max-content;
                                    bottom: 28px;
                                    left: 0;
                                    pointer-events: none;
                                    opacity: 0;
                                    transition: ${theme.transition};
                                }
                                &:hover {
                                    span {
                                        opacity: 1;
                                        pointer-events: all;
                                    }
                                }
                            `}>
                                <InfoIcon/>
                                <span>Не&nbsp;соответствует политике сайта</span>
                            </div>
                        </div>
                        <div className={css`
                            flex: 1; font-size: 14px; line-height: 1.16; color: #47474D;

                            @media(max-width: 575px) {
                                order: 1;
                                flex: 0 1 100%;
                                max-width: 100%;
                            }
                        `}>Дата публикации: 27 сентября 2024</div>
                        <div className={css`display: flex; gap: 16px;`}>
                            <EditIcon />
                            <RemoveIcon />
                        </div>
                    </div>
                    <div className={css`margin-bottom: 8px;font-size: 20px;font-weight: 500;line-height: 1.4;`}>Налоговая и юридическая безопасность селлера на маркетплейсах</div>
                    <div className={css`margin-bottom: 24px;color: #8553F9;font-weight: 500;`}>32 900 руб.</div>
                    <div className={css`
                        display: flex;justify-content: space-between;align-items: flex-end;

                        @media(max-width: 575px) {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 16px;
                        }
                    `}>
                        <div>
                            <div className={css`
                                display: flex;flex-direction: column;gap: 8px;margin-bottom: 24px;

                                @media(max-width: 575px) {
                                    width: 100%;
                                }
                            `}>
                                <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Даты проведения:</b> 25-27 июля 2024</div>
                                <div className={css`font-size: 14px; line-height: 1.16;  & > b {font-weight: 500}`}><b>Организатор:</b> ЦРБК</div>
                            </div>
                            <Button className={cx(css`
                                background-color: #fff!important;color: #8553F9!important;
                                
                                @media(max-width: 575px) {
                                    width: 100%!important;
                                }
                            `)} onClick={()=>setView(2)}>Продвигать событие</Button>
                        </div>
                        <div className={css`
                            border-radius: 16px;
                            background-color: #F5F7FA;
                            padding: 12px 16px;
                            display: flex;
                            gap: 8px;

                            @media(max-width: 575px) {
                                width: 100%;

                                div {
                                    flex: 1;
                                }
                            }

                            p {
                                margin-bottom: 4px;
                                font-weight: 500;
                            }

                            span {
                                font-size: 14px;
                                line-height: 1.16;
                            }
                        `}>
                            <div>
                                <p>327</p>
                                <span>Просмотров</span>
                            </div>
                            <div>
                                <p>25</p>
                                <span>Переходов</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </UserEventsBlock>
            
        </UserMain>
        }
        {view === 2 && 
        <UserMain
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>

			<div onClick={getTariffs}>ТАРИФЫ</div>
			<div onClick={getHist}>ИСТОРИЯ</div>

            <UserMainTitles>
                <UserMainTitlesTitle>Опции для продвижения</UserMainTitlesTitle>
            </UserMainTitles>
            
            <div className={css`
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 24px;
                overflow-x: auto;

                div {
                    padding: 11px 16px 13px;
                    color: #47474D;
                    font-size: 14px;
                    line-height: 1.16;
                    border-radius: 28px;
                    border: 2px solid #D7DADD;
                    min-width: max-content;
                }
            `}>
                <div className={css`border-color: #8553F9!important;`}>Выбор опций</div>
                <div className={css`width: 16px;height: 2px;background-color: #8553F9;padding: 0!important;border:none!important;`}></div>
                <div>Подтверждение покупки</div>
            </div>
            <div className={css`margin-bottom: 8px;color: #6C6C71;font-size: 14px;line-height: 1.16;`}>Событие</div>
            <div className={css`margin-bottom: 16px; font-size: 20px; font-weight: 500; line-height: 1.4;`}>{dataForPayments.title}</div>
            {/* <div className={css`margin-bottom: 8px; color: #6C6C71; font-size: 14px;line-height: 1.16;`}>Опции для продвижения</div> */}
            <div className={css`display: flex; flex-direction: column;gap: 8px; margin-bottom: 24px;`}>
                
                    <div className={css`
                        padding: 8px 8px 8px 36px;
                        cursor: pointer;
                        position: relative;
                        filter: grayscale(0);
                        transition: ${theme.transition};
                        pointer-events: all;
                        
                        &::before {
                            content: '';
                            position: absolute;
                            left: 0 ;
                            top: 12px ;
                            width: 24px ;
                            height: 24px ;
                            background-image: 
								${tariffOne 
									? 
									`url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="%238553F9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.884 6.883L9.88398 17.883C9.39582 18.3712 8.60437 18.3712 8.11621 17.883L3.11621 12.883L4.88398 11.1152L9.00009 15.2314L19.1162 5.11523L20.884 6.883Z" fill="white"/></svg>');`
									: 
									`url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="5" stroke="%23101010" stroke-opacity="0.2" stroke-width="2"/></svg>');`
								}
								
							;
							};
                        }
                    `}
                    onClick={()=>{
						setTariffOne(prev => !prev)
					}}
                    >
                        <div className={css`padding: 6px 0 16px;`}>Тариф <b style={{fontWeight: 500}}>«Расширенный»</b></div>
						<div className={css`
							display: flex;
							gap: 24px;
							margin-bottom: 16px;

							div {
								position: relative;
								padding-left: 24px;
								font-size: 14px;
								color: #47474D;
								line-height: 1.16;

								&::before {
									content: '';
									position: absolute;
									top: 0;
									left: 0;
									width: 16px;
									height: 16px;
									background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_10645_69356)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_10645_69356"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
								}
							}
						`}>
							<div>Ссылка на сайт с&nbsp;UTM</div>
							<div>Аналитика мероприятия</div>
							<div>Добавление фото/видео материалов</div>
						</div>
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; margin-bottom: 8px; span {color: #191921; font-weight: 500;}`}>Срок размещения - <span>бессрочно</span></p>
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; span {color: #191921; font-weight: 500;}}`}>Стоимость услуги - <span>5 000 рублей</span></p>
                    </div>
                
            </div>

			<div className={css`display: flex; flex-direction: column;gap: 8px; margin-bottom: 24px;`}>
                
                    <div className={css`
                        padding: 8px 8px 8px 36px;
                        cursor: pointer;
                        position: relative;
                        filter: grayscale(0);
                        transition: ${theme.transition};
                        pointer-events: all;
                        
                        &::before {
                            content: '';
                            position: absolute;
                            left: 0 ;
                            top: 12px ;
                            width: 24px ;
                            height: 24px ;
                            background-image: 
								${tariffTwo 
									? 
									`url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="%238553F9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.884 6.883L9.88398 17.883C9.39582 18.3712 8.60437 18.3712 8.11621 17.883L3.11621 12.883L4.88398 11.1152L9.00009 15.2314L19.1162 5.11523L20.884 6.883Z" fill="white"/></svg>');`
									: 
									`url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="5" stroke="%23101010" stroke-opacity="0.2" stroke-width="2"/></svg>');`
								}
								
							;
							};
                        }
                    `}
                    onClick={()=>{
						setTariffTwo(prev => !prev)
					}}
                    >
                        <div className={css`padding: 6px 0 16px;`}>Размещение в&nbsp;сквозном слайдере <b style={{fontWeight: 500}}>Интересные события</b></div>
						
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; margin-bottom: 8px; span {color: #191921; font-weight: 500;}`}>Срок размещения - <span>от 7 до 28 дней</span></p>
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; span {color: #191921; font-weight: 500;}}`}>Стоимость услуги - <span>от 5 000 рублей</span></p>
                    </div>
                
            </div>
			{/* <div onClick={()=>setView(1)}>Назад</div> */}
            <Button onClick={()=>{
				if(tariffOne || tariffTwo) {
					setView(3)
				} 
			}}>Перейти к оплате</Button>
        </UserMain>
        }
        {view === 3 &&
        <UserMain>
            <UserMainTitles>
                <UserMainTitlesTitle>Продвигать событие</UserMainTitlesTitle>
            </UserMainTitles>
            
            <div className={css`
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 24px;
                overflow-x: auto;

                div {
                    padding: 11px 16px 13px;
                    color: #47474D;
                    font-size: 14px;
                    line-height: 1.16;
                    border-radius: 28px;
                    border: 2px solid #D7DADD;
                    min-width: max-content;
                }
            `}>
                <div className={css`border-color: #8553F9!important; background-color: #8553F9; color: #fff!important;`}>Выбор опций</div>
                <div className={css`width: 16px;height: 2px;background-color: #8553F9;padding: 0!important;border:none!important;`}></div>
                <div className={css`border-color: #8553F9!important;`}>Подтверждение покупки</div>
            </div>
            <div className={css`margin-bottom: 8px;color: #6C6C71;font-size: 14px;line-height: 1.16;`}>Событие</div>
            <div className={css`margin-bottom: 16px; font-size: 20px; font-weight: 500; line-height: 1.4;`}>Налоговая и юридическая безопасность селлера на маркетплейсах</div>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .3 }}
            >
                <div className={css`padding: 24px 24px 16px;background-color: #fff;border-top: 8px solid #8553F9;
                    position: relative;
                    margin-bottom: 32px;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    
                    &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 16px;
                        left: 0;
                        bottom: -16px;
                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H0V16H2.66667C2.66667 13.0545 5.05448 10.6667 8 10.6667C10.9455 10.6667 13.3333 13.0545 13.3333 16H16V0Z" fill="white"/></svg>');
                    }
                `}>
                    <div className={css`margin-bottom: 16px;color: #6C6C71;font-size: 14px;line-height: 1.16;`}>Промежуточный итог</div>
					{tariffOne && 
                    <div className={css`
                        display: flex;gap:16px;justify-content: space-between;margin-bottom: 16px;padding-bottom: 16px;
                        @media(max-width: 575px) {
                            flex-direction: column;
                        }
                    `}>
                        <div style={{flex: '0 1 540px'}}>Тариф «Расширенный»</div>
						<div style={{flex: 1}}>бессрочно</div>
                        <div style={{flex: 1}} className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</div>
                    </div>
					}
					{tariffTwo && 
                    <div className={css`
                        display: flex;gap:16px;justify-content: space-between;margin-bottom: 16px;padding-bottom: 16px;
                        @media(max-width: 575px) {
                            flex-direction: column;
                        }
                    `}>
                        <div style={{flex: '0 1 540px'}}>Размещение в сквозном слайдере «Интересные события» (на 7 дней)</div>
						<div style={{flex: 1, display: 'flex'}}>
							<div>-</div>
							<div>7 дней</div>
							<div>+</div>
						</div>
                        <div style={{flex: 1}} className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</div>
                    </div>
					}
                    <div style={{display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #D7DADD'}}>Итого: <span className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</span></div>
                </div>
                <div className={css`color: #6C6C71;margin-bottom: 16px; font-size: 14px;line-height: 1.16;`}>Способ оплаты</div>
                <div className={css`
                    display: flex;
                    gap: 8px;
                    flex-direction: column;
                    margin-bottom: 24px;
                `}>
                    <div className={cx(inputRadio, radios === 1 && inputRadioActive)} onClick={()=>setRadios(1)}>Онлайн-оплата</div>
                    <div className={cx(inputRadio, radios === 2 && inputRadioActive)} onClick={()=>setRadios(2)}>Безналичная оплата</div>
                </div>
                <div className={css`display: flex;gap:16px;`}>
                    <Button onClick={()=>setView(2)} className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Назад</Button>
                    <Button onClick={()=>setView(4)}>Подтвердить</Button>
                </div>
            </motion.div>
            
        </UserMain>
        }
		{view === 4 && 
		<motion.div className={css`
            flex: 1;
            padding-top: 24px;
        `}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                max-width: 100%;
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Безналичная оплата</div>
            </div>
            <div className={css`margin-bottom: 32px;`}>Юридическая информация, необходимая для выставления счетов</div>

			<div className={css`
										display: flex;
										flex-wrap: wrap;
										gap: 24px;
										margin-bottom: 40px;
									`}>
										<div className={inputItem}>
											<p>Юридическое наименование</p>
											<input type="text" className={input} value={dataForPayments.info.name} placeholder="Юридическое наименование" 
											onChange={(e) =>
											setDataForPayment(prev => ({
											...prev,
											info: {
												...prev.info,
												name: e.target.value
											}
											}))}  />
										</div>
										<div className={inputItem}>
											<p>Юридический адрес</p>
											<input type="text" className={input} value={dataForPayments.info.address} placeholder="Юридический адрес" 
											onChange={(e) =>
											setDataForPayment(prev => ({
											...prev,
											info: {
												...prev.info,
												address: e.target.value
											}
											}))} />
										</div>
										<div className={inputItem}>
											<p>ИНН</p>
											<input type="text" className={input} value={dataForPayments.info.inn} placeholder="ИНН" 
											onChange={(e) =>
											setDataForPayment(prev => ({
											...prev,
											info: {
												...prev.info,
												inn: e.target.value
											}
											}))}
											 />
										</div>
										<div className={inputItem}>
											<p>КПП</p>
											<input type="text" className={input} value={dataForPayments.info.kpp} placeholder="КПП" 
											onChange={(e) =>
											setDataForPayment(prev => ({
											...prev,
											info: {
												...prev.info,
												kpp: e.target.value
											}
											}))} />
										</div>
									</div>
            
                <div className={css`display: flex;gap:16px;`}>
                    <Button onClick={()=>setView(3)} className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Назад</Button>
                    <Button onClick={addOrder}>Получить счет</Button>
                </div>
        </motion.div>
		}
        {view === 5 && 
        <motion.div className={css`
            flex: 1;
            padding-top: 24px;
        `}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                max-width: 100%;
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Поздравляем!</div>
            </div>
            <div className={css`margin-bottom: 16px;`}><span className={css`color: #6C6C71;`}>Вы успешно оформили заказ на продвижение события</span> «Налоговая и юридическая безопасность селлера на маркетплейсах»</div>
            <div className={css`padding: 24px 24px 16px;background-color: #fff;border-top: 8px solid #8553F9;
                    position: relative;
                    margin-bottom: 48px;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    
                    &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 16px;
                        left: 0;
                        bottom: -16px;
                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H0V16H2.66667C2.66667 13.0545 5.05448 10.6667 8 10.6667C10.9455 10.6667 13.3333 13.0545 13.3333 16H16V0Z" fill="white"/></svg>');
                    }
                `}>
                    <div className={css`display: flex;gap: 32px;`}>
                        <div className={css`flex: 1;`}>
                            <div className={css`color: #6C6C71;font-size: 14px;line-height: 1.16;margin-bottom: 16px;`}>Информация о заказе</div>
                            <div className={css`margin-bottom: 16px;padding-bottom: 16px;border-bottom: 1px solid #D7DADD; display: flex;gap:32px;justify-content:space-between;min-height: 106px;`}>
                                <div className={css`flex: 0 1 354px;`}>Размещение в сквозном слайдере «Интересные события»</div>
                                <div>на 7 дней</div>
                                <div className={css`flex: 0 1 160px;font-weight: 500;color: #8553F9;text-align: right;`}>5 000 руб.</div>
                            </div>
                            <div>Итого: <span className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</span></div>
                        </div>
                        <CheckIcon/>
                    </div>
                </div>
                <div className={css`display: flex;gap:16px;`}>
                    <Button className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>К истории заказов</Button>
                    <Button>Мои мероприятия</Button>
                </div>
        </motion.div>
        }

		{/* {view === 5 && 
			<EventAdd setBack={setView} />
		}
		{view === 6 && 
			<EventAdd setBack={setView} id={editId} />
		} */}
        
		</div>
            </Container>
        </LkWrapper>
    )
};

export default UserEvents;