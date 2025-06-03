'use client'

import { breadcrumbs, Button, Container, pagePromo, PageTitle } from "@/styles/ui";
import OrgLogo from '@/public/images/svg/org_logo.svg'
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

const Organizer = () => {
	const { slug } = useParams();
	const [pageInfo, setPageInfo] = useState(null);
	useEffect(() => {
		if (!slug) return;
	
		axios
		  .get(getApiUrl(`/backend/wp-json/org/v2/simple/?slug=${slug}`))
		  .then((response) => {
			setPageInfo(response.data);
			console.log('организатор ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, [slug]);

    const theme = useTheme();

    const text = css`
        display: flex;
        flex-direction: column;
        gap: 24px;

        & > p {
            line-height: 1.28;
        }
        & > div {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.36;
        }
    `;

    return (
        <>
            <div className={pagePromo}>
                <Container>
                    <div className={breadcrumbs}>
                        <Link href="/">Главная</Link>
                        <Link href="/org">Организаторы</Link>
                        <p>АКАР</p>
                    </div>
					<PageTitle>{pageInfo && pageInfo.h1}</PageTitle>
                </Container>
            </div>

            <div className={css`
                padding: 32px 0 0;

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
							<OrgLogo className={css`margin-bottom: 40px;`} />
                            {/* <div className={text} dangerouslySetInnerHTML={{ __html: text }} /> */}
                            <div className={text}>
                                <p>Ассоциация коммуникационных агентств России — это созданная в 1993 году некоммерческая организация, которая включает в себя более 200 профессиональных игроков рынка коммуникационных услуг России.</p>
                                <p>Являясь одним из крупнейших объединений отечественной рекламной индустрии, Ассоциация активно участвует в развитии саморегулирования отрасли, способствует выстраиванию эффективной коммуникации между агентствами и рекламодателями, создает индустриально значимые продукты, проводит исследования рынка.</p>
                            </div>
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
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>г. Москва, ул. Полковая, д.3, стр.3</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <p className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                `}>8 (495) 662-39-88</p>
                            </div>
                            <div className={css`
                                display: flex;
                                flex-direction: column;
                                padding: 14px 0;
                                gap: 8px;
                            `}>
                                <a href="mailto:pr@akarussia.ru" className={css`
                                    font-size: 14px;
                                    line-height: 1.16;
                                    color: ${theme.colors.purple};
                                `}>pr@akarussia.ru</a>
                            </div>
                            </div>
                            
                            <Button green>Перейти на сайт</Button>
                        </motion.div>
                    </div>
                  
                </Container>
            </div>

            <MainEvents similar={true} />

            <Form />
        </>
    );
}

export default Organizer;