import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ReactComponent as SliderArrow } from '../images/svg/slider_arrow.svg';
import { ReactComponent as LinkArrow } from '../images/svg/link_arrow.svg';
import img_ex_1 from '../images/events_1.jpg';
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { NavLink } from "react-router";
import axios from "axios";
import { formatDate } from "../functions/functions";

export const MainEventsSlider = () => {
    const theme = useTheme();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [events, setEvents] = useState(null);

    //get items
    const [homeData, setHomeData] = useState(null)
    useEffect(() => {
      axios
        .get("https://dev.goconf.ru/backend/wp-json/events/v2/interesting-events/")
        .then((response) => {
          setHomeData(response.data)
          console.log('interesting-events ', response.data)
        })
        .catch((error) => {
            console.log(error)
        });

    }, [])

    return (
        

       
        <div className={css`
            background-color: #22222A;
            border-radius: 28px;
            margin-bottom: 120px;
            
            @media(max-width: 1339px) {
                margin-bottom: -32px;
            }
        `}>
            <div className={css`
                display: flex;
                justify-content: space-between;
                padding: 40px;
                align-items: center;
                font-size: 36px;
                line-height: 1.12;
                gap: 16px;

                @media(max-width: 575px) {
                    padding: 32px 16px;
                    font-size: 28px;
                }
            `}>
                <div className={css`
                    color: #fff;
                    font-family: Impact;    
                `}>Интересные события</div>
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
                    
                    <div className={css`
                        padding: 0 40px 40px;

                        @media(max-width: 575px) {
                            padding: 0 16px 32px;
                        }

                        & > div {
                            border-radius: 28px;
                        }
                    `}>
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
                        {homeData && homeData.items.map((item, index) => (
                            <SwiperSlide key={index} className={css`
                                border-radius: 24px;
                                background-color: #fff;
                                overflow: hidden;
                            `}>
                                <NavLink to={`/event/${item.slug}`} className={css`
                                    width: 100%;
                                `}>
                                    <img src={item.cover} alt="" className={css`
                                        object-fit: cover;
                                        width: 100%;
                                        height: 100%;
                                    `} />
                                </NavLink>
                                <div className={css`
                                    padding: 24px;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 16px;    
                                `}>
                                    <div>
                                    {/* {item.format.map((f)=>{
                                            <div className={css`
                                                border-radius: 8px;
                                                background-color: ${theme.colors.green};
                                                padding: 3px 8px 5px;
                                                color: #191921;
                                                font-size: 14px;
                                                font-weight: 500;
                                                line-height: 1.16;
                                                width: max-content;    
                                            `}><NavLink to={`/events/${f.slug}`}>
                                                {f.name}
                                            </NavLink>
                                            </div>
                                        })} */}

{item.format.map((f, idx) => (
        <div key={idx} className={css`
            border-radius: 8px;
            background-color: ${theme.colors.green};
            padding: 3px 8px 5px;
            color: #191921;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.16;
            width: max-content;    
        `}><NavLink to={`/events/${f.slug}`}>
            {f.name}
        </NavLink>
        </div>
      ))}
                                    </div>
                                        
                                        
                                    <NavLink to={`/event/${item.slug}`} className={css`
                                        font-size: 18px;
                                        font-weight: 500;
                                        line-height: 1.36;
                                        -webkit-line-clamp: 2;
                                        line-clamp: 2;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;    
                                    `} dangerouslySetInnerHTML={{ __html: item.title }} />
                                    {/* {item.title}</NavLink> */}
                                    <div className={css`
                                        display: flex;
                                        align-items: flex-end;
                                        justify-content: space-between;    
                                    `}>
                                        <div>
                                            <div className={css`
                                                color: ${theme.colors.purple};
                                                font-size: 28px;
                                                line-height: 1.2;
                                                margin-bottom: 4px;
                                                font-family: Impact;
    
                                                @media(max-width: 575px) {
                                                    font-size: 24px;
                                                }
                                            `}>{formatDate(item.date_start)} -<br/> {formatDate(item.date_end)}</div>
                                            <div className={css`
                                                color: #47474D;
                                                font-size: 14px;
                                                line-height: 1.16;    
                                            `}>{item.online ? 'Онлайн-событие' : item.city}</div>
                                        </div>
                                        <NavLink to={`/event/${item.slug}`}>
                                            <LinkArrow />
                                        </NavLink>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        {/* {events && events.map((item, index) => (
                        <SwiperSlide key={index} className={css`
                            border-radius: 24px;
                            background-color: #fff;
                            overflow: hidden;
                        `}>
                            <NavLink to={`/events/${item.url}`} className={css`
                                width: 100%;
                            `}>
                                <img src={img_ex_1} alt="" className={css`
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                `} />
                            </NavLink>
                            <div className={css`
                                padding: 24px;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;    
                            `}>
                                <div className={css`
                                    border-radius: 8px;
                                    background-color: ${theme.colors.green};
                                    padding: 3px 8px 5px;
                                    color: #191921;
                                    font-size: 14px;
                                    font-weight: 500;
                                    line-height: 1.16;
                                    width: max-content;    
                                `}><NavLink to={`/events/${item.url}`}>{item.format}</NavLink></div>
                                <NavLink to={`/events/${item.url}`} className={css`
                                    font-size: 18px;
                                    font-weight: 500;
                                    line-height: 1.36;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;    
                                `}>{item.title}</NavLink>
                                <div className={css`
                                    display: flex;
                                    align-items: flex-end;
                                    justify-content: space-between;    
                                `}>
                                    <div>
                                        <div className={css`
                                            color: ${theme.colors.purple};
                                            font-size: 28px;
                                            line-height: 1.2;
                                            margin-bottom: 4px;
                                            font-family: Impact;

                                            @media(max-width: 575px) {
                                                font-size: 24px;
                                            }
                                        `}>{item.date1} -<br/> {item.date2}</div>
                                        <div className={css`
                                            color: #47474D;
                                            font-size: 14px;
                                            line-height: 1.16;    
                                        `}>{item.city}</div>
                                    </div>
                                    <NavLink to={`/event/${item.slug}`}>
                                        <LinkArrow />
                                    </NavLink>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))} */}
                        
                    </Swiper>
                    </div>
                </div>
            
    )
};