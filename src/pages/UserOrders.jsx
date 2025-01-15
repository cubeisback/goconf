import { css, cx } from "@emotion/css";
import { motion } from 'framer-motion';
import { useState } from "react";
import { userMain } from "./ui";
import { NavLink } from "react-router";
import { ReactComponent as EditIcon } from '../images/svg/edit.svg';
import { useTheme } from "@emotion/react";

export const UserOrders = () => {
    const theme = useTheme();

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

    return (
        <div className={userMain}>
            <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: .3 }}
            >
                <div className={css`
                    font-family: Impact;
                    font-size: 36px;
                    line-height: 1.12;
                    margin-bottom: 16px;

                    @media(max-width: 575px) {
                        font-size: 28px;
                    }
                `}>Организаторы</div>
                <div className={css`
                    margin-bottom: 24px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;

                    a {
                        color: ${theme.colors.purple};
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                `}>Статус профиля: <NavLink to="/">Базовый <EditIcon /></NavLink></div>
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
                    <div className={cx(tabItem, activeTab === 1 && tabItemActive)} onClick={()=>setActiveTab(1)}>Подписки</div>
                    <div className={cx(tabItem, activeTab === 2 && tabItemActive)} onClick={()=>setActiveTab(2)}>История заказов</div>
                </div>
            </motion.div>

        {activeTab === 1 &&
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}
        className={css`
            display: flex;
            flex-direction: column;
            gap: 32px;
        `}>
            <div className={css`
                padding: 24px 32px;
                border-radius: 28px;
                background-color: #fff;
                box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                display: flex;
                flex-direction: column;
                gap: 16px;
                font-size: 14px;
                line-height: 1.16;

                b {
                    font-weight: 500;
                }
            `}>
                <div className={css`
                    margin-bottom: 8px;
                    display: flex;
                    gap: 16px;
                    justify-content: space-between;
                `}>
                    <div className={css`
                        padding: 3px 8px 5px;
                        color: #fff;
                        border-radius: 8px;
                        background-color: #69B90F;
                    `}>Активна</div>
                </div>
                <div><b>Услуга:</b> Размещение в&nbsp;сквозном слайдере &laquo;Интересные события&raquo; (<b>на&nbsp;7&nbsp;дней</b>)</div>
                <div><b>Действует&nbsp;до:</b> <span className={css`color: #6C6C71;`}>22.12.2024 13:21</span></div>
                <div><b>Сумма платежа:</b> <span className={css`color: ${theme.colors.purple};font-weight: 500;`}>14&nbsp;000&nbsp;руб.</span></div>
            </div>
        </motion.div>
        }

        {activeTab === 2 && 
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}
        className={css`
            display: flex;
            flex-direction: column;
            gap: 32px;
        `}>
            <div className={css`
                padding: 24px 32px;
                border-radius: 28px;
                background-color: #fff;
                box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                display: flex;
                flex-direction: column;
                gap: 16px;
                font-size: 14px;
                line-height: 1.16;

                b {
                    font-weight: 500;
                }
            `}>
                <div className={css`
                    margin-bottom: 8px;
                    display: flex;
                    gap: 16px;
                    justify-content: space-between;
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;

                        @media(max-width: 575px) {
                            flex-direction: column;
                            flex: 1;
                        }
                    `}>
                        <div className={css`
                            padding: 3px 8px 5px;
                            color: #fff;
                            border-radius: 8px;
                            background-color: #FF5B3B;
                            width: max-content;
                        `}>Не&nbsp;оплачен</div>
                        <div>Дата: 27 сентября 2024</div>
                    </div>
                    <div className={css`color: ${theme.colors.purple};`}>Скачать счет</div>
                </div>
                <div><b>Наименование услуги:</b> Размещение в&nbsp;сквозном слайдере &laquo;Интересные события&raquo; (<b>на&nbsp;7&nbsp;дней</b>)</div>
                <div><b>№ заказа:</b> <span className={css`color: #6C6C71;`}>5530712</span></div>
                <div><b>Сумма оплаты:</b> <span className={css`color: ${theme.colors.purple};font-weight: 500;`}>14&nbsp;000&nbsp;руб.</span></div>
                <div><b>Способ оплаты:</b> <span className={css`color: #6C6C71;`}>Безналичная оплата</span></div>
            </div>
        </motion.div>
        }

        </div>
    )
}