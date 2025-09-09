"use client"

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SliderArrow from "@/public/images/svg/arrow.svg";
import LinkArrow from "@/public/images/svg/arrow_link.svg";
import axios from "axios";
import { formatDate, getApiUrl } from "@/functions/functions";
import Link from "next/link";
import styled from "@emotion/styled";
import { DoubleLinkArrow } from "@/styles/ui";


const Next = styled.div`
	width: 56px;
	height: 56px;
	border: 2px solid #8553F9;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media(max-width: 575px) {
		width: 48px;
		height: 48px;
	}

	& > div {
		display: flex;
		width: 18px;
		height: 18px;
		position: relative;
		overflow: hidden;

		& > svg {
			position: absolute;
			transition: ${({theme}) => theme.transition};

			&:nth-of-type(2) {
				transform: translateX(18px);
			}
		}
	}
	
	&:hover {
		svg {
			transform: translateX(-18px);

			&:nth-of-type(2) {
				transform: translateX(0);
			}
		}
	}
`
const SliderBlock = styled.div`
	background-color: #22222A;
    border-radius: 28px;
    margin-bottom: 120px;
            
    @media(max-width: 1339px) {
        margin-bottom: -32px;
    }
`
const SliderBlockTop = styled.div`
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
`
const SliderBlockTopTitle = styled.div`
	color: #fff;
    font-family: Impact;
`
const SliderBlockTopNav = styled.div`
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
`
const SliderMainPart = styled.div`
	padding: 0 40px 40px;

    @media(max-width: 575px) {
        padding: 0 16px 32px;
    }

    & > div {
        border-radius: 28px;
    }
`
const SkeletonItem = styled.div`
	background: #eee;
	padding: 1rem;
	border-radius: 24px;
	animation: pulse 1.5s infinite;
	height: 441px;
	width: 33%;

	@keyframes pulse {
		0% { opacity: 1 }
		50% { opacity: 0.5 }
		100% { opacity: 1 }
	}
`
const SliderFormatsItem = styled.div`
	border-radius: 8px;
    background-color: ${({theme}) => theme.colors.green};
    padding: 3px 8px 5px;
    color: #191921;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.16;
    width: max-content; 
` 
const SliderItemTitle = styled(Link)`
	font-size: 18px;
    font-weight: 500;
    line-height: 1.36;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;  
`
const SliderItemDate = styled.div`
	color: ${({theme}) => theme.colors.purple};
    font-size: 28px;
    line-height: 1.2;
    margin-bottom: 4px;
    font-family: Impact;
    
    @media(max-width: 575px) {
        font-size: 24px;
    }
`

export const MainEventsSlider = () => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [events, setEvents] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
        .get(getApiUrl("/backend/wp-json/events/v2/interesting-events/"))
        .then((response) => {
			setEvents(response.data);
			console.log('ОШИБКА ТУТ', response.data)
			setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
			setIsLoading(false);
        });

    }, [])

    return (       
        <SliderBlock>
            <SliderBlockTop>
                <SliderBlockTopTitle>Интересные события</SliderBlockTopTitle>
                <SliderBlockTopNav>
                    <Next ref={navigationPrevRef}>
						<div>
							<SliderArrow />
							<SliderArrow />
						</div>
                    </Next>
                    <Next ref={navigationNextRef} style={{transform: 'rotate(180deg)'}}>
                        <div>
							<SliderArrow />
							<SliderArrow />
						</div>
                    </Next>
                </SliderBlockTopNav>
            </SliderBlockTop>
                    
                    <SliderMainPart>
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
					{isLoading ? (
						<div style={{display: 'flex', gap: 32}}>
							{[...Array(3)].map((_, i) => (
								<SkeletonItem key={i}></SkeletonItem>
							))}
						</div>
					) : 
                        events && events.items.map((item, index) => (
                            <SwiperSlide key={index} style={{borderRadius: 24, backgroundColor: '#fff', overflow: 'hidden'}}>
                                <Link href={`/event/${item.slug}`} style={{width: '100%', height: 256}}>
                                    <img src={item.cover} alt="" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
                                </Link>
                                <div style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16, height: 256}}>
                                    <div>
										{item.format.map((f, idx) => (
											<SliderFormatsItem key={idx}>
												<Link href={`/events/${f.slug}`}>
													{f.name}
												</Link>
											</SliderFormatsItem>
										))}
                                    </div>

                                    <SliderItemTitle href={`/event/${item.slug}`} dangerouslySetInnerHTML={{ __html: item.title }} />
                                    
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto'}}>
                                        <div>
                                            <SliderItemDate>
												
												{
									(() => {
										const [d1, m1, y1] = item.date_start.split('.');
										const [d2, m2, y2] = item.date_end.split('.');

										if (item.date_start === item.date_end) {
										return formatDate(item.date_start);
										} else if (m1 === m2 && y1 === y2) {
										// Берём отформатированную дату и убираем оттуда число, оставляя "июня 2025"
										const formatted = formatDate(item.date_start);
										const [, monthAndYear] = formatted.split(' ', 2); // может вернуть только месяц
										const rest = formatted.slice(formatted.indexOf(' ') + 1); // "июня 2025"
										return `${d1}–${d2} ${rest}`;
										} else {
										return (
											<>
											{formatDate(item.date_start)} -<br />
											{formatDate(item.date_end)}
											</>
										);
										}
									})()
									}
											</SliderItemDate>
                                            <div style={{color: '#47474D', fontSize: 14, lineHeight: 1.16}}>{item.online ? 'Онлайн-событие' : item.city}</div>
                                        </div>
                                        <DoubleLinkArrow href={`/event/${item.slug}`}>
											<div>
												<LinkArrow />
												<LinkArrow />
											</div>
                                        </DoubleLinkArrow>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    </SliderMainPart>
                </SliderBlock>
    )
};