import { breadcrumbs, Button, container, pagePromo, pageTitle } from './ui';
import event_img from '../images/event_ex.jpg'
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Helper } from '../components/ui/Helper';
import { useState } from 'react';
import { MainEventsSlider } from '../components/MainEventsSlider';
import { Form } from '../components/Form';
import { MainEvents } from '../components/MainEvents';
import { motion } from 'framer-motion';

export const Event = () => {
    const [version, setVersion] = useState(0);

    const theme = useTheme();

    const promoThemes = css`
        display: flex;
        gap: 16px;
        font-size: 14px;
        line-height: 1.16;
        flex-wrap: wrap;

        @media(max-width: 575px) {
            gap: 8px 16px;
        }

        & > p {
            color: #47474D;
        }
        & > a {
            color: ${theme.colors.purple};

            &:hover {
                text-decoration: underline;
            }
        }
    `;

    const text = css`
        display: flex;
        flex-direction: column;
        gap: 24px;

        & > p {
            line-height: 1.28;
        }
        & > div {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.36;
        }
    `;

    return (
        <>
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <a href="/">Главная</a>
                        <a href="/">Мероприятия</a>
                        <p>Национальный рекламный форум</p>
                    </div>
                    <h1 className={pageTitle}>Национальный рекламный форум</h1>
                    <div className={promoThemes}>
                        <p>Тематика:</p>
                        <a href="/">Управление персоналом</a>
                        <a href="/">Менеджмент</a>
                        <a href="/">HR-процессы</a>
                    </div>
                </div>
            </div>

            <div className={css`
                padding: 32px 0 120px;

                @media(max-width: 575px) {
                    padding-bottom: 64px;
                }
            `}>
                <div className={container}>
                    <div className={css`
                        display: flex;
                        gap: 32px;

                        @media(max-width: 991px) {
                            flex-direction: column;
                        }
                    `}>
                        <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: .3 }}
                        className={css`
                            flex: 1;
                        `}>
                            <img src={event_img} alt="" className={css`margin-bottom: 40px;`} />
                            <div className={text}>
                                <p>Сразу два уникальных события ждут представителей индустрии в ноябре:</p>
                                <div>
                                    <p>🌟12-15 ноября — Неделя рекламы в Москве;</p>
                                    <p>🌟13-15 ноября — НРФ’8.</p>
                                </div>
                                <p>В этом году главная тема деловой программы НРФ: «Бизнес, потребители, государство».</p>
                                <div>12 ноября — Саммит по взаимодействию индустрии с органами государственной власти</div>
                                <p>Эксперты со стороны органов государственной власти и рекламной индустрии обсудят законодательные инициативы, актуальные вопросы нормативно-правового регулирования и правоприменительные практики, акты саморегулирования рынка.</p>
                                <div>13 ноября — День digital</div>
                                <p>Дискуссия будет посвящена новым инструментам цифровых коммуникаций и актуальным подходам в интерактивной рекламе.</p>
                                <div>14 ноября — День контента и креатива</div>
                                <p>На площадке форума выступят российские и зарубежные эксперты. Также пройдет официальная церемония награждения победителей фестиваля Red Apple.</p>
                                <div>15 ноября — День стратегических инициатив</div>
                                <p>Ключевые игроки рекламного рынка обсудят цели и задачи российского маркетинга, узнаваемость отечественных брендов и тренды в поведении потребителей.</p>
                            </div>
                        </motion.div>
                        <motion.div 
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: .3 }}
                        className={css`
                            flex: 0 1 296px;
                            max-width: 296px;
                            position: sticky;
                            top: 108px;
                            height: max-content;
                            display: flex;
                            flex-direction: column;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                            }
                        `}>
                            <div className={css`
                                background-color: #F5F7FA;
                                border-radius: 28px;
                                padding: 24px;
                                margin-bottom: 14px;
                            `}>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Дата проведения</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>25 сентября - 2 октября 2024</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Место проведения</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>Москва</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Адрес</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>Кинотеатр Каро 11 Октябрь</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Стоимость</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    font-weight: 500;
                                    color: #8553F9;
                                `}>32 900 - 72 000 руб.</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Формат</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>Конференция</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    line-height: 1.28;
                                `}>Организатор</p>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: #8553F9;
                                `}>ЦРБК</p>
                            </div>
                            </div>
                            
                            {version === 2 && <a href="/" className={css`
                                color: ${theme.colors.purple};
                            `}>Это ваше мероприятие?</a>}
                            {version === 3 && <Button green>На сайт мероприятия</Button>}
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <div className={cx(container, css`@media(max-width: 1439px) {padding: 0;}` )}>
                <MainEventsSlider />
            </div>

            <MainEvents similar={true} />

            <Form />

            <Helper>
                <h2>Версия</h2>
                <p onClick={()=>setVersion(1)}>Для пользователей</p>
                <p onClick={()=>setVersion(2)}>Для админа</p>
                <p onClick={()=>setVersion(3)}>Стандарт</p>
            </Helper>
        </>
    );
}