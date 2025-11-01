'use client'

import { Breadcrumbs, Button, Container, pagePromo, PageTitle } from "@/styles/ui";
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { Form } from '@/components/Form';
import { MainEvents } from '@/components/MainEvents';
import { motion } from 'framer-motion';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "@/functions/functions";
import VkIcon from "@/public/images/svg/vk_icon.svg";
import YtIcon from "@/public/images/svg/yt_icon.svg";
import TgIcon from "@/public/images/svg/tg_icon.svg";

export default function OrganizerClient({ params }) {
	const { slug } = useParams();
	const [pageInfo, setPageInfo] = useState(null);
	const [orgEvents, setOrgEvens] = useState(null);
	const [archiveOrgEvents, setArchiveOrgEvens] = useState(null);
	useEffect(() => {
		if (!slug) return;
	
		axios
		  .get(getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`))
		  .then((response) => {
			setPageInfo(response.data);
			setOrgEvens(response.data["similar-events"])
			console.log('организатор ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
		
		axios
		  .get(getApiUrl(`/backend/wp-json/org/v2/archive/?slug=${slug}`))
		  .then((response) => {
			setArchiveOrgEvens(response.data.items)
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, [slug]);

    const theme = useTheme();

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

    return (
        <>
            <div className={pagePromo}>
                <Container>
                    <Breadcrumbs>
                        <Link href="/">Главная</Link>
                        <Link href="/org">Организаторы</Link>
                        <p>{pageInfo && pageInfo.h1}</p>
                    </Breadcrumbs>
					<PageTitle>{pageInfo && pageInfo.h1}</PageTitle>
                </Container>
            </div>

            <div className={css`
                padding: ${orgEvents?.length > 0 ? '32px 0 0' : '32px 0 120px'};

                @media(max-width: 575px) {
                    padding-bottom: 64px;
                }
            `}>
                <Container>
                    
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
							{pageInfo?.fields?.logo && 
								<div className={css`
									width: 96px;
									height: 96px;
									border-radius: 100%;
									background-color: #F5F7FA;
									overflow: hidden;
									margin-bottom: 16px;
									padding: 14px;
									
									img {
										object-fit: contain;
										width: 100%;
										height: 100%;
									}
								`}>
									<img src={pageInfo.fields.logo} alt="" />
								</div>
							 }
							{pageInfo?.text &&
                            	<div className={text} dangerouslySetInnerHTML={{ __html: pageInfo.text }} />
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
								display: flex;
								flex-direction: column;
								gap: 16px;
								
                            `}>
                            {pageInfo?.fields?.address && 
								<p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>{pageInfo.fields.address}</p>
							}
                            {/* {pageInfo?.fields?.address && 
								<a href={pageInfo.fields.link} target="_blank" className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>{pageInfo.fields.link}</a>
							} */}
							{pageInfo?.fields?.phones && 
								<a href={`tel:${pageInfo.fields.phones[0]}`} className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: ${theme.colors.purple};
                                `}>{pageInfo.fields.phones[0]}</a>
							}
							{pageInfo?.fields?.emails && 
								<a href={`mailto:${pageInfo.fields.emails[0]}`} className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: ${theme.colors.purple};
                                `}>{pageInfo.fields.emails[0]}</a>
							}
							{pageInfo?.fields?.socials && (
							<div className={css`
								display: flex;
								gap: 8px;
							`}>
								{Object.entries(pageInfo.fields.socials).map(([key, value], index) => (
								<div key={index} className={css`
									height: 40px;

								svg path {
									transition: ${theme.transition};
								}

								&:hover {
									svg path {
										fill: ${theme.colors.purple};
									}
								}
								`}>
									{key === 'vk' && <a href={value} target="_blank"><VkIcon/></a>}
									{key === 'tg' && <a href={value} target="_blank"><TgIcon/></a>}
									{key === 'youtube' && <a href={value} target="_blank"><YtIcon/></a>}
								</div>
								))}
							</div>
							)}
                            </div>
                            
							{pageInfo?.fields?.link && 
							<a href={pageInfo.fields.link} target="_blank">
								<Button green='true' style={{width: '100%'}}>
									<p>
										<span>Перейти на сайт</span>
										<span>Перейти на сайт</span>
									</p>
								</Button>
							</a>
							}
                        </motion.div>
                    </div>
                  
                </Container>
            </div>
			
			{orgEvents?.length > 0 && <MainEvents similar={true} events={orgEvents} onPage={true} />}

			{archiveOrgEvents?.length > 0 && <MainEvents similar={true} archive={true} events={archiveOrgEvents} onPage={true} />}

            <Form />
        </>
    );
}
