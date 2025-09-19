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
	padding-top: 180px;
					padding-bottom: 64px;

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
						font-size: 56px;
						line-height: 1.1;
						margin-bottom: 16px;

						@media(max-width: 1439px) {
							// font-size: 60px;
						}
						@media(max-width: 575px) {
							font-size: 40px;
							// margin-bottom: 24px;
						}

						span {
							position: relative;

							&:nth-of-type(1) {
								&::before {
									content: '';
									position: absolute;
									left: -10px;
									top: -4px;
									width: 76px;
									height: 77px;
									background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="76" height="77" viewBox="0 0 76 77" fill="none"><path d="M4.42376 5.83338L0.194579 70.1934C-0.038503 73.7404 2.91208 76.6778 6.45806 76.4288L70.5474 71.9281C73.6197 71.7124 76.0018 69.1572 76.0018 66.0773V9.95374C76.0018 6.85632 73.5933 4.29284 70.5019 4.09991L10.6417 0.364128C7.41623 0.162832 4.63567 2.6086 4.42376 5.83338Z" fill="%23B3ED73"/></svg>');
									// z-index: -1;
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
								em {
									font-style: normal;
									position: relative;
								}
							&:nth-of-type(2) {
								color: ${({ theme }) => theme.colors.purple};
							}
						}
	`

	const AnimatedTitleSpan = styled.span`
	position: relative;

						&::before {
							// content: '';
							position: absolute;
							left: -15px;
							top: 0;
							width: 76px;
							height: 77px;
							background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="76" height="77" viewBox="0 0 76 77" fill="none"><path d="M4.42376 5.83338L0.194579 70.1934C-0.038503 73.7404 2.91208 76.6778 6.45806 76.4288L70.5474 71.9281C73.6197 71.7124 76.0018 69.1572 76.0018 66.0773V9.95374C76.0018 6.85632 73.5933 4.29284 70.5019 4.09991L10.6417 0.364128C7.41623 0.162832 4.63567 2.6086 4.42376 5.83338Z" fill="%23B3ED73"/></svg>');
							// z-index: -1;
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
	font-size: 18px;
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
			<div style={{backgroundColor: '#F5F7FA', paddingBottom: 64}}>
			<Container>
				<PromoMain>
					
					<AnimatedTitle
					initial={{ x: 50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					>
						Афиша бизнес-событий 
					<div style={{display: 'inline-block', paddingLeft: 16}}>
					<AnimatedTitleSpan><em>Go</em></AnimatedTitleSpan><span className={css`color: ${theme.colors.purple}`}>Conf</span>
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
