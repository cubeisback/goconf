"use client"

import { Breadcrumbs, breadcrumbs, Button, Container, pagePromo, pageTitle } from "@/styles/ui";
import SliderArrow from "@/public/images/svg/slider_arrow.svg";
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Helper } from '@/components/ui/Helper';
import { useEffect, useRef, useState } from 'react';
import { MainEventsSlider } from '@/components/MainEventsSlider';
import { Form } from '@/components/Form';
import { MainEvents } from '@/components/MainEvents';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import { decodeHtmlEntities, formatDate, formatPrice, getApiUrl } from '@/functions/functions';
// import { DocumentDescription, DocumentTitle } from '@/functions/DocumentMeta';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthReady } from "@/hooks/useAuthReady";
import { ModalEvent } from "./Modal";
import { Modal } from "@/components/ui/Modal";

export default function EventClient({ params }) {

	const theme = useTheme();

	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	// const [seoTitle, setSeoTitle] = useState(null)
	// const [seoDescription, setSeoDescription] = useState(null)

	// const [event, setEvent] = useState(null);
	// const location = useLocation();
	// const [pageInfo, setPageInfo] = useState(null)
	// useEffect(() => {
	//     const pathParts = location.pathname.split('/');
	//     const eventId = pathParts[pathParts.length - 1];

	//     axios
	//     .get(`https://dev.goconf.ru/wp-json/events/v2/single/?slug=${eventId}`)
	//     .then((response) => {
	//         setPageInfo(response.data)
	// 		setSeoTitle(response.data.seo.title)
	// 		setSeoDescription(response.data.seo.description)
	//         console.log('page ', response.data)
	//     })
	//     .catch((error) => {
	//         console.log(error)
	//     });
	// }, [location.pathname]);

	const { ready, token } = useAuthReady();

	const { slug } = useParams(); // получаем параметр пути
	const [pageInfo, setPageInfo] = useState(null);
	useEffect(() => {
		if (!slug) return;
	
		axios
		  .get(getApiUrl(`/backend/wp-json/events/v2/single/?slug=${slug}`))
		  .then((response) => {
			setPageInfo(response.data);
			// Здесь тоже можно вызывать функции для SEO если нужно
			console.log('page ', response.data);
		  })
		  .catch((error) => {
			console.log(error);

			if(token) {
				axios
				.get(getApiUrl(`/backend/wp-json/events/v2/single/?slug=${slug}`),
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					setPageInfo(res.data);
					console.log('preview ', res);
				})
			}
		  });
	}, [slug]);

	

	// const [similarItems, setSimilarItems] = useState(null)
	// useEffect(() => {
	//   axios
	//     .get(`https://dev.goconf.ru/wp-json/events/v2/similar-events/?id={${ID}}`)
	//     .then((response) => {
	//         setSimilarItems(response.data)
	//       console.log('interesting-events ', response.data)
	//     })
	//     .catch((error) => {
	//         console.log(error)
	//     });

	// }, [])
	

	const promoThemes = css`
		display: flex;
		gap: 16px;
		font-size: 14px;
		line-height: 1.16;
		flex-wrap: wrap;

		@media(max-width: 575px) {
			gap: 8px 16px;
		}

		& > p {
			color: #47474D;
		}
		& > a {
			color: ${theme.colors.purple};

			&:hover {
				text-decoration: underline;
			}
		}
	`;

	const text = css`
		display: flex;
		flex-direction: column;
		// gap: 24px;
		gap: 16px;

		& > p {
			line-height: 1.28;
		}
		& > div {
			font-size: 18px;
			font-weight: 500;
			line-height: 1.36;
		}
		& > h1 {
			font-size: 28px;
			font-family: Impact;
			line-height: 1.34;
			font-weight: normal;
		}
		& > h2 {
			font-size: 24px;
			line-height: 1.34;
		}
		& > h3 {
			font-size: 20px;
			font-weight: 500;
			line-height: 1.4;
		}
		& > h4 {
			font-size: 18px;
			font-weight: 500;
			line-height: 1.36;
		}
		& > ul {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		& > ol {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	`;


	const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

	return (
		<>
		{/* <DocumentTitle value={decodeHtmlEntities(seoTitle)} /> */}
		{/* <DocumentDescription value={decodeHtmlEntities(seoDescription)} /> */}
			<div className={pagePromo}>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<Link href="/events">Мероприятия</Link>
						<p>{pageInfo && pageInfo.data.post_title}</p>
					</Breadcrumbs>
					{pageInfo && <h1 className={pageTitle}>{pageInfo.data.post_title}</h1> }
					<div className={promoThemes}>
						<p>Направления:</p>
						{pageInfo && pageInfo.subjects.map(theme => (
							<Link key={theme.term_id} href={`/events/direction_${theme.slug}`}>{theme.name}</Link>
						))}
					</div>
				</Container>
			</div>

			<div className={css`
				padding: 32px 0 120px;

				@media(max-width: 575px) {
					padding-bottom: 64px;
				}
			`}>
				<Container>
					{pageInfo &&
					<div className={css`
						display: flex;
						gap: 32px;

						@media(max-width: 991px) {
							flex-direction: column;
						}
					`}>
						<motion.div 
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }} 
						transition={{ duration: .3 }}
						className={css`
							flex: 1;
							max-width: 952px;
						`}>
							<div className={css`height: 400px;overflow: hidden;margin-bottom: 40px; @media(max-width: 575px) {height: 160px;}`}>
								<img src={pageInfo.fields.anons?.url} alt="" className={css`object-fit: cover;width:100%;height:100%;object-position: 50% 50%; border-radius: 16px;`} />
							</div>

							<div className={text} dangerouslySetInnerHTML={{ __html: pageInfo.data.post_content }} />
							{/* <div className={text} style={{marginTop: 64}}>
								<h1>Test</h1>
								<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum voluptatem praesentium error, repudiandae quisquam est sequi itaque quia, quod sapiente, animi maxime assumenda nostrum officiis necessitatibus vitae possimus doloremque saepe!</p>
								<h1>h1</h1>
								<h2>h2</h2>
								<h3>h3</h3>
								<h4>h4</h4>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ad ea distinctio nostrum mollitia nisi vero aspernatur adipisci, voluptatem molestiae enim ipsa error quasi tenetur hic, sequi omnis consequatur libero!</p>
								<h3>Маркирвоанный список:</h3>
								<ul>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque!</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
								</ul>
								<h3>Нумерованный список:</h3>
								<ol>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
									<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint atque ut aperiam facilis? Sed ullam eaque, recusandae explicabo nam doloribus in delectus reiciendis, quibusdam necessitatibus quidem blanditiis, fuga est cumque</li>
								</ol>
							</div> */}

							{pageInfo?.fields?.group_gallery?.gallery &&
							<div className={css`
								padding-top: 32px;
							`}>
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
										console.log('hui1')
										setActiveIndex(index);
										setIsFullscreen(true);
										console.log('hui2')
									}}
									>
										<img src={item.url} alt="" style={{objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer', transition: '.3s ease-in-out'}} className={css`
											
											&:hover {
												transform: scale(1.05);
											}`} />
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
                  <img
                    src={item.big}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
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
										{pageInfo.fields.group_video.cod}
									</div>
								</div>
							}

						</motion.div>
						<motion.div 
						initial={{ opacity: 0, x: 80 }}
						animate={{ opacity: 1, x: 0 }} 
						transition={{ duration: .3 }}
						className={css`
							flex: 0 1 296px;
							max-width: 296px;
							position: sticky;
							top: 108px;
							height: max-content;
							display: flex;
							flex-direction: column;

							@media(max-width: 991px) {
								flex: 0 1 100%;
								max-width: 100%;
							}
						`}>
							<div className={css`
								background-color: #F5F7FA;
								border-radius: 28px;
								padding: 24px;
								margin-bottom: 14px;
							`}>
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Дата проведения</p>
								<p className={css`
									font-size: 14px;
									line-height: 1.16;
								`}>
									{/* {pageInfo.fields.events_start} - {pageInfo.fields.events_end} */}
									{
									(() => {
										const [d1, m1, y1] = pageInfo.fields.events_start.split('.');
										const [d2, m2, y2] = pageInfo.fields.events_end.split('.');

										if (pageInfo.fields.events_start === pageInfo.fields.events_end) {
										return formatDate(pageInfo.fields.events_start);
										} else if (m1 === m2 && y1 === y2) {
										// Берём отформатированную дату и убираем оттуда число, оставляя "июня 2025"
										const formatted = formatDate(pageInfo.fields.events_start);
										const [, monthAndYear] = formatted.split(' ', 2); // может вернуть только месяц
										const rest = formatted.slice(formatted.indexOf(' ') + 1); // "июня 2025"
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
							</div>
							{pageInfo.cities[0] && 
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Место проведения</p>
								<p className={css`
									font-size: 14px;
									line-height: 1.16;
								`}>{pageInfo.cities[0] && pageInfo.cities[0].name}</p>
							</div>
							}
							{pageInfo.fields.online || pageInfo.fields.address ?
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Адрес</p>
								<p className={css`
									font-size: 14px;
									line-height: 1.16;
								`}>{pageInfo.fields.online ? 'Онлайн-событие' : pageInfo.fields.address}</p>
							</div>
							: null
							}
							
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Стоимость</p>
								<p className={css`
									font-size: 14px;
									line-height: 1.16;
									font-weight: 500;
									color: #8553F9;
								`}>{pageInfo.fields.free ? 'Бесплатно' : formatPrice(pageInfo.fields.events_cost) + ' руб.'}</p>
							</div>
							{pageInfo.formats && 
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Формат</p>

								{pageInfo.formats.map(format => (
									<Link href={`/events/format_${format.slug}`} key={format.name} className={css`
										font-size: 14px;
										line-height: 1.16;
										color: #8553F9;
										cursor: pointer;
									`}>{format.name}</Link>
								))}
							</div>
							}
							{pageInfo.company[0] && 
							<div className={css`
								display: flex;
								flex-direction: column;
								padding: 14px 0;
								gap: 8px;
							`}>
								<p className={css`
									line-height: 1.28;
								`}>Организатор</p>
								<Link href={`/organizer/${pageInfo.company[0] && pageInfo.company[0].slug}`} className={css`
									font-size: 14px;
									line-height: 1.16;
									color: #8553F9;
									cursor: pointer;
								`}>{pageInfo.company[0] && pageInfo.company[0].name}</Link>
							</div>
							}
							</div>
							
							{!pageInfo.fields.events_owner &&
								<div className={css`
									color: ${theme.colors.purple};
									cursor: pointer;
								`}
								onClick={()=>{setIsModalOpen(true)}}>Это ваше мероприятие?</div> 
							}
							{pageInfo.fields.events_link && 
								<a href={pageInfo.fields.events_link} target="_blank" style={{marginTop: 14}}>
									<Button green="true" style={{width: '100%'}}>
										<p>
											<span>На сайт мероприятия</span>
											<span>На сайт мероприятия</span>
										</p>
									</Button>
								</a>
							}
						</motion.div>
					</div>
					}
				</Container>
			</div>
			
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
					<MainEventsSlider />
				</Container>
			</div>

			<MainEvents id={pageInfo && pageInfo.data.ID} similar={true} />
			<Form />

			<ModalEvent isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onReg={()=>setIsModalOpen2(true)} eventName={pageInfo && pageInfo.data.post_title} eventId={pageInfo && pageInfo.data.ID} />
			<Modal isOpen={isModalOpen2} onClose={()=>setIsModalOpen2(false)} />
		</>
	);
}