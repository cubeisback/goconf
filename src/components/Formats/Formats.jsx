import { css } from '@emotion/css';
import { container } from '../../pages/ui';
import { useTheme } from '@emotion/react';
// import formats_ex_1 from '../../images/formats_1.jpg';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import { NavLink } from 'react-router';

export const Formats = () => {
    const theme = useTheme();

    //ширина экрана
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
      
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const [formatItems, setFormatItems] = useState(null)
    useEffect(() => {
      axios
        .get("https://dev.goconf.ru/backend/wp-json/events/v2/popular-formats/")
        .then((response) => {
            setFormatItems(response.data.items)
            console.log('popular-formats ', response.data)
        })
        .catch((error) => {
            console.log(error)
        });

    }, [])
    

    return (
        <div className={css`
            background-color: #F5F7FA;
            padding: 120px 0;
            overflow: hidden;

            @media(max-width: 575px) {
                padding: 96px 0 64px;
            }
        `}>
            <div className={container}>
                <div className={css`
                    text-align: center;
                    margin-bottom: 96px;
                    font-family: Impact;
                    font-size: 56px;
                    line-height: 1.15;

                    @media(max-width: 575px) {
                        font-size: 32px;
                    }

                    & > span {
                        color: ${theme.colors.purple}
                    }
                `}>Популярные форматы
                {/* <span>GoCONF</span> */}
                </div>
                {/* <div className={css`
                    font-size: 20px;
                    line-height: 1.14;
                    color: #47474D;
                    margin-bottom: 96px;
                    text-align: center;

                    @media(max-width: 575px) {
                        font-size: 18px;
                        margin-bottom: 48px;
                    }
                `}>Самые интересные бизнес-мероприятия различных форматов от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div> */}
            </div>
            {windowWidth > 767 ?
            <div className={css`
                // overflow-x: hidden;
            `}>
            <div className={css`
                display: flex;
                gap: 24px;
                width: 10000px;
                animation: scroll-left 20s linear infinite;

                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-1240px);
                    }
                }
            `}>
                {formatItems && formatItems.map((item, index) => (
                    <NavLink to={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`} key={index} className={css`
                        max-width: 224px;
                        border-radius: 24px;
                        overflow: hidden;
                        position: relative;
                        transition: ${theme.transition};

                        &:hover {
                            transform: scale(1.05);
                        }
                    `}>
                        <img src={item.img} alt="" />
                        <div className={css`
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 16px;
                        `}>
                            <div className={css`
                                font-size: 18px;
                                color: #fff;
                                font-weight: 500;
                                line-height: 1.36;
                            `} dangerouslySetInnerHTML={{
                                __html: item.name.replace(/\r\n/g, ''),
                              }}></div>
                            <div className={css`
                                padding: 2px 4px;
                                border-radius: 4px;
                                background: rgba(255, 255, 255, 0.08);
                                backdrop-filter: blur(8px);
                                line-height: 1.28;
                                color: #fff;
                                width: max-content;
                            `}>{item.count} событий</div>
                        </div>
                    </NavLink>
                ))}
            </div>
            </div>
            : 
            <Swiper 
                loop
                slidesPerView='auto'
            >
                        {formatItems && formatItems.map((item, index) => (
                            <SwiperSlide key={index} className={css`
                                max-width: 180px;
                                padding: 0 10px; 
                            `}>
                            <NavLink to={`/events/${item.subject ? `direction_${item.subject}/` : ''}${item.city ? `city_${item.city}/` : ''}${item.format ? `format_${item.format}/` : ''}`} className={css`
                                max-width: 224px;
                                border-radius: 24px;
                                overflow: hidden;
                                position: relative;
                            `}>
                                <img src={item.img} alt="" />
                                <div className={css`
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    padding: 16px;
                                `}>
                                    <div className={css`
                                        font-size: 18px;
                                        color: #fff;
                                        font-weight: 500;
                                        line-height: 1.36;
                                    `} dangerouslySetInnerHTML={{
                                        __html: item.name.replace(/\r\n/g, ''),
                                      }}></div>
                                    <div className={css`
                                        padding: 2px 4px;
                                        border-radius: 4px;
                                        background: rgba(255, 255, 255, 0.08);
                                        backdrop-filter: blur(8px);
                                        line-height: 1.28;
                                        color: #fff;
                                        width: max-content;
                                    `}>{item.count} событий</div>
                                </div>
                            </NavLink>
                            </SwiperSlide>
                        ))}
            </Swiper>
            }
        </div>
    );
}