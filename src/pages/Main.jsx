import styles from './main.module.css'
import { ReactComponent as SliderArrow } from '../images/svg/slider_arrow.svg';
import { ReactComponent as LinkArrow } from '../images/svg/link_arrow.svg';
import { ReactComponent as FormSvg } from '../images/svg/form.svg';
import img_ex_1 from '../images/events_1.jpg';
import formats_ex_1 from '../images/formats_1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';


export const Main = () => {
    const [startDate, setStartDate] = useState();
    const [showp, setShowP] = useState(false);
    const datePickerRef = useRef(null);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

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
        
            {/* <Header /> */}
            <div className={styles.container}>
                
                <div className={styles.promo}>
                    <div className={styles.promo_title}>Афиша бизнес-событий <span>Go</span><span>Conf</span></div>
                    <div className={styles.promo_subtitle}>Делаем поиск профессиональных событий удобным, а&nbsp;привлечение участников эффективным</div>
                </div>

                <div className={styles.filter}>
                    <div onClick={()=>setShowP(true)}>1</div>
                    <motion.div
                        initial={{ pointerEvents: 'none', bottom: -20, opacity: 0 }}
                        animate={{ opacity: showp ? 1 : 0, bottom: showp ? 0 : -20, pointerEvents: showp ? 'all' : 'none' }}
                        transition={{ duration: 0.2 }}
                        style={{position: "relative", zIndex: 10}}
                        ref={datePickerRef}
                    >
                        <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); console.log(date)}} inline />
                    </motion.div>
                </div>

                <div className={styles.slider}>
                    <div className={styles.slider_top}>
                        <div className={styles.slider_top_title}>Интересные события</div>
                        <div className={styles.slider_top_nav}>
                            <div ref={navigationPrevRef} className={styles.slider_btn_prev}>
                                <SliderArrow />
                            </div>
                            <div ref={navigationNextRef} className={styles.slider_btn_next} style={{transform: 'rotate(180deg)'}}>
                                <SliderArrow />
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.slider_main}>
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
                        <SwiperSlide className={styles.slider_item}>
                            <div className={styles.slider_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.slider_text}>
                                <div className={styles.slider_item_tag}>Конференция</div>
                                <div className={styles.slider_item_title}>Налоговая и&nbsp;юридическая безопасность селлера на&nbsp;маркетплейсах</div>
                                <div className={styles.slider_item_info}>
                                    <div className={styles.slider_item_info_left}>
                                        <div className={styles.slider_item_info_left_date}>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</div>
                                        <div className={styles.slider_item_info_left_city}>Россия, Екатеринбург</div>
                                    </div>
                                    <div className={styles.slider_item_info_right}>
                                        <LinkArrow />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.slider_item}>
                            <div className={styles.slider_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.slider_text}>
                                <div className={styles.slider_item_tag}>Конференция</div>
                                <div className={styles.slider_item_title}>Налоговая и&nbsp;юридическая безопасность селлера на&nbsp;маркетплейсах</div>
                                <div className={styles.slider_item_info}>
                                    <div className={styles.slider_item_info_left}>
                                        <div className={styles.slider_item_info_left_date}>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</div>
                                        <div className={styles.slider_item_info_left_city}>Россия, Екатеринбург</div>
                                    </div>
                                    <div className={styles.slider_item_info_right}>
                                        <LinkArrow />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.slider_item}>
                            <div className={styles.slider_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.slider_text}>
                                <div className={styles.slider_item_tag}>Конференция</div>
                                <div className={styles.slider_item_title}>Налоговая и&nbsp;юридическая безопасность селлера на&nbsp;маркетплейсах</div>
                                <div className={styles.slider_item_info}>
                                    <div className={styles.slider_item_info_left}>
                                        <div className={styles.slider_item_info_left_date}>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</div>
                                        <div className={styles.slider_item_info_left_city}>Россия, Екатеринбург</div>
                                    </div>
                                    <div className={styles.slider_item_info_right}>
                                        <LinkArrow />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.slider_item}>
                            <div className={styles.slider_item_img}>
                                <img src={img_ex_1} alt="" />
                            </div>
                            <div className={styles.slider_text}>
                                <div className={styles.slider_item_tag}>Конференция</div>
                                <div className={styles.slider_item_title}>Налоговая и&nbsp;юридическая безопасность селлера на&nbsp;маркетплейсах</div>
                                <div className={styles.slider_item_info}>
                                    <div className={styles.slider_item_info_left}>
                                        <div className={styles.slider_item_info_left_date}>26&nbsp;июля 2024&nbsp;-<br/> 09&nbsp;мая 2025</div>
                                        <div className={styles.slider_item_info_left_city}>Россия, Екатеринбург</div>
                                    </div>
                                    <div className={styles.slider_item_info_right}>
                                        <LinkArrow />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    </div>
                </div>

            </div>

            <div className={styles.b2}>
                <div className={styles.container}>
                    <div className={styles.b2_title}>Популярные форматы <span>GoCONF</span></div>
                    <div className={styles.b2_subtitle}>Самые интересные бизнес-мероприятия различных форматов от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</div>
                </div>
                <Swiper 
                    loop
                    slidesPerView='auto'
                    spaceBetween={24}
                    className={styles.b2_slider}
                >
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.b2_slider_item}>
                        <img src={formats_ex_1} alt="" />
                        <div className={styles.b2_slider_item_text}>
                            <div className={styles.b2_slider_item_text_t1}>Бизнес-семинары</div>
                            <div className={styles.b2_slider_item_text_t2}>125 событий</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className={styles.b3}>
                <div className={styles.container}>
                    <div className={styles.b3_title}>Ближайшие события</div>
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
                <div className={styles.container}>
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
