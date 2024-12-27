import { useRef } from "react";
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

const eventsArray = [
    {
        title: 'Налоговая и юридическая безопасность селлера на маркетплейсах',
        tag: 'Конференция',
        date: <>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</>,
        place: 'Россия, Екатеринбург',
    },
    {
        title: 'Налоговая и юридическая безопасность селлера на маркетплейсах',
        tag: 'Конференция',
        date: <>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</>,
        place: 'Россия, Екатеринбург',
    },
    {
        title: 'Налоговая и юридическая безопасность селлера на маркетплейсах',
        tag: 'Конференция',
        date: <>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</>,
        place: 'Россия, Екатеринбург',
    },
    {
        title: 'Налоговая и юридическая безопасность селлера на маркетплейсах',
        tag: 'Конференция',
        date: <>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</>,
        place: 'Россия, Екатеринбург',
    }
]

export const MainEventsSlider = () => {
    const theme = useTheme();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className={css`
            background-color: #22222A;
            border-radius: 28px;
            position: relative;
            margin-bottom: 120px;

            &::before {
                content: '';
                position: absolute;
                left: -100vw;
                bottom: -120px;
                width: 200vw;
                height: 600px;
                background-color: ${theme.colors.purple};
                z-index: -1;
            }
        `}>
            <div className={css`
                display: flex;
                justify-content: space-between;
                padding: 40px;
                align-items: center;
                font-size: 36px;
                line-height: 1.12;    
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
                        slidesPerView={3}
                        spaceBetween={24}
                    >
                        {eventsArray.map((item, index) => (
                        <SwiperSlide key={index} className={css`
                            border-radius: 24px;
                            background-color: #fff;
                            overflow: hidden;    
                        `}>
                            <NavLink to="/events/test">
                                <img src={img_ex_1} alt="" />
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
                                `}>{item.tag}</div>
                                <NavLink to="/events/test" className={css`
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
                                        `}>{item.date}</div>
                                        <div className={css`
                                            color: #47474D;
                                            font-size: 14px;
                                            line-height: 1.16;    
                                        `}>{item.place}</div>
                                    </div>
                                    <NavLink to="/events/test">
                                        <LinkArrow />
                                    </NavLink>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    </div>
                </div>
    )
};