import styles from './main.module.css';
import { ReactComponent as LinkArrow } from '../images/svg/link_arrow.svg';
import { ReactComponent as FormSvg } from '../images/svg/form.svg';
import img_ex_1 from '../images/events_1.jpg';
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';
import { container } from './ui';
import { NavLink } from 'react-router';

export const Events = () => {
    const [startDate, setStartDate] = useState();
    const [showp, setShowP] = useState(false);
    const datePickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
            setShowP(false); // Закрываем DatePicker
          }
        };
    
        // Добавляем обработчик события для кликов по документу
        document.addEventListener("mousedown", handleClickOutside);
    
        // Убираем обработчик при размонтировании компонента
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <>
            <div className={styles.promo_page}>
                <div className={container}>
                    <div className={styles.breadcrumbs}>
                        <a href="/">Главная</a>
                        <p>Мероприятия</p>
                    </div>
                    <h1>Мероприятия</h1>
                    <div className={styles.promo_page_search}>Поиск по мероприятиям</div>
                </div>
            </div>

            <div className={styles.events_filter}>
                <div className={container}>
                    <div className={styles.filter}>
                        <div>Тематика</div>
                        <div>Город</div>
                        <div>Формат</div>
                        <div onClick={()=>setShowP(true)}>Начало
                            <motion.div
                                initial={{ pointerEvents: 'none', bottom: -36, opacity: 0 }}
                                animate={{ opacity: showp ? 1 : 0, bottom: showp ? -18 : -36, pointerEvents: showp ? 'all' : 'none' }}
                                transition={{ duration: 0.2 }}
                                style={{position: "relative", zIndex: 10}}
                                ref={datePickerRef}
                            >
                                <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); console.log(date)}} inline />
                            </motion.div>
                        </div>
                        <div>Окончание</div>
                        <div>Найти</div>
                    </div>
                    <div className={styles.sort}>
                        <div>Конференции по&nbsp;маркетингу</div>
                        <div>Бизнес-семинары</div>
                        <div>Конференции в Москве</div>
                        <div>Выставки в Санкт-Петербурге</div>
                        <div>Конференции в Москве</div>
                    </div>
                </div>
            </div>

            <div className={styles.b3}>
                <div className={container}>
                    <div className={styles.b3_block}>
                        <div className={styles.b3_block_item}>
                            <div className={styles.b3_block_item_date}>
                                <div className={styles.b3_block_item_date_1}>26&nbsp;июля 2024&nbsp;- 09&nbsp;мая 2025</div>
                                <div className={styles.b3_block_item_date_2}>Россия, Екатеринбург</div>
                            </div>
                            <div className={styles.b3_block_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.b3_block_item_info}>
                                <div className={styles.b3_block_item_info_1}>Конференция</div>
                                <div className={styles.b3_block_item_info_2}>
                                    <p>Управление персоналом</p>
                                    <p>Менеджмент</p>
                                    <p>HR-процессы</p>
                                </div>
                                <div className={styles.b3_block_item_info_3}>Национальный рекламный форум</div>
                                <div className={styles.b3_block_item_info_4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</div>
                            </div>
                            <div className={styles.b3_block_item_link}>
                                <NavLink to='/events/test' >
                                    <LinkArrow />
                                </NavLink>
                            </div>
                        </div>
                        <div className={styles.b3_block_item}>
                            <div className={styles.b3_block_item_date}>
                                <div className={styles.b3_block_item_date_1}>26&nbsp;июля 2024&nbsp;- 09&nbsp;мая 2025</div>
                                <div className={styles.b3_block_item_date_2}>Россия, Екатеринбург</div>
                            </div>
                            <div className={styles.b3_block_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.b3_block_item_info}>
                                <div className={styles.b3_block_item_info_1}>Конференция</div>
                                <div className={styles.b3_block_item_info_2}>
                                    <p>Управление персоналом</p>
                                    <p>Менеджмент</p>
                                    <p>HR-процессы</p>
                                </div>
                                <div className={styles.b3_block_item_info_3}>Национальный рекламный форум</div>
                                <div className={styles.b3_block_item_info_4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</div>
                            </div>
                            <div className={styles.b3_block_item_link}>
                                <LinkArrow />
                            </div>
                        </div>
                        <div className={styles.b3_block_item}>
                            <div className={styles.b3_block_item_date}>
                                <div className={styles.b3_block_item_date_1}>26&nbsp;июля 2024&nbsp;- 09&nbsp;мая 2025</div>
                                <div className={styles.b3_block_item_date_2}>Россия, Екатеринбург</div>
                            </div>
                            <div className={styles.b3_block_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.b3_block_item_info}>
                                <div className={styles.b3_block_item_info_1}>Конференция</div>
                                <div className={styles.b3_block_item_info_2}>
                                    <p>Управление персоналом</p>
                                    <p>Менеджмент</p>
                                    <p>HR-процессы</p>
                                </div>
                                <div className={styles.b3_block_item_info_3}>Национальный рекламный форум</div>
                                <div className={styles.b3_block_item_info_4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</div>
                            </div>
                            <div className={styles.b3_block_item_link}>
                                <LinkArrow />
                            </div>
                        </div>
                    </div>
                    <div className={styles.b3_btn}>Показать еще +</div>
                </div>
            </div>
            
            <div className={styles.b4}>
                <div className={container}>
                    <div className={styles.form}>
                        <div className={styles.form_main}>
                            <div className={styles.form_title}>Дайджест событий<br/> в&nbsp;вашей почте</div>
                            <div className={styles.form_subtitle}>Раз в&nbsp;месяц присылаем подборку мероприятий по&nbsp;выбранной тематике в&nbsp;вашем городе. Никакого спама.</div>
                            <form action="">
                                <input type="text" placeholder="Ваш E-mail" />
                                <div>Тематика</div>
                                <div>Город</div>
                                <div>Подписаться</div>
                            </form>
                            <div className={styles.form_agree}>Нажимая &laquo;Подписаться&raquo;, вы&nbsp;соглашаетесь получать материалы компании GoConf на&nbsp;свой электронный адрес и&nbsp;даете согласие на&nbsp;обработку персональных данных</div>
                        </div>
                        <FormSvg />
                    </div>
                </div>
            </div>
        </>
    );
}