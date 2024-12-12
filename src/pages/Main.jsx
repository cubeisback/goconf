import { Header } from "../components/header/Header"
import styles from './main.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

export const Main = () => {

    return (
        <>
            <Header />
            <div className={styles.container}>
                
                <div className={styles.promo}>
                    <div className={styles.promo_title}>Афиша бизнес-событий GoConf</div>
                    <div className={styles.promo_subtitle}>Делаем поиск профессиональных событий удобным, а&nbsp;привлечение участников эффективным</div>
                </div>

                <div className={styles.filter}>

                </div>

                <div className={styles.slider}>
                    <div>Интересные события</div>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </>
    );
}
