"use client"

import { Breadcrumbs, Button, Container, EventPage, EventPageArticle, EventPageBlock, EventPageBlockInfo, EventPageBlockInfoBlock, EventPageBlockInfoIsYour, EventPageBlockInfoItem, EventPageBlockInfoItemPurple, EventPageBlockMain, EventPageBlockMainImage, EventPagePastBadge, PagePromo, PageTitle, pageTitle, PromoThemes } from "@/styles/ui";
import SliderArrow from "@/public/images/svg/slider_arrow.svg";
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { MainEventsSlider } from '@/components/MainEventsSlider';
// import { Form } from '@/components/Form';
import { MainEvents } from '@/components/MainEvents';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import { detectVideoType, formatDate, formatPrice, getApiUrl, VideoPlayer } from '@/functions/functions';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthReady } from "@/hooks/useAuthReady";
import { ModalEvent } from "./Modal";
import { Modal } from "@/components/ui/Modal";
import TimepadWidget from "@/components/TimepadWidget/TimepadWidget";
import Image from "next/image";

export default function EventClient({ initialData, initialInterestingEvents, initialSimilarEvents }) {
	const [pageInfo, setPageInfo] = useState(initialData);
	const [isLoading, setIsLoading] = useState(!initialData);
	const [showNotFound, setShowNotFound] = useState(false);

	const theme = useTheme();

	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	const { ready, token } = useAuthReady();

	const { slug } = useParams();

	useEffect(() => {
		if (pageInfo) {
			console.log('Event page response:', pageInfo);
		}
	}, [pageInfo]);
	
	// Дозагружаем данные если initialData не было
  useEffect(() => {
    if (!initialData && slug) {
      setIsLoading(true);
      axios
        .get(getApiUrl(`/backend/wp-json/events/v2/single/?slug=${slug}`))
        .then((response) => {
		  console.log('Event page response:', response.data);
          setPageInfo(response.data);
          setShowNotFound(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
          setShowNotFound(true);
          setIsLoading(false);
        });
    }
  }, [initialData, slug]);

  // Если загрузка
  if (isLoading) {
    return (
      <Container>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          Загрузка...
        </div>
      </Container>
    );
  }

  // Если не найдено
  if (showNotFound || !pageInfo) {
    // Используем notFound из next/navigation
    const { notFound } = require('next/navigation');
    notFound();
    return null;
  }

	 const handleClickConversion = async (e) => {
		try {
			await axios.post(
				getApiUrl(`/backend/wp-json/events/v2/increment-click/`),
				{
					event_id: pageInfo.data.ID
				},
				{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				}
			);
		
			if(pageInfo.fields.events_link) {
				window.open(pageInfo.fields.events_link, '_blank');
			}
			
		
		} catch (error) {
			console.error('Error tracking click:', error);
			if(pageInfo.fields.events_link) {
				window.open(pageInfo.fields.events_link, '_blank');
			}
		} finally {
		// setIsLoading(false);
		}
	};



	const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  const [videoPreview, setVideoPreview] = useState(null);
	useEffect(() => {
		if (pageInfo?.fields?.group_video?.cod) {
		const videoData = detectVideoType(pageInfo.fields.group_video.cod);
		setVideoPreview(videoData);
		} else {
		setVideoPreview(null);
		}
	}, [pageInfo?.fields?.group_video?.cod]);

	return (
		<>
			<PagePromo>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<Link href="/events">Мероприятия</Link>
						<p>{pageInfo && pageInfo.data.post_title}</p>
					</Breadcrumbs>
					{pageInfo && <PageTitle>{pageInfo.data.post_title}</PageTitle> }
					<PromoThemes>
						<p>Направления:</p>
						{pageInfo && pageInfo.subjects.map(theme => (
							<Link key={theme.term_id} href={`/events/direction_${theme.slug}`}>{theme.name}</Link>
						))}
					</PromoThemes>
				</Container>
			</PagePromo>

			<EventPage>
				<Container>
					{pageInfo &&
					<EventPageBlock>
						<EventPageBlockMain>
							<EventPageBlockMainImage>
								{pageInfo.fields.anons?.url ? (
								<Image 
									src={pageInfo.fields.anons.url}
									alt={pageInfo.data.post_title || ''}
									width={928}
									height={342}
									layout="responsive"
								/>
								) : null}
								{pageInfo.fields?.past && (
									<EventPagePastBadge>Прошедшее событие</EventPagePastBadge>
								)}
							</EventPageBlockMainImage>

							<EventPageArticle dangerouslySetInnerHTML={{ __html: pageInfo.data.post_content }} />

							{pageInfo?.tariff.value === 'advanced' && (
							
							<>
							{pageInfo?.fields?.group_gallery?.gallery &&
							<div style={{paddingTop: 32}}>
								<div className={css`
									display: flex;
									gap: 16px;
									justify-content: space-between;
									align-items: center;
									margin-bottom: 24px;
								`}>
									<div className={pageTitle}>{pageInfo.fields.group_gallery.title}</div>
									<div className={css`
										display: flex;
										gap: 16px;

										& > div {
											display: flex;
											cursor: pointer;

											&.swiper-button-disabled {
												filter: grayscale(1);
												cursor: default;
											}
										}

										svg {
											@media(max-width: 575px) {
												width: 48px;
												height: 48px;
											}
										}
									`}>
										<div ref={navigationPrevRef}>
											<SliderArrow style={{width: 56}} />
										</div>
										<div ref={navigationNextRef}style={{transform: 'rotate(180deg)'}}>
											<SliderArrow style={{width: 56}} />
										</div>
									</div>
								</div>
								<Swiper 
									modules={[Navigation]} 
									navigation={{
										prevEl: navigationPrevRef.current,
										nextEl: navigationNextRef.current,
									}}
									loop={pageInfo.fields.group_gallery.gallery.length > 1}
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
											loop: pageInfo.fields.group_gallery.gallery.length > 2
										},
										1024: {
											slidesPerView: 3,
											loop: pageInfo.fields.group_gallery.gallery.length > 3
										},
									}}
								>
									{pageInfo.fields.group_gallery.gallery.map((item, index) => (
						
									<SwiperSlide className={css`
										border-radius: 24px;
										background-color: #fff;
										overflow: hidden;
										height: auto;
										max-height: 168px;
									`} key={index}
									onClick={() => {
										setActiveIndex(index);
										setIsFullscreen(true);
									}}
									>
										{item.url ? (
										<img src={item.url} alt="" style={{objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer', transition: '.3s ease-in-out'}} className={css`
											
											&:hover {
												transform: scale(1.05);
											}`} />
										) : null}
									</SwiperSlide>

									))}
								</Swiper>


								{/* --- Фуллскрин модалка --- */}
      {isFullscreen && (
        <div
          className="fullscreen-overlay"
        //   onClick={() => setIsFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            initialSlide={activeIndex}
            style={{ width: "90%", height: "90%" }}
            // onClick={(e) => e.stopPropagation()} // чтобы не закрывалось при клике по изображению
          >
            {pageInfo.fields.group_gallery.gallery.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {(item.big || item.url) ? (
                  <img
                    src={item.big || item.url}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кнопка закрытия */}
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              background: "transparent",
              color: "#fff",
              fontSize: "2rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}
							</div>
							}

							{pageInfo?.fields?.group_video?.cod &&
								<div className={css`
									padding-top: 32px;
								`}>
									<div className={pageTitle}>{pageInfo.fields.group_video.title}</div>
									<div>
										<VideoPlayer videoData={videoPreview} />
									</div>
								</div>
							}
							</>

							)}

						</EventPageBlockMain>
						<EventPageBlockInfo>
							<EventPageBlockInfoBlock>
							<EventPageBlockInfoItem>
								<span>Дата проведения</span>
								<p>
									{
									(() => {
										const [d1, m1, y1] = pageInfo.fields.events_start.split('.');
										const [d2, m2, y2] = pageInfo.fields.events_end.split('.');

										if (pageInfo.fields.events_start === pageInfo.fields.events_end) {
										return formatDate(pageInfo.fields.events_start);
										} else if (m1 === m2 && y1 === y2) {
										const formatted = formatDate(pageInfo.fields.events_start);
										const [, monthAndYear] = formatted.split(' ', 2);
										const rest = formatted.slice(formatted.indexOf(' ') + 1);
										return `${d1}–${d2} ${rest}`;
										} else {
										return (
											<>
											{formatDate(pageInfo.fields.events_start)} -<br />
											{formatDate(pageInfo.fields.events_end)}
											</>
										);
										}
									})()
									}
									{pageInfo.fields.events_time_start && `, ${pageInfo.fields.events_time_start}` }
								</p>
							</EventPageBlockInfoItem>
							{pageInfo.cities[0] && 
							<EventPageBlockInfoItem>
								<span>Место проведения</span>
								<p>{pageInfo.cities[0] && pageInfo.cities[0].name}</p>
							</EventPageBlockInfoItem>
							}
							{pageInfo.fields.online || pageInfo.fields.address ?
							<EventPageBlockInfoItem>
								<span>Адрес</span>
								<p>{pageInfo.fields.online ? 'Онлайн-событие' : pageInfo.fields.address}</p>
							</EventPageBlockInfoItem>
							: null
							}
							
							<EventPageBlockInfoItem>
								<span>Стоимость</span>
								<EventPageBlockInfoItemPurple>
									{pageInfo.fields.free
										? 'Бесплатно'
										: `${pageInfo.fields.cost_from ? 'от ' : ''}${formatPrice(pageInfo.fields.events_cost)} руб.`}
								</EventPageBlockInfoItemPurple>
							</EventPageBlockInfoItem>
							{pageInfo.formats && 
							<EventPageBlockInfoItem>
								<span>Формат</span>

								{pageInfo.formats.map(format => (
									<Link href={`/events/format_${format.slug}`} key={format.name}>{format.name}</Link>
								))}
							</EventPageBlockInfoItem>
							}
							{pageInfo.company[0] && 
							<EventPageBlockInfoItem>
								<span>Организатор</span>
								<Link href={`/organizer/${pageInfo.company[0] && pageInfo.company[0].slug}`}>{pageInfo.company[0] && pageInfo.company[0].name}</Link>
							</EventPageBlockInfoItem>
							}
							</EventPageBlockInfoBlock>
							
							{!pageInfo.fields.events_owner &&
								<EventPageBlockInfoIsYour onClick={()=>{setIsModalOpen(true)}}>Это ваше мероприятие?</EventPageBlockInfoIsYour> 
							}
							{pageInfo.fields.events_link && !pageInfo.fields.events_timepad && 
								<Button green="true" style={{width: '100%', marginTop: !pageInfo.fields.events_owner && 14}}>
									<a href={pageInfo.fields.events_link} target="_blank" rel="noopener noreferrer" onClick={handleClickConversion}>
										<p>
											<span>На сайт мероприятия</span>
											<span>На сайт мероприятия</span>
										</p>
									</a>
								</Button>
							}
							{pageInfo.fields.events_timepad &&
								<TimepadWidget 
									eventId={pageInfo.fields.events_timepad} 
									handleClickConversion={handleClickConversion}
								/>
							}
							
						</EventPageBlockInfo>
					</EventPageBlock>
					}
				</Container>
			</EventPage>
			
			<div className={css`
				position: relative;
				// overflow-x: hidden;

				&::before {
					content: '';
					position: absolute;
					left: -100vw;
					bottom: -120px;
					width: 200vw;
					height: 600px;
					background-color: ${theme.colors.purple};
					z-index: -1;

					@media(max-width: 1339px) {
						content: none;
					}
				}
			`}>
				<Container $fullWidth>
					<MainEventsSlider initialData={initialInterestingEvents || null} />
				</Container>
			</div>

			<MainEvents id={pageInfo && pageInfo.data.ID} similar={true} events={initialSimilarEvents || undefined} />
			{/* <Form /> */}

			<ModalEvent isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onReg={()=>setIsModalOpen2(true)} eventName={pageInfo && pageInfo.data.post_title} eventId={pageInfo && pageInfo.data.ID} />
			<Modal isOpen={isModalOpen2} onClose={()=>setIsModalOpen2(false)} />
		</>
	);
}