import { css } from '@emotion/css';
import { ReactComponent as About1 } from '../images/svg/about_1.svg';
import { ReactComponent as About2 } from '../images/svg/about_2.svg';
import { ReactComponent as About3 } from '../images/svg/about_3.svg';
import { breadcrumbs, container, pagePromo } from './ui';
import { Form } from '../components/Form';

export const About = () => {

    return (
        <>
            <div className={pagePromo}>
                <div className={container}>
                    <div className={breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>О проекте</p>
                    </div>
                    <h1 style={{textAlign: 'center'}}>О проекте <span style={{color: '#8553F9'}}>GoCONF</span></h1>
                    <div style={{textAlign: 'center'}}>Самые интересные бизнес-мероприятия различных форматов<br/> от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div>
                </div>
            </div>

            <div className={css`
                padding: 32px 0 120px;
                background-color: #F5F7FA;    
            `}>
                <div className={container}>
                    <div className={css`
                        display: flex;
                        gap: 32px;
                        padding-top: 60px;    
                    `}>
                        <div className={css`
                            flex: 0 1 calc(33.333333% - 21.333333px);
                            max-width: calc(33.333333% - 21.333333px);
                            padding: 120px 32px 32px;
                            border-radius: 28px;
                            background-color: #fff;

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;
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

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;
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

                            div {
                                text-align: center;
                                margin-bottom: 24px;
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;
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