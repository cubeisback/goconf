"use client"

import { useEffect, useState } from 'react';
import { Form } from '@/components/Form';
import { Breadcrumbs, Button, Container, pagePromo, pageTitle } from "@/styles/ui";
import { css, cx } from '@emotion/css';
import example_img from '/public/images/example.png';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';

const Org = () => {
    const [active, setActive] = useState(1);

    const tabItem = css`
        width: 208px;
        height: 56px;
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        background-color: #F5F7FA;
        border-radius: 32px;
        cursor: pointer;
        transition: .3s ease-in-out;

        span {
            transition: .3s ease-in-out;
        }
        &:nth-of-type(2) {
            span {
                border-radius: 8px;
                background-color: #B3ED73;
                padding: 4px 8px;
            }
        }
        &:nth-of-type(3) {
            span {
                border-radius: 8px;
                background-color: #FF5B3B;
                padding: 4px 8px;
                color: #fff;
            }
        }
        
        @media(max-width: 767px) {
            width: 100%;
        }
    `;
    const tabItemActive = css`
        background-color: #8553F9;
        color: #fff;

        &:nth-of-type(2) {
            span {
                color: #191921;
            }
        }
    `;

	const [orgsData, setOrgsData] = useState(null)
	useEffect(() => {
		axios
			.get(getApiUrl('/backend/wp-json/pages/v2/org/'))
			.then((response) => {
				setOrgsData(response.data);
				console.log('orgs - ', response.data)
			})
			.catch(console.error);
	}, []);

    return (
        <>
            <div className={pagePromo}>
                <Container>
                    <Breadcrumbs>
                        <Link href="/">Главная</Link>
                        <p>Организаторам</p>
                    </Breadcrumbs>
                    <h1 className={cx(pageTitle, css`text-align:center;`)}>{orgsData?.title && orgsData.title}</h1>
                    <div className={css`
                        font-size: 20px;
                        line-height: 1.4;
                        text-align: center;

                        span {
                            color: #8553F9;
                            font-weight: 500;
                        }

                        br {
                            @media(max-width: 575px) {
                                display: none;
                            }
                        }

						@media(max-width: 767px) {
							font-size: 16px;
							line-height: 1.22;
						}
                    `} dangerouslySetInnerHTML={{ __html: orgsData?.content }}></div>
                </Container>
            </div>

            <div className={css`
                padding: 32px 0 120px;

                @media(max-width: 575px) {
                    padding-bottom: 64px;
                }
            `}>
                <Container>
                    <div className={css`
                        font-size: 36px;
                        line-height: 1.12;
                        font-family: Impact;
                        text-align: center;
                        margin-bottom: 24px;    
                    `}>{orgsData?.fields?.tariffs?.title}</div>
					<div className={css`
						text-align: center;
						font-size: 20px;
						line-height: 1.4;
						margin-bottom: 48px;

						span {
							color: #8553F9;
							font-weight: 500;
						}

						@media(max-width: 767px) {
							font-size: 16px;
							line-height: 1.22;
						}
					`} dangerouslySetInnerHTML={{ __html: orgsData?.fields?.tariffs?.text }}></div>
                    {/* <div className={css`
                        display: flex;
                        gap: 4px;
                        padding: 4px;
                        border-radius: 32px;
                        background-color: #F5F7FA;
                        width: max-content;
                        margin: 0 auto 32px;

                        @media(max-width: 767px) {
                            flex-direction: column;
                            width: 100%;
                        }
                    `}>
                        <div className={cx(tabItem, active === 1 && tabItemActive)} onClick={()=>setActive(1)}>1 месяц</div>
                        <div className={cx(tabItem, active === 2 && tabItemActive)} onClick={()=>setActive(2)}>3 месяца <span>- 10%</span></div>
                        <div className={cx(tabItem, active === 3 && tabItemActive)} onClick={()=>setActive(3)}>6 месяцев <span>- 15%</span></div>
                    </div> */}

                    <div className={css`
                        display: flex;
						justify-content: center;
                        gap: 32px;
                        margin-bottom: 90px;

                        @media(max-width: 991px) {
                            flex-wrap: wrap;
                        }
                    `}>
                        {/* <div className={css`
                            // flex: 0 1 calc(33.333333% - 21.333333px);
                            // max-width: calc(33.333333% - 21.333333px);
							flex: 0 1 400px;
							max-width: 400px;
                            padding: 40px 24px 24px;
                            border-radius: 28px;
                            border: 2px solid #8553F9;
                            background-color: #F5F7FA;
                            display: flex;
                            flex-direction: column;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 24px 16px;
                            }
                        `}>
                            <div className={css`
                                color: #8553F9;
                                text-align: center;
                                font-family: Impact;
                                font-size: 24px;
                                line-height: 1.34;
                                margin-bottom: 24px;
                            `}>Базовый</div>
                            <div className={css`
                                margin-bottom: 40px;
                                text-align: center;
                                font-size: 28px;
                                font-weight: 500;
                                line-height: 1.2;
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
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Ссылка на сайт с UTM</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Аналитика мероприятия</p>
                                <p className={css`color: #D7DADD; &::before {content: none!important;}`}>Добавление фото/видео материалов</p>
                            </div>
                            <Button style={{margin: '0 auto'}} className={cx(css`@media(max-width: 991px) {width: 100%!important;}`)}>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
                        </div>
                        <div className={css`
                            // flex: 0 1 calc(33.333333% - 21.333333px);
                            // max-width: calc(33.333333% - 21.333333px);
							flex: 0 1 400px;
							max-width: 400px;
                            padding: 40px 24px 24px;
                            border-radius: 28px;
                            border: 2px solid #8553F9;
                            background-color: #F5F7FA;
                            display: flex;
                            flex-direction: column;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 24px 16px;
                            }
                        `}>
                            <div className={css`
                                color: #8553F9;
                                text-align: center;
                                font-family: Impact;
                                font-size: 24px;
                                line-height: 1.34;
                                margin-bottom: 24px;
                            `}>Расширенный</div>
                            <div className={css`
                                margin-bottom: 40px;
                                text-align: center;
                                font-size: 28px;
                                font-weight: 500;
                                line-height: 1.2;
                            `}>5&nbsp;000&nbsp;₽ {active === 2 && <p className={css`color: #B5B7B9;text-align: center;font-size: 24px;font-weight: 500;line-height: 1.2;text-decoration: line-through;`}>10000 Р. / мес</p>}</div>
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
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                            <Button style={{margin: '0 auto'}} className={cx(css`@media(max-width: 991px) {width: 100%!important;}`)}>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
                        </div> */}
                        {/* <div className={css`
                            flex: 0 1 calc(33.333333% - 21.333333px);
                            max-width: calc(33.333333% - 21.333333px);
                            padding: 40px 24px 24px;
                            border-radius: 28px;
                            border: 2px solid #8553F9;
                            background-color: #F5F7FA;
                            display: flex;
                            flex-direction: column;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 24px 16px;
                            }
                        `}>
                            <div className={css`
                                color: #8553F9;
                                text-align: center;
                                font-family: Impact;
                                font-size: 24px;
                                line-height: 1.34;
                                margin-bottom: 24px;
                            `}>Бизнес</div>
                            <div className={css`
                                margin-bottom: 40px;
                                text-align: center;
                                font-size: 28px;
                                font-weight: 500;
                                line-height: 1.2;
                            `}>5 000 Р. / мес {active === 3 && <p className={css`color: #B5B7B9;text-align: center;font-size: 24px;font-weight: 500;line-height: 1.2;text-decoration: line-through;`}>10000 Р. / мес</p>}</div>
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
                                <p>Подписка на <b>3 мероприятия</b></p>
                                <p>Текстовое описание, обложка, дата, место</p>
                                <p>Ссылка на сайт с UTM</p>
                                <p>Аналитика мероприятия</p>
                                <p>Добавление фото/видео материалов</p>
                            </div>
                            <Button className={cx(css`@media(max-width: 991px) {width: 100%!important;}`)}>Попробовать</Button>
                        </div> */}


						{orgsData?.fields?.tariffs?.items.map((item, index) => (
							<div key={index} className={css`
                            // flex: 0 1 calc(33.333333% - 21.333333px);
                            // max-width: calc(33.333333% - 21.333333px);
							flex: 0 1 400px;
							max-width: 400px;
                            padding: 40px 24px 24px;
                            border-radius: 28px;
                            border: 2px solid #8553F9;
                            background-color: #F5F7FA;
                            display: flex;
                            flex-direction: column;

                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
                                padding: 24px 16px;
                            }
                        `}>
                            <div className={css`
                                color: #8553F9;
                                text-align: center;
                                font-family: Impact;
                                font-size: 28px;
                                line-height: 1.34;
                                margin-bottom: 24px;
                            `}>{item.name}</div>
                            <div className={css`
                                margin-bottom: 40px;
                                text-align: center;
                                font-size: 28px;
                                font-weight: 500;
                                line-height: 1.2;
                            `}>{item.cost}</div>
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

									${index !== 0 && 
                                    `&::before {
                                        content: '';
                                        position: absolute;
                                        width: 16px;
                                        height: 16px;
                                        left: 0;
                                        top: 0;
                                        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_9501_15213)"><path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="%23B3ED73"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7783 5.74978L7.01386 11.0435L4.23438 8.26408L4.76471 7.73375L6.98523 9.95426L11.2208 5.24805L11.7783 5.74978Z" fill="%23191921"/></g><defs><clipPath id="clip0_9501_15213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
                                    }`
									}
                                }
                            `}>
                                <p>Описание события, обложка, дата и место проведения</p>
                                <p style={{color: index == 0 && '#D7DADD'}}>Ссылка на сайт</p>
                                <p style={{color: index == 0 && '#D7DADD'}}>Аналитика (просмотры, переходы)</p>
                                <p style={{color: index == 0 && '#D7DADD'}}>Фото и видео</p>
                            </div>
                            <Button style={{margin: '0 auto'}} className={cx(css`@media(max-width: 991px) {width: 100%!important;}`)}>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
                        </div>
						))}
                    </div>
                    
                    <div className={css`
                        margin-bottom: 24px;
                        font-family: Impact;
                        font-size: 36px;
                        line-height: 1.12;
                        text-align: center;
                    `}>Интересные события</div>
					<div className={css`
						text-align: center;
						font-size: 20px;
						margin-bottom: 48px;

						@media(max-width: 767px) {
							font-size: 16px;
							line-height: 1.22;
						}
					`}>Также, мы&nbsp;предлагаем дополнительные опции продвижения,<br/> которые помогут вывести ваше событие в&nbsp;топ и&nbsp;привлечь именно ту&nbsp;аудиторию, которая вам нужна.</div>
                    <div className={css`
                        border-radius: 28px;
                        border: 2px solid #8553F9;
                        background-color: #F5F7FA;
                        padding: 32px;
                        display: flex;
                        gap: 64px;
                        align-items: center;

                        @media(max-width: 991px) {
                            flex-direction: column;
                            padding: 32px 16px;
                        }
                    `}>
                        <div className={css`
                            flex: 1;
                        `}>
                            <div className={css`
                                font-size: 20px;
                                color: #47474D;
                                margin-bottom: 32px;
                                line-height: 1.4;

                                span {
                                    font-weight: bold;
                                    color: #8553F9;
                                }

                                @media(max-width: 575px) {
                                    font-size: 18px;
                                    line-height: 1.2;
                                }
                            `} dangerouslySetInnerHTML={{ __html: orgsData?.fields?.['interesting-events'].text_1 }}></div>
                            <div className={css`font-size: 14px;line-height:1.116;margin-bottom: 40px;`}>{orgsData?.fields?.['interesting-events'].text_2}</div>
                            <div className={css`
                                margin-bottom: 16px;font-size:28px;line-height:1.2;

                                @media(max-width: 575px) {
                                    font-size: 24px;
                                }
                            `}>{orgsData?.fields?.['interesting-events'].text_3}</div>
                            <Button className={css`@media(max-width: 991px) {width: 100%;}`}>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
                        </div>
                        <div className={css`
                            flex: 0 1 661px;
                            max-width: 661px;
                            position: relative;
							margin-bottom: -102px;

                            @media(max-width: 1199px) {
                                flex: 0 1 500px;
                                max-width: 500px;
                            }
                            @media(max-width: 991px) {
                                flex: 0 1 100%;
                                max-width: 100%;
								margin-bottom: -60px;
                            }

                            &::before {
                                content: '';
                                position: absolute;
                                width: 183px;
                                height: 79px;
                                left: -85px;
                                top: 80px;
                                background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="183" height="79" viewBox="0 0 183 79" fill="none"><path d="M0.818157 37.7171C0.508037 38.1741 0.627104 38.796 1.0841 39.1061C1.54109 39.4162 2.16296 39.2972 2.47308 38.8402L0.818157 37.7171ZM119.604 32.6084L118.616 32.4522L119.604 32.6084ZM67.7535 27.8503L68.6834 28.218L67.7535 27.8503ZM183.001 78.502L179.975 67.3585L171.837 75.5509L183.001 78.502ZM2.47308 38.8402C17.8733 16.1462 48.7371 3.9118 74.978 2.8112C88.0905 2.26123 99.8952 4.50067 107.954 9.46906C111.972 11.946 115.038 15.087 116.9 18.8823C118.759 22.6722 119.45 27.1801 118.616 32.4522L120.591 32.7646C121.482 27.1347 120.757 22.2033 118.696 18.0015C116.637 13.8052 113.279 10.4018 109.004 7.76658C100.478 2.51055 88.2249 0.253837 74.8942 0.812957C48.2487 1.93053 16.6852 14.3353 0.818157 37.7171L2.47308 38.8402ZM118.616 32.4522C117.335 40.554 112.967 45.8728 107.295 48.9468C101.589 52.0394 94.5145 52.8813 87.8759 51.8739C81.2294 50.8653 75.1517 48.0239 71.3951 43.9084C67.6855 39.8443 66.1962 34.5079 68.6834 28.218L66.8235 27.4826C64.0374 34.5284 65.7268 40.6651 69.918 45.2567C74.0622 49.7969 80.6074 52.7938 87.5759 53.8513C94.5523 54.9099 102.085 54.0457 108.248 50.7051C114.446 47.346 119.209 41.5047 120.591 32.7646L118.616 32.4522ZM68.6834 28.218C70.2075 24.3637 72.3664 21.6219 75.0188 19.7974C77.6746 17.9707 80.8915 17.0181 84.6017 16.8534C92.0598 16.5224 101.382 19.3821 111.677 24.5064C132.236 34.7396 156.195 53.757 175.918 72.8762L177.31 71.4402C157.519 52.2545 133.39 33.0796 112.568 22.7159C102.173 17.5417 92.4813 14.5018 84.513 14.8554C80.51 15.033 76.9105 16.0688 73.8854 18.1496C70.8569 20.2327 68.4704 23.3177 66.8235 27.4826L68.6834 28.218Z" fill="%238553F9"/></svg>');

                                @media(max-width: 991px) {
                                    left: 50%;
                                    margin-left: -85px;
                                    top: -60px;
                                }
                            }

							& > img {
								height: auto!important;
							}
                        `}>
							{/* <Image src={example_img} alt="" /> */}
							<img src={orgsData?.fields?.['interesting-events'].image} alt="" />
                        </div>
                    </div>
                </Container>
            </div>

            <Form />
        </>
    );
}

export default Org;