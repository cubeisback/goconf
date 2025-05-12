"use client"

import { css, cx } from "@emotion/css";
import { Button, container, input, inputItem, inputRadio, inputRadioActive, lkContainer, userMain } from "@/styles/ui";
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useState } from "react";
import DropdownInput from "@/components/ui/DropdownInput";
import CheckIcon from "@/public/images/svg/check.svg";
import LkMenu from "@/components/ui/LkMenu";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6', 'Ы'];

const UserStatus = () => {
    const theme = useTheme();
    const [view, setView] = useState(1);
    const [radios, setRadios] = useState(1);

    return (
        <div className={lkContainer}>
            <div className={container}>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    <LkMenu />
					
                
        
        
            {view === 1 &&
            <motion.div className={userMain}
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
            `}>Статус профиля</div>
            
            <div className={css`
                font-size: 20px;
                font-weight: 500;
                line-height: 1.4;
                margin-bottom: 16px;
            `}>Сменить статус</div>
            
            <div className={css`
                display: flex;
                gap: 24px;
                flex-wrap: wrap;
                padding: 40px 24px;
                border-radius: 28px;
                border: 2px solid ${theme.colors.purple};

                & > div {
                    flex: 0 1 calc(33.333333% - 16px);
                    max-width: calc(33.333333% - 16px);

                    @media(max-width: 767px) {
                        flex: 0 1 100%;
                        max-width: 100%;
                    }
                }
            `}>
                <div>
                    <div className={css`
                        color: ${theme.colors.purple};
                        text-align: center;
                        margin-bottom: 24px;
                        font-family: Impact;
                        font-size: 24px;
                        line-height: 1.34;
                    `}>Базовый</div>
                    <div className={css`
                        text-align: center;
                        margin-bottom: 40px;
                        font-size: 24px;
                        font-weight: 500;
                        line-height: 1.34;
                    `}>Бесплатно</div>
                    <div className={css`
                                border-radius: 16px;
                                background-color: #fff;
                                padding: 16px 24px 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                                color: #47474D;
                                margin-bottom: 40px;
                                margin-top: auto;

                                div {
                                    text-align: center;
                                    font-size: 18px;
                                    line-height: 1.36;
                                }

                                p {
                                    padding-left: 24px;
                                    position: relative;
                                    font-size: 14px;

                                    &::before {
                                        content: '';
                                        position: absolute;
                                        width: 16px;
                                        height: 16px;
                                        left: 0;
                                        top: 0;
                                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_9501_15213)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_9501_15213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
                                    }
                                }
                            `}>
                                {/* <div>Что входит</div> */}
                                <p>Добавление одного события</p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Ссылка на сайт с UTM</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Аналитика мероприятия</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Добавление фото/видео материалов</p>
                            </div>
                    <Button className={css`width:100%!important;background-color: ${theme.colors.green}!important;border-color: ${theme.colors.green}!important;color: ${theme.colors.font}!important;cursor: default;!important`}>Активен</Button>
                </div>
                <div>
                    <div className={css`
                        color: ${theme.colors.purple};
                        text-align: center;
                        margin-bottom: 24px;
                        font-family: Impact;
                        font-size: 24px;
                        line-height: 1.34;
                    `}>Стандарт</div>
                    <div className={css`
                        text-align: center;
                        margin-bottom: 40px;
                        font-size: 24px;
                        font-weight: 500;
                        line-height: 1.34;
                    `}>1 900 Р. / мес</div>
                    <div className={css`
                                border-radius: 16px;
                                background-color: #fff;
                                padding: 16px 24px 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                                color: #47474D;
                                margin-bottom: 40px;
                                margin-top: auto;

                                div {
                                    text-align: center;
                                    font-size: 18px;
                                    line-height: 1.36;
                                }

                                p {
                                    padding-left: 24px;
                                    position: relative;
                                    font-size: 14px;

                                    &::before {
                                        content: '';
                                        position: absolute;
                                        width: 16px;
                                        height: 16px;
                                        left: 0;
                                        top: 0;
                                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_9501_15213)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_9501_15213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
                                    }
                                }
                            `}>
                                {/* <div>Что входит</div> */}
                                <p>Добавление одного события</p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                    <Button className={css`width:100%!important;`} onClick={()=>setView(2)}>Оформить</Button>
                </div>
                <div>
                    <div className={css`
                        color: ${theme.colors.purple};
                        text-align: center;
                        margin-bottom: 24px;
                        font-family: Impact;
                        font-size: 24px;
                        line-height: 1.34;
                    `}>Бизнес</div>
                    <div className={css`
                        text-align: center;
                        margin-bottom: 40px;
                        font-size: 24px;
                        font-weight: 500;
                        line-height: 1.34;
                    `}>3 800 Р. / мес</div>
                    <div className={css`
                                border-radius: 16px;
                                background-color: #fff;
                                padding: 16px 24px 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                                color: #47474D;
                                margin-bottom: 40px;
                                margin-top: auto;

                                div {
                                    text-align: center;
                                    font-size: 18px;
                                    line-height: 1.36;
                                }

                                p {
                                    padding-left: 24px;
                                    position: relative;
                                    font-size: 14px;

                                    &::before {
                                        content: '';
                                        position: absolute;
                                        width: 16px;
                                        height: 16px;
                                        left: 0;
                                        top: 0;
                                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_9501_15213)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_9501_15213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
                                    }
                                }
                            `}>
                                {/* <div>Что входит</div> */}
                                <p>Подписка на <b>3 мероприятия</b></p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                    <Button className={css`width:100%!important;`} onClick={()=>setView(2)}>Оформить</Button>
                </div>
            </div>
            </motion.div>
            }
        
        {view === 2 && 
        <AnimatePresence>
            <motion.div className={userMain}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .3 }}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                    margin-bottom: 16px;

                    @media(max-width: 575px) {
                        font-size: 28px;
                    }
                `}>Статус профиля - смена тарифа</div>

<div className={css`
                margin-bottom: 32px;
                display: flex;
                gap: 16px;
            `}>
                <div className={css`flex: 0 1 300px;`}>
                    <p className={css`margin-bottom: 8px;color: #47474D;font-size: 14px;line-height:1.16;`}>Тариф</p>
                    <DropdownInput options={options} placeholder={'Стандарт'} isSimple />
                </div>
                <div className={css`flex: 0 1 300px;`}>
                    <p className={css`margin-bottom: 8px;color: #47474D;font-size: 14px;line-height:1.16;`}>Срок</p>
                    <DropdownInput options={options} placeholder={'1 месяц'} isSimple />
                </div>
            </div>

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
                                    <div className={css`
                                        display: flex;gap:16px;justify-content: space-between;margin-bottom: 16px;padding-bottom: 16px;border-bottom: 1px solid #D7DADD;
                                        @media(max-width: 575px) {
                                            flex-direction: column;
                                        }
                                    `}>
                                        <div>Размещение в сквозном слайдере «Интересные события» (на 7 дней)</div>
                                        <div className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</div>
                                    </div>
                                    <div>Итого: <span className={css`font-weight: 500;color: #8553F9;`}>5 000 руб.</span></div>
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
                                    <Button onClick={()=>setView(1)} className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Назад</Button>
                                    <Button onClick={()=>setView(3)}>Подтвердить</Button>
                                </div>
            </motion.div>
        </AnimatePresence>
        }

{view === 3 && 
        <AnimatePresence>
            <motion.div className={userMain}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .3 }}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                    margin-bottom: 16px;

                    @media(max-width: 575px) {
                        font-size: 28px;
                    }
                `}>Пополнение счета</div>
                    <div className={css`margin-bottom: 32px;`}>Юридическая информация, необходимая для выставления счетов</div>
                                        <div className={css`
                                            display: flex;
                                            flex-wrap: wrap;
                                            gap: 24px;
                                        `}>
                                            <div className={inputItem}>
                                                <p>Юридическое наименование</p>
                                                <input type="text" className={input} placeholder='ООО "ЦРБК"' />
                                            </div>
                                            <div className={inputItem}>
                                                <p>Юридический адрес</p>
                                                <input type="text" className={input} placeholder="г. Москва, ул. Касьянова, д. 5Б" />
                                            </div>
                                            <div className={inputItem}>
                                                <p>ИНН</p>
                                                <input type="text" className={input} placeholder="5224113215" />
                                            </div>
                                            <div className={inputItem}>
                                                <p>КПП</p>
                                                <input type="text" className={input} placeholder="321312312" />
                                            </div>
                                            <Button onClick={()=>setView(4)}>Получить счет</Button>
                                        </div>
            </motion.div>
        </AnimatePresence>
        }

{view === 4 && 
        <AnimatePresence>
            <motion.div className={userMain}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .3 }}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                    margin-bottom: 16px;

                    @media(max-width: 575px) {
                        font-size: 28px;
                    }
                `}>Статус профиля - смена тарифа</div>
                    <div className={css`margin-bottom: 32px; span {color: #6C6C71;}`}><span>Вы успешно сменили тариф на</span> «Стандарт»</div>
                    
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
                                <div className={css`flex: 0 1 354px;`}>Подписка «Стандарт»<br/> на 1 мероприятие</div>
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
        </AnimatePresence>
        }
    
		</div>
            </div>
    	</div>
    )
}

export default UserStatus;