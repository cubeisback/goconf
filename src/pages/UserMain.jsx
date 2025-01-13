import { css, cx } from "@emotion/css";
import { Button, input, inputItem, userMain } from "./ui";
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from "@emotion/react";
import { useState } from "react";

export const UserMain = () => {
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

    return(
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
            `}>Мой профиль</div>
            <div className={css`
                display: flex;
                gap: 4px;
                align-items: center;
                margin-bottom: 24px;
            `}>
                <div>Статус профиля:</div>
                <div className={css`color: ${theme.colors.purple}`}>Базовый</div>
            </div>
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
                                <input type="text" className={input} placeholder="Александр" />
                            </div>
                            <div className={inputItem}>
                                <p>Фамилия</p>
                                <input type="text" className={input} placeholder="Романов" />
                            </div>
                            <div className={inputItem}>
                                <p>E-mail</p>
                                <input type="email" className={input} placeholder="mail@mail.ru" />
                            </div>
                            <div className={inputItem}>
                                <p>Телефон</p>
                                <input type="text" className={input} placeholder="+7 (..." />
                            </div>
                            <Button className={cx(css`opacity: .2; pointer-events: none;`)}>Сохранить изменения</Button>
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
                                <input type="text" className={input} placeholder="Александр" />
                            </div>
                            <div className={inputItem}>
                                <p>Повторите пароль</p>
                                <input type="text" className={input} placeholder="Романов" />
                            </div>
                            <Button className={cx(css`opacity: .2; pointer-events: none;`)}>Сохранить изменения</Button>
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
                            <input type="text" className={input} placeholder='ООО "ЦРБК"' />
                        </div>
                        <div className={inputItem}>
                            <p>Юридический адрес</p>
                            <input type="text" className={input} placeholder="г. Москва, ул. Касьянова, д. 5Б" />
                        </div>
                        <div className={inputItem}>
                            <p>Рассчетный счет</p>
                            <input type="text" className={input} placeholder='423143853453452131' />
                        </div>
                        <div className={inputItem}>
                            <p>ИНН</p>
                            <input type="text" className={input} placeholder="5224113215" />
                        </div>
                        <div className={inputItem}>
                            <p>КПП</p>
                            <input type="text" className={input} placeholder="321312312" />
                        </div>
                        <div className={inputItem}>
                            <p>ОГРН</p>
                            <input type="text" className={input} placeholder="4342423" />
                        </div>
                        <Button>Сохранить изменения</Button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
};