import { breadcrumbs, container, input, pagePromo, pageTitle } from './ui';
import { Filter } from '../components/Filter/Filter';
import { css, cx } from '@emotion/css';
import { MainEvents } from '../components/MainEvents';
import { Form } from '../components/Form';
import { ReactComponent as SearchIcon } from '../images/svg/search.svg';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { EventsFiltered } from '../components/EventsFiltered';

export const Events = () => {
    const theme = useTheme();
    const [events, setEvents] = useState(null)

    return (
        <>
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>Мероприятия</p>
                    </div>
                    <h1 className={pageTitle}>Мероприятия</h1>
                    <div className={css`
                        background-color: #fff;
                        border-radius: 28px;
                        padding: 14px 16px;
                        width: 608px;
                        font-size: 14px;
                        line-height: 1.16;
                        display: flex;
                        gap: 8px;
                        align-items: center;

                        @media(max-width: 640px) {
                            width: 100%;
                        }
                    `}>
                        <input className={cx(input, css`padding: 0 4px;`)} type="text" placeholder='Поиск по мероприятиям' />
                        <SearchIcon className={css`cursor: pointer;`} />
                    </div>
                </div>
            </div>

            <div className={css`
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    left: -100vw;
                    top: 0;
                    width: 200vw;
                    height: 80px;
                    background-color: #F5F7FA;
                    z-index: -1;
                }
            `}>
                <div className={container}>
                    <Filter full={true} setEvents={setEvents} />

                    <div className={css`
                        display: flex;
                        gap: 16px;
                        flex-wrap: wrap;

                        div {
                            padding: 7px 12px 9px;
                            border-radius: 8px;
                            background-color: #F5F7FA;
                            font-size: 14px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: ${theme.transition};

                            &:hover {
                                background-color: ${theme.colors.green};
                            }
                        }
                    `}>
                        <div>Конференции по&nbsp;маркетингу</div>
                        <div>Бизнес-семинары</div>
                        <div>Конференции в Москве</div>
                        <div>Выставки в Санкт-Петербурге</div>
                        <div>Конференции в Москве</div>
                    </div>
                    
                </div>

                {/* <MainEvents onPage={true} events={events} /> */}
                <EventsFiltered onPage={true} events={events} />

                <div className={css`
                        padding: 64px 0;
                        background-color: #F5F7FA;
                `}>
                    <div className={container}>
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            gap: 16px;
                            
                            p {
                                color: #47474D;
                            }
                        `}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
                        </div>
                    </div>
                </div>

                <Form />
            </div>
        </>
    );
}