"use client"

import { css } from "@emotion/css";
import { Container, DoubleLinkArrow } from "@/styles/ui";
import { useTheme } from "@emotion/react";
import LinkArrow from "@/public/images/svg/arrow_link.svg";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import axios from "axios";
import { formatDate, getApiUrl } from "@/functions/functions";
import Link from "next/link";


export const MainEvents = ({onPage, similar, id, events}) => {
    const theme = useTheme();

    const [limit, setLimit] = useState(5);

    const [nearEvents, setNearEvents] = useState(null)
   
    useEffect(() => {
        if (events === undefined || events === null) {
            if(similar) {
                axios
                .get(getApiUrl(`/backend/wp-json/events/v2/similar-events/?id=${id}`))
                .then((response) => {
                  setNearEvents(response.data.items);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
                axios
                .get(getApiUrl("/backend/wp-json/events/v2/near-events/"))
                .then((response) => {
                  setNearEvents(response.data.items);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
        } else {
          setNearEvents(events);
        }
      }, [similar, id]);

    return (
        <div className={css`
            padding: 120px 0;

            @media(max-width: 575px) {
                padding: 64px 0;
            }
        `}>
            <Container>
                {!onPage && 
                <div className={css`
                    text-align: center;
                    font-family: Impact;
                    margin-bottom: 96px;
                    font-size: 56px;
                    line-height: 1.15;

                    @media(max-width: 575px) {
                        font-size: 32px;
                        margin-bottom: 48px;
                    }
                `}>{similar ? 'Похожие мероприятия' : 'Ближайшие события'}</div> 
                }
                <div className={css`
                    margin-bottom: 32px;
                `}>
                    {nearEvents && nearEvents.slice(0, limit).map((item, index) => (
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            key={index} 
                            className={css`
                                padding-bottom: 32px;
                                margin-bottom: 32px;
                                border-bottom: 1px solid #C5D7FF;
                                display: flex;
                                gap: 32px;

                                @media(max-width: 1199px) {
                                    flex-wrap: wrap;
                                    justify-content: space-between;
                                }
                                @media(max-width: 575px) {
                                    gap: 20px;
                                }

                                &:last-of-type {
                                    padding-bottom: 0;
                                    margin-bottom: 0;
                                    border-bottom: none;
                                }
                            `}
                        >
                            <div className={css`
                                flex: 0 1 220px;
                                max-width: 220px;
                                display: flex;
                                flex-direction: column;
                                gap: 4px;

                                @media(max-width: 1199px) {
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                }
                                @media(max-width: 767px) {
                                    order: 1;
                                    flex: 0 1 calc(100% - 80px);
                                    max-width: calc(100% - 80px);
                                }
                            `}>
                                <div className={css`
                                    font-size: 28px;
                                    font-family: Impact;
                                    color: ${theme.colors.purple};
                                    line-height: 1.2;

                                    @media(max-width: 575px) {
                                        font-size: 24px;
                                    }
                                `}>
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

									{/* <br/>было<br/> */}
									{/* {formatDate(item.date_start)} -<br/> {formatDate(item.date_end)} */}
								</div>
                                <div className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: #47474D;
                                `}>{item.online ? 'Онлайн-событие' : item.city}</div>
                            </div>
                            <Link href={`/event/${item.slug}`} className={css`
                                flex: 0 1 300px;
                                max-width: 300px;
                                border-radius: 16px;
                                overflow: hidden;

                                @media(max-width: 767px) {
                                    flex: 0 1 100%;
                                    max-width: 100%;
                                    height: 250px;
                                }

                                img {
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                    object-position: top;
                                }
                            `}>
                                <img src={item.cover} alt="" />
                            </Link>
                            <div className={css`
                                flex: 1;
                                display: flex;
                                flex-direction: column;
                                gap: 16px;
                            `}>
                                <div className={css`
                                    font-size: 14px;
                                    font-weight: 500;
                                    line-height: 1.16;
                                    border-radius: 8px;
                                    background-color: ${theme.colors.green};
                                    padding: 3px 8px 5px;
                                    width: max-content;
                                `}>
                                    {item.format.map((format, index) => (
                                        <Link key={index} href={`/events/format_${format.slug}`}>{format.name}</Link>
                                    ))}
                                    </div>
                                <div className={css`
                                    display: flex;
                                    gap: 16px;
                                    flex-wrap: wrap;

                                    @media(max-width: 575px) {
                                        flex-wrap: nowrap;
                                        overflow-x: auto;
                                        overflow-y: hidden;
                                        max-width: calc(100vw - 30px);
                                    }
                                    
                                    a {
                                        color: ${theme.colors.purple};
                                        font-size: 14px;
                                        line-height: 1.16;
                                        position: relative;

                                        @media(max-width: 575px) {
                                            min-width: max-content;
                                        }
                                        
                                        &::before {
                                            content: '';
                                            transition: ${theme.transition};
                                            opacity: 0;
                                            width: 100%;
                                            position: absolute;
                                            bottom: -4px;
                                            height: 1px;
                                            background-color: ${theme.colors.purple};
                                        }

                                        &:hover::before {
                                            opacity: .4;
                                        }
                                    }
                                `}>
                                    {item.subject.map((direction, index) => (
                                        <Link key={index} href={`/events/direction_${direction.slug}`}>{direction.name}</Link>
                                    ))}
                                </div>
                                <Link href={`/event/${item.slug}`} className={css`
                                    font-size: 18px;
                                    font-weight: 500;
                                    line-height: 1.36;    
                                `} dangerouslySetInnerHTML={{ __html: item.title }} />
                                
                                <div className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
									display: -webkit-box;
									-webkit-line-clamp: 3;
									-webkit-box-orient: vertical;
									overflow: hidden;
									text-overflow: ellipsis;

                                    @media(max-width: 575px) {
                                        display: none;
                                    }
                                `}>
                                    {item.short_text}
                                </div>
                            </div>
                            <DoubleLinkArrow href={`/event/${item.slug}`}>
								<div>
									<LinkArrow />
									<LinkArrow />
								</div>
                            </DoubleLinkArrow>
                        </motion.div>
                    ))}
                </div>

                {!similar &&
                nearEvents && limit < nearEvents.length && (
                    <div className={css`
                        margin: 0 auto;
                        padding: 14px 32px;
                        border-radius: 28px;
                        border: 2px solid ${theme.colors.purple};
                        background-color: #fff;
                        width: max-content;
                        color: ${theme.colors.purple};
                        line-height: 1.28;
                        cursor: pointer;
                        transition: ${theme.transition};  
                        
                        &:hover {
                            background-color: ${theme.colors.purple};
                            color: #fff;
                        }
                    `} onClick={()=>setLimit(prev => prev+5)}>Показать еще +</div>
                )
                }
            </Container>
        </div>
    )
};