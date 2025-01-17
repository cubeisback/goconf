import { css } from "@emotion/css";
import { userMain } from "./ui";
import { motion } from 'framer-motion';
import { useTheme } from "@emotion/react";

export const UserStatus = () => {
    const theme = useTheme();

    return (
        <>
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
                padding: 0 24px;
                border-radius: 28px;
                border: 2px solid ${theme.colors.purple};

                & > div {
                    flex: 0 1 calc(33.333333% - 16px);
                    max-width: calc(33.333333% - 16px);
                }
            `}>
                <div>
                    <div>Базовый</div>
                    <div>Бесплатно</div>
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
                                <div>Что входит</div>
                                <p>Добавление одного события</p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Ссылка на сайт с UTM</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Аналитика мероприятия</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Добавление фото/видео материалов</p>
                            </div>
                    <div>Активен</div>
                </div>
                <div>
                    <div>Стандарт</div>
                    <div>1 900 Р. / мес</div>
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
                                <div>Что входит</div>
                                <p>Добавление одного события</p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                    <div>Оформить</div>
                </div>
                <div>
                    <div>Бизнес</div>
                    <div>3 800 Р. / мес</div>
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
                                <div>Что входит</div>
                                <p>Подписка на <b>3 мероприятия</b></p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                    <div>Оформить</div>
                </div>
            </div>
        </motion.div>

        </>
    )
}