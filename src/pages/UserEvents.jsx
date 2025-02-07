import { css, cx } from "@emotion/css";
import { Button, inputRadio, inputRadioActive, userMain } from "./ui";
import { motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { ReactComponent as EditIcon } from '../images/svg/edit.svg';
import { ReactComponent as RemoveIcon } from '../images/svg/remove.svg';
import { ReactComponent as CheckIcon } from '../images/svg/check.svg';
import { ReactComponent as UpIcon } from '../images/svg/up.svg';
import { ReactComponent as InfoIcon } from '../images/svg/info.svg';
import DropdownInput from "../components/ui/DropdownInput";

const options = ['Варинат 1', 'Варинат 2', 'Варинат 3', 'Варинат 4', 'Варинат 5', 'Варинат 6', 'Ы'];

export const UserEvents = () => {
    const theme = useTheme();
    const [view, setView] = useState(1);
    
    const [selectedBlocks, setSelectedBlocks] = useState([1]);

    // Функция для обработки клика по блоку
    const handleBlockClick = (blockId) => {
        setSelectedBlocks((prevSelected) =>
        prevSelected.includes(blockId)
            ? prevSelected.filter((id) => id !== blockId) // Если блок уже выбран, снимаем выбор
            : [...prevSelected, blockId] // Если блок не выбран, добавляем в список выбранных
        );
    };

    // Массив блоков для отображения
    const blocks = [1, 2, 3, 4, 5]; // Это может быть любая структура данных


    const [radios, setRadios] = useState(1);

    return(
        <>
        {view === 1 && 
        <motion.div className={userMain}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;

                @media(max-width: 575px) {
                    flex-direction: column;
                    align-items: flex-start;
                }
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Мои мероприятия</div>
                <Button>+ Добавить событие</Button>
            </div>
            
            <div className={css`
                margin-bottom: 32px;
                display: flex;
                gap: 16px;
            `}>
                <div className={css`flex: 0 1 300px;`}>
                    <p className={css`margin-bottom: 8px;color: #47474D;font-size: 14px;line-height:1.16;`}>Статус</p>
                    {/* <div className={css`display:flex;gap:8px;justify-content:space-between;background-color:#fff;border-radius:28px;padding:14px 16px;`}>
                        <p className={css`color: #47474D;font-size: 14px;line-height:1.16;`}>Все</p>
                        <ArrowDown />
                    </div> */}
                    <DropdownInput options={options} placeholder={'Тематика'} isSimple />
                </div>
                <div className={css`flex: 0 1 300px;`}>
                    <p className={css`margin-bottom: 8px;color: #47474D;font-size: 14px;line-height:1.16;`}>Дата проведения</p>
                    <DropdownInput options={options} placeholder={'Предстоящие'} isSimple />
                </div>
            </div>

            <div className={css`
                display: flex;
                flex-direction: column;
                gap: 32px;
            `}>
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
                </div>
            </div>
            
        </motion.div>
        }
        {view === 2 && 
        <motion.div className={userMain}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;

                @media(max-width: 575px) {
                    flex-direction: column;
                    align-items: flex-start;
                }
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Продвигать событие</div>
            </div>
            
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
            <div className={css`margin-bottom: 16px; font-size: 20px; font-weight: 500; line-height: 1.4;`}>Налоговая и юридическая безопасность селлера на маркетплейсах</div>
            <div className={css`margin-bottom: 8px; color: #6C6C71; font-size: 14px;line-height: 1.16;`}>Опции для продвижения</div>
            <div className={css`display: flex; flex-direction: column;gap: 8px; margin-bottom: 24px;`}>
                {blocks.map((blockId, index) => (
                    <div key={index} className={css`
                        padding: 8px 8px 8px 40px;
                        cursor: pointer;
                        position: relative;
                        filter: ${selectedBlocks.includes(blockId) ? 'grayscale(0)' : 'grayscale(1)' };
                        opacity: ${selectedBlocks.includes(blockId) ? 1 : .4 };
                        transition: ${theme.transition};
                        pointer-events: ${selectedBlocks.includes(blockId) ? 'all' : 'none' };
                        
                        &::before {
                            content: '';
                            position: absolute;
                            left: ${selectedBlocks.includes(blockId) ? '4px' : '0' };
                            top: ${selectedBlocks.includes(blockId) ? '12px' : '8px' };
                            width: ${selectedBlocks.includes(blockId) ? '24px' : '32px' };
                            height: ${selectedBlocks.includes(blockId) ? '24px' : '32px' };
                            background-image: ${selectedBlocks.includes(blockId) ? `url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="%238553F9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.884 6.883L9.88398 17.883C9.39582 18.3712 8.60437 18.3712 8.11621 17.883L3.11621 12.883L4.88398 11.1152L9.00009 15.2314L19.1162 5.11523L20.884 6.883Z" fill="white"/></svg>')` : `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="5" stroke="%23101010" stroke-opacity="0.2" stroke-width="2"/></svg>')`};
                        }
                    `}
                    onClick={()=>handleBlockClick(blockId)}
                    >
                        <div className={css`padding: 6px 0 8px;`}>Размещение в сквозном слайдере «Интересные события»</div>
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; span {color: #191921;}`}>Срок размещения - 7 дней с момента заказа опции</p>
                        <p className={css`font-size: 14px;line-height: 1.16; color: #6C6C71; span {color: #191921;}`}>Стоимость услуги - <span>5 000 рублей</span></p>
                    </div>
                ))}
            </div>
            <Button onClick={()=>setView(3)}>Перейти к оплате</Button>
        </motion.div>
        }
        {view === 3 &&
        <div className={userMain}>
            <div className={css`
                display: flex;
                gap: 16px;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;

                @media(max-width: 575px) {
                    flex-direction: column;
                    align-items: flex-start;
                }
            `}>
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                `}>Продвигать событие</div>
            </div>
            
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
                    <Button onClick={()=>setView(2)} className={cx(css`color:#8553F9!important;background-color:#fff!important;`)}>Назад</Button>
                    <Button onClick={()=>setView(4)}>Подтвердить</Button>
                </div>
            </motion.div>
            
        </div>
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
        </>
    )
};