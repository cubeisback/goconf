import { breadcrumbs, Button, container, pagePromo, pageTitle } from './ui';
import event_img from '../images/event_ex.jpg'
import { ReactComponent as SliderArrow } from '../images/svg/slider_arrow.svg';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Helper } from '../components/ui/Helper';
import { useEffect, useRef, useState } from 'react';
import { MainEventsSlider } from '../components/MainEventsSlider';
import { Form } from '../components/Form';
import { MainEvents } from '../components/MainEvents';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';

export const Event = () => {
    const [version, setVersion] = useState(0);

    const theme = useTheme();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [event, setEvent] = useState(null);
    const location = useLocation(); // Получаем информацию о текущем пути
    const [pageInfo, setPageInfo] = useState(null)
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const eventId = pathParts[pathParts.length - 1];

        // console.log('asddashjlksdhffdhgjfd;lgkl', eventId)
    
        // getEventById(eventId).then((res) => setEvent(res[0]));

        axios
        .get(`https://dev.goconf.ru/backend/wp-json/events/v2/single/?slug=${eventId}`)
        .then((response) => {
            setPageInfo(response.data)
            console.log('page ', response.data)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [location.pathname]);



    // const [similarItems, setSimilarItems] = useState(null)
    // useEffect(() => {
    //   axios
    //     .get(`https://dev.goconf.ru/backend/wp-json/events/v2/similar-events/?id={${ID}}`)
    //     .then((response) => {
    //         setSimilarItems(response.data)
    //       console.log('interesting-events ', response.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });

    // }, [])
    

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
                    {pageInfo && <h1 className={pageTitle}>{pageInfo.data.post_title}</h1> }
                    <div className={promoThemes}>
                        <p>Тематика:</p>
                        {pageInfo && pageInfo.subjects.map(theme => (
                            <NavLink key={theme.term_id} to="/">{theme.name}</NavLink>
                        ))}
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
                    {pageInfo &&
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
                            max-width: 952px;
                        `}>
                            <img src={pageInfo.fields.cover.url} alt="" className={css`margin-bottom: 40px;`} />

                            <div className={text} dangerouslySetInnerHTML={{ __html: pageInfo.data.post_content }} />
                            {/* <div className={text}>{pageInfo.data.short_text}</div> */}
                                 
                                {/* <p>Сразу два уникальных события ждут представителей индустрии в ноябре:</p>
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
                                <p>Ключевые игроки рекламного рынка обсудят цели и задачи российского маркетинга, узнаваемость отечественных брендов и тренды в поведении потребителей.</p> */}
                            {/* </div> */}

                            {version === 3 && 
                            
                            <div className={css`
                                padding-top: 32px;
                            `}>
                                <div className={css`
                                    display: flex;
                                    gap: 16px;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 24px;
                                `}>
                                    <div className={pageTitle}>Галерея</div>
                                    <div className={css`
                                        display: flex;
                                        gap: 16px;

                                        & > div {
                                            display: flex;
                                            cursor: pointer;
                                        }

                                        svg {
                                            @media(max-width: 575px) {
                                                width: 48px;
                                                height: 48px;
                                            }
                                        }
                                    `}>
                                        <div ref={navigationPrevRef}>
                                            <SliderArrow />
                                        </div>
                                        <div ref={navigationNextRef}style={{transform: 'rotate(180deg)'}}>
                                            <SliderArrow />
                                        </div>
                                    </div>
                                </div>
                                <Swiper 
                                    modules={[Navigation]} 
                                    navigation={{
                                        prevEl: navigationPrevRef.current,
                                        nextEl: navigationNextRef.current,
                                    }}
                                    loop
                                    onSwiper={(swiper) => {
                                        setTimeout(() => {
                                            if (swiper.params) {
                                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                                            swiper.params.navigation.nextEl = navigationNextRef.current;
                                
                                            swiper.navigation.destroy();
                                            swiper.navigation.init();
                                            swiper.navigation.update();
                                            }
                                        }, 500);
                                    }}
                                    slidesPerView={1}
                                    spaceBetween={24}

                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                        slidesPerView: 3,
                                        },
                                    }}
                                >
                                    <SwiperSlide className={css`
                                        border-radius: 24px;
                                        background-color: #fff;
                                        overflow: hidden;
                                    `}>
                                        <img src={''} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={css`
                                        border-radius: 24px;
                                        background-color: #fff;
                                        overflow: hidden;
                                    `}>
                                        <img src={''} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={css`
                                        border-radius: 24px;
                                        background-color: #fff;
                                        overflow: hidden;
                                    `}>
                                        <img src={''} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={css`
                                        border-radius: 24px;
                                        background-color: #fff;
                                        overflow: hidden;
                                    `}>
                                        <img src={''} alt="" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            }

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
                                `}>{pageInfo.fields.events_start} - {pageInfo.fields.events_end}</p>
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
                                `}>{pageInfo.cities[0] && pageInfo.cities[0].name}</p>
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
                                `}>{pageInfo.fields.address}</p>
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
                                `}>{pageInfo.fields.events_cost}</p>
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

                                {pageInfo.formats.map(format => (
                                    <p key={format.name} className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>{format.name}</p>
                                ))}
                                
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
                                <NavLink to={`/organizer/${pageInfo.company[0] && pageInfo.company[0].name}`} className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: #8553F9;
                                    cursor: pointer;
                                `}>{pageInfo.company[0] && pageInfo.company[0].name}</NavLink>
                            </div>
                            </div>
                            
                            {version === 2 && <a href="/" className={css`
                                color: ${theme.colors.purple};
                            `}>Это ваше мероприятие?</a>}
                            {version === 3 && <Button green>На сайт мероприятия</Button>}
                        </motion.div>
                    </div>
                    }
                </div>
            </div>
            
            <div className={css`
                position: relative;
                // overflow-x: hidden;

                &::before {
                    content: '';
                    position: absolute;
                    left: -100vw;
                    bottom: -120px;
                    width: 200vw;
                    height: 600px;
                    background-color: ${theme.colors.purple};
                    z-index: -1;

                    @media(max-width: 1339px) {
                        content: none;
                    }
                }
            `}>
                <div className={cx(container, css`@media(max-width: 1439px) {padding: 0;}` )}>
                    <MainEventsSlider />
                </div>
            </div>

            <MainEvents id={pageInfo && pageInfo.data.ID} similar={true} />
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