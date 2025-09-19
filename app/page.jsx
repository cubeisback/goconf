"use client"

import { motion } from 'framer-motion';
import { Container } from "@/styles/ui";
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Formats } from '@/components/Formats/Formats';
import { MainEventsSlider } from '@/components/MainEventsSlider';
import { MainEvents } from '@/components/MainEvents';
import { Form } from '@/components/Form';
import { FilterOnMain } from '@/components/Filter/FilterOnMain';
import styled from "@emotion/styled";
import { ConfirmRegistration } from '@/components/ConfirmRegistration';
import { Suspense, useEffect } from 'react';
import { ResetPassword } from '@/components/ResetPassword';
import { MainEventsTest } from '@/components/MainEventsTest';

export default function Main() {
	const theme = useTheme();

	const PromoMain = styled.div`
	padding-top: 300px;
					padding-bottom: 80px;

					@media(max-width: 1439px) {
						padding-top: 160px;
						padding-bottom: 56px;
					}
					@media(max-width: 1023px) {
						padding-top: 144px;
					}
					@media(max-width: 575px) {
						padding-top: 96px;
						padding-bottom: 40px;
					}
	`

	const AnimatedTitle = styled(motion.div)`
	font-family: Impact;
						text-align: center;
						font-size: 90px;
						line-height: 1.1;
						margin-bottom: 32px;

						@media(max-width: 1439px) {
							font-size: 60px;
						}
						@media(max-width: 575px) {
							font-size: 40px;
							margin-bottom: 24px;
						}

						span {
							position: relative;

							&:nth-of-type(1) {
								&::before {
									content: '';
									position: absolute;
									left: -15px;
									top: 0;
									width: 117px;
									height: 118px;
									background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="117" height="118" viewBox="0 0 117 118" fill="none"><path d="M7.16575 8.95115L0.676199 107.71C0.318542 113.152 4.84611 117.66 10.2873 117.278L108.63 110.371C113.345 110.04 117 106.119 117 101.394V15.2737C117 10.5208 113.304 6.58722 108.561 6.29118L16.707 0.558744C11.7576 0.249861 7.49091 4.00281 7.16575 8.95115Z" fill="%23B3ED73"/></svg>');
									z-index: -1;
									background-size: cover;

									@media(max-width: 1439px) {
										width: 76px;
										height: 77px;
										left: -7px;
									}
									@media(max-width: 575px) {
										width: 53px;
										height: 54px;
									}
								}
							}
							&:nth-of-type(2) {
								color: ${({ theme }) => theme.colors.purple};
							}
						}
	`

	const AnimatedTitleSpan = styled.span`
	position: relative;

						&::before {
							content: '';
							position: absolute;
							left: -15px;
							top: 0;
							width: 117px;
							height: 118px;
							background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="117" height="118" viewBox="0 0 117 118" fill="none"><path d="M7.16575 8.95115L0.676199 107.71C0.318542 113.152 4.84611 117.66 10.2873 117.278L108.63 110.371C113.345 110.04 117 106.119 117 101.394V15.2737C117 10.5208 113.304 6.58722 108.561 6.29118L16.707 0.558744C11.7576 0.249861 7.49091 4.00281 7.16575 8.95115Z" fill="%23B3ED73"/></svg>');
							z-index: -1;
							background-size: cover;

							@media(max-width: 1439px) {
								width: 76px;
								height: 77px;
								left: -7px;
							}
							@media(max-width: 575px) {
								width: 53px;
								height: 54px;
							}
						}
	`
	const AnimatedSubtitle = styled(motion.div)`
	font-size: 20px;
						text-align: center;
						line-height: 1.4;

						@media(max-width: 575px) {
							font-size: 16px;
							line-height: 1.22;
						}
	`
	const PurpleBg = styled.div`
		position: relative;
		background-color: #F5F7FA;

				&::before {
					content: '';
					position: absolute;
					left: -100vw;
					bottom: -120px;
					width: 200vw;
					height: 600px;
					background-color: ${({ theme }) => theme.colors.purple};
					// z-index: -1;

					@media(max-width: 1339px) {
						content: none;
					}
				}
	`
	

	useEffect(()=>{
		console.log('PUBLIC VERSION', process.env.NEXT_PUBLIC_VERSION)
	}, [])

	return (
		<>
			<div style={{backgroundColor: '#F5F7FA', paddingBottom: 95}}>
			<Container>
				<PromoMain>
					
					<AnimatedTitle
					initial={{ x: 50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					>
						Афиша бизнес-событий 
					<div style={{display: 'inline-block', paddingLeft: 16}}>
					<AnimatedTitleSpan>Go</AnimatedTitleSpan><span className={css`color: ${theme.colors.purple}`}>Conf</span>
					</div>
					</AnimatedTitle>
					<AnimatedSubtitle
					initial={{ x: 40, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					>
						Делаем поиск профессиональных событий удобным,<br/> а&nbsp;привлечение участников эффективным
					</AnimatedSubtitle>
				</PromoMain>

			</Container>
			
			<Container $fullWidth>
				<FilterOnMain />
			</Container>
			</div>
			<PurpleBg>
				<Container $fullWidth>
					<MainEventsSlider />
				</Container>
			</PurpleBg>
			
			<Formats />
			
			<MainEventsTest />

			<Form />

			<Suspense fallback={null}>
				<ConfirmRegistration />
			</Suspense>
			<Suspense fallback={null}>
				<ResetPassword />
			</Suspense>
			
		</>
	);
}
