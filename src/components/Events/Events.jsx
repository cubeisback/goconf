import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from '../../pages/main.module.css';
import { useRef } from 'react';
import { ReactComponent as SliderArrow } from '../../images/svg/slider_arrow.svg';
import { ReactComponent as LinkArrow } from '../../images/svg/link_arrow.svg';
import img_ex_1 from '../../images/events_1.jpg';

export const Events = () => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <>
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
            </>
    );
}