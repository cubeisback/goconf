import { css } from "@emotion/css";
import { container } from "../pages/ui";
import { useTheme } from "@emotion/react";
import img_ex_1 from '../images/events_1.jpg';
import { ReactComponent as LinkArrow } from '../images/svg/link_arrow.svg';
import { NavLink } from "react-router";
import { useState } from "react";
import { motion } from 'framer-motion';

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

export const MainEvents = ({onPage, similar}) => {
    const theme = useTheme();

    const [limit, setLimit] = useState(3);

    return (
        <div className={css`
            padding: 120px 0;
        `}>
            <div className={container}>
                {!onPage && 
                <div className={css`
                    text-align: center;
                    font-family: Impact;
                    margin-bottom: 96px;
                    font-size: 56px;
                    line-height: 1.15;
                `}>{similar ? 'Похожие мероприятия' : 'Ближайшие события'}</div> 
                }
                <div className={css`
                    margin-bottom: 32px;
                `}>
                    {eventsArray.slice(0, limit).map((item, index) => (
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
                            `}>
                                <div className={css`
                                    font-size: 28px;
                                    font-family: Impact;
                                    color: ${theme.colors.purple};
                                    line-height: 1.2;
                                `}>{item.date}</div>
                                <div className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: #47474D;
                                `}>{item.place}</div>
                            </div>
                            <NavLink to="/events/test" className={css`
                                flex: 0 1 300px;
                                max-width: 300px;
                                border-radius: 16px;
                                overflow: hidden;

                                img {
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                }
                            `}>
                                <img src={img_ex_1} alt="" />
                            </NavLink>
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
                                `}>{item.tag}</div>
                                <div className={css`
                                    display: flex;
                                    gap: 16px;
                                    
                                    p {
                                        color: ${theme.colors.purple};
                                        font-size: 14px;
                                        line-height: 1.16;
                                    }
                                `}>
                                    <p>Управление персоналом</p>
                                    <p>Менеджмент</p>
                                    <p>HR-процессы</p>
                                </div>
                                <NavLink to="/events/test" className={css`
                                    font-size: 18px;
                                    font-weight: 500;
                                    line-height: 1.36;    
                                `}>{item.title}</NavLink>
                                <div className={css`
                                    font-size: 14px;
                                    line-height: 1.16;    
                                `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</div>
                            </div>
                            <NavLink to="/events/test" className={css`
                                flex: 0 1 56px;
                                max-width: 56px;
                            `}>
                                <LinkArrow />
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                {!similar &&
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
                    `} onClick={()=>setLimit(prev => prev+3)}>Показать еще +</div>
                }
            </div>
        </div>
    )
};