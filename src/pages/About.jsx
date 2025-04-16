import { css, cx } from '@emotion/css';
import { ReactComponent as About1 } from '../images/svg/about_1.svg';
import { ReactComponent as About2 } from '../images/svg/about_2.svg';
import { ReactComponent as About3 } from '../images/svg/about_3.svg';
import { breadcrumbs, container, pagePromo, pageTitle } from './ui';
import { Form } from '../components/Form';
import { NavLink } from 'react-router';

export const About = () => {

    return (
        <>
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <NavLink to="/">Главная</NavLink>
                        <p>О проекте</p>
                    </div>
                    <h1 className={cx(pageTitle, css`text-align:center;`)}>О проекте <span style={{color: '#8553F9'}}>GoCONF</span></h1>
                    <div className={css`
                        text-align:center;

                        br {
                            @media(max-width: 575px) {
                                display: none;
                            }
                        }
                    `}>Самые интересные бизнес-мероприятия различных форматов<br/> от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div>
                </div>
            </div>

            <div className={css`
                padding: 32px 0 120px;
                background-color: #F5F7FA;

                @media(max-width: 575px) {
                    padding-bottom: 64px;
                }
            `}>
                <div className={container}>
                    <div className={css`
                        display: flex;
                        gap: 32px;
                        padding-top: 60px;

                        @media(max-width: 991px) {
                            flex-direction: column;
                            gap: 100px;
                        }
                    `}>
                        <div className={css`
                            flex: 0 1 calc(33.333333% - 21.333333px);
                            max-width: calc(33.333333% - 21.333333px);
                            padding: 120px 32px 32px;
                            border-radius: 28px;
                            background-color: #fff;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 120px 24px 24px;
                            }

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;

                                @media(max-width: 575px) {
                                    font-size: 22px;
                                }
                            }

                            svg {
                                margin: -200px auto 10px;
                                display: block;
                            }
                        `}>
                            <About1 />
                            <div>Бесплатно</div>
                            <p>Вы&nbsp;можете опубликовать свое событие совершенно бесплатно. Если оно не&nbsp;противоречит политике сайта, после модерации оно окажется в&nbsp;результатах поиска на&nbsp;странице мероприятия.</p>
                        </div>
                        <div className={css`
                            flex: 0 1 calc(33.333333% - 21.333333px);
                            max-width: calc(33.333333% - 21.333333px);
                            padding: 120px 32px 32px;
                            border-radius: 28px;
                            background-color: #fff;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 120px 24px 24px;
                            }

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;

                                @media(max-width: 575px) {
                                    font-size: 22px;
                                }
                            }

                            svg {
                                margin: -200px auto 10px;
                                display: block;
                            }
                        `}>
                            <About2 />
                            <div>Точно в цель</div>
                            <p>Ежемесячная аудитория сайта &gt; 150&nbsp;000 человек и&nbsp;мы&nbsp;постоянно работаем над привлечением новых пользователей. ЦА&nbsp;сервиса&nbsp;&mdash; это профессионалы, которые следят за&nbsp;трендами и&nbsp;регулярно посещают профильные мероприятия.</p>
                        </div>
                        <div className={css`
                            flex: 0 1 calc(33.333333% - 21.333333px);
                            max-width: calc(33.333333% - 21.333333px);
                            padding: 120px 32px 32px;
                            border-radius: 28px;
                            background-color: #fff;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 120px 24px 24px;
                            }

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;

                                @media(max-width: 575px) {
                                    font-size: 22px;
                                }
                            }

                            svg {
                                margin: -200px auto 10px;
                                display: block;
                            }
                        `}>
                            <About3 />
                            <div>Эффективно</div>
                            <p>Мы&nbsp;постоянно работаем над новыми форматами продвижения, чтобы сделать привлечение участников на&nbsp;ваши мероприятия максимально эффективным. Все опции можно оплатить любым удобным способом.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Form />
        </>
    );
}