import { breadcrumbs, container, pagePromo, pageTitle } from './ui';
import { Filter } from '../components/Filter/Filter';
import { css } from '@emotion/css';
import { MainEvents } from '../components/MainEvents';
import { Form } from '../components/Form';

export const Events = () => {

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
                    `}>Поиск по мероприятиям</div>
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
                    <Filter full={true} />

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
                        }
                    `}>
                        <div>Конференции по&nbsp;маркетингу</div>
                        <div>Бизнес-семинары</div>
                        <div>Конференции в Москве</div>
                        <div>Выставки в Санкт-Петербурге</div>
                        <div>Конференции в Москве</div>
                    </div>

                    <MainEvents onPage={true} />

                    
                </div>

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