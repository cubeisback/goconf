"use client"

import { breadcrumbs, Button, container, pagePromo, pageTitle } from "@/styles/ui";
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
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { decodeHtmlEntities, formatDate, formatPrice } from '@/functions/functions';
// import { DocumentDescription, DocumentTitle } from '@/functions/DocumentMeta';
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventClient({ params }) {
	const [version, setVersion] = useState(0);

	const theme = useTheme();

	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	// const [seoTitle, setSeoTitle] = useState(null)
	// const [seoDescription, setSeoDescription] = useState(null)

	const [event, setEvent] = useState(null);
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

	const { slug } = useParams(); // получаем параметр пути
	const [pageInfo, setPageInfo] = useState(null);
	useEffect(() => {
		if (!slug) return;
	
		axios
		  .get(`https://dev.goconf.ru/wp-json/events/v2/single/?slug=${slug}`)
		  .then((response) => {
			setPageInfo(response.data);
			// Здесь тоже можно вызывать функции для SEO если нужно
			console.log('page ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
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
			font-weight: normal;
		}
		& > h3 {
			font-size: 20px;
			font-weight: 500;
			line-height: 1.4;
			font-weight: normal;
		}
		& > h4 {
			font-size: 18px;
			font-weight: 500;
			line-height: 1.36;
			font-weight: normal;
		}
		& > ul {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			
			li {
				font-size: 14px;
			}
		}
		& > ol {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			gap: 10px;

			li {
				font-size: 14px;
			}
		}
	`;

	return (
		<>
		{/* <DocumentTitle value={decodeHtmlEntities(seoTitle)} /> */}
		{/* <DocumentDescription value={decodeHtmlEntities(seoDescription)} /> */}
			<div className={pagePromo}>
				<div className={container}>
					<div className={breadcrumbs}>
						<Link href="/">Главная</Link>
						<Link href="/events">Мероприятия</Link>
						<p>{pageInfo && pageInfo.data.post_title}</p>
					</div>
					{pageInfo && <h1 className={pageTitle}>{pageInfo.data.post_title}</h1> }
					<div className={promoThemes}>
						<p>Тематика:</p>
						{pageInfo && pageInfo.subjects.map(theme => (
							<Link key={theme.term_id} href={`/events/direction_${theme.slug}`}>{theme.name}</Link>
						))}
					</div>
				</div>
			</div>

			<div className={css`
				padding: 32px 0 120px;

				@media(max-width: 575px) {
					padding-bottom: 64px;
				}
			`}>
				<div className={container}>
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
							<div className={css`max-height: 400px;overflow: hidden;margin-bottom: 40px;`}>
								<img src={pageInfo.fields.anons.url} alt="" className={css`object-fit: cover;width:100%;height:100%;`} />
							</div>

							<div className={text} dangerouslySetInnerHTML={{ __html: pageInfo.data.post_content }} />
							<div className={text} style={{marginTop: 64}}>
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
							</div>

							{version === 3 && 
							
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
									<div className={pageTitle}>Галерея</div>
									<div className={css`
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
									`}>
										<div ref={navigationPrevRef}>
											<SliderArrow />
										</div>
										<div ref={navigationNextRef}style={{transform: 'rotate(180deg)'}}>
											<SliderArrow />
										</div>
									</div>
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
									<SwiperSlide className={css`
										border-radius: 24px;
										background-color: #fff;
										overflow: hidden;
									`}>
										<img src={''} alt="" />
									</SwiperSlide>
									<SwiperSlide className={css`
										border-radius: 24px;
										background-color: #fff;
										overflow: hidden;
									`}>
										<img src={''} alt="" />
									</SwiperSlide>
									<SwiperSlide className={css`
										border-radius: 24px;
										background-color: #fff;
										overflow: hidden;
									`}>
										<img src={''} alt="" />
									</SwiperSlide>
									<SwiperSlide className={css`
										border-radius: 24px;
										background-color: #fff;
										overflow: hidden;
									`}>
										<img src={''} alt="" />
									</SwiperSlide>
								</Swiper>
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
							
							{version === 2 && <a href="/" className={css`
								color: ${theme.colors.purple};
							`}>Это ваше мероприятие?</a>}
							{version === 3 && <Button green>На сайт мероприятия</Button>}
						</motion.div>
					</div>
					}
				</div>
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
				<div className={cx(container, css`@media(max-width: 1439px) {padding: 0;}` )}>
					<MainEventsSlider />
				</div>
			</div>

			<MainEvents id={pageInfo && pageInfo.data.ID} similar={true} />
			<Form />

			<Helper>
				<h2>Версия</h2>
				<p onClick={()=>setVersion(1)}>Для пользователей</p>
				<p onClick={()=>setVersion(2)}>Для админа</p>
				<p onClick={()=>setVersion(3)}>Стандарт</p>
			</Helper>
		</>
	);
}