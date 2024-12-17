import { Header } from "../components/header/Header"
import styles from './main.module.css'
import { ReactComponent as Arrow } from '../images/svg/slider_arrow.svg';
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
            <Header />
            <div className={styles.container}>
                
                <div className={styles.promo}>
                    <div className={styles.promo_title}>Афиша бизнес-событий GoConf</div>
                    <div className={styles.promo_subtitle}>Делаем поиск профессиональных событий удобным, а&nbsp;привлечение участников эффективным</div>
                </div>

                <div className={styles.filter}>
                    <div onClick={()=>setShowP(true)}>123</div>
                <motion.div
        initial={{ pointerEvents: 'none', bottom: -20, opacity: 0 }}      // Исходное состояние: элемент скрыт
        animate={{ opacity: showp ? 1 : 0, bottom: showp ? 0 : -20, pointerEvents: showp ? 'all' : 'none' }}  // Плавно появляется или скрывается в зависимости от show
        // exit={{ opacity: 0, bottom: -20 }}         // При выходе, элемент исчезает
        transition={{ duration: 0.2 }}  // Длительность анимации
        style={{position: "relative", zIndex: 10}}
        ref={datePickerRef}
      >
       <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
      </motion.div>
                
                </div>

                <div className={styles.slider}>
                    <div>Интересные события</div>
                    <div ref={navigationPrevRef} className={styles.slider_btn_prev}>
                        <Arrow />
                    </div>
                    <div ref={navigationNextRef} className={styles.slider_btn_next} style={{transform: 'rotate(180deg)'}}>
                        <Arrow />
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
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </>
    );
}
