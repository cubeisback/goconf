'use client'

import { Breadcrumbs, Container, PagePromo, PageTitle } from "@/styles/ui";
import { Form } from '@/components/Form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getApiUrl } from '@/functions/functions';
import axios from 'axios';
import styled from "@emotion/styled";

const AboutSubtitle = styled.div`
	text-align:center;

	br {
	    @media(max-width: 575px) {
	        display: none;
	    }
	}
`
const AboutWrapper = styled.div`
	padding: 32px 0 120px;
	background-color: #F5F7FA;

	@media(max-width: 575px) {
	    padding-bottom: 64px;
	}
`
const AboutBlock = styled.div`
	display: flex;
    gap: 32px;
    padding-top: 60px;

    @media(max-width: 991px) {
        flex-direction: column;
        gap: 100px;
    }
`
const AboutItem = styled.div`
	flex: 0 1 calc(33.333333% - 21.333333px);
    max-width: calc(33.333333% - 21.333333px);
    padding: 120px 32px 32px;
    border-radius: 28px;
    background-color: #fff;

    @media(max-width: 991px) {
        flex: 0 1 100%;
        max-width: 100%;
        padding: 120px 24px 24px;
    }

    div {
        text-align: center;
        margin-bottom: 24px;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.34;

        @media(max-width: 575px) {
            font-size: 22px;
        }
    }

    svg {
        margin: -200px auto 10px;
        display: block;
    }
`
const SkeletonItem = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 28px;
	height: 382px;
	animation: pulse 1.5s infinite;
	width: 33%;

	@keyframes pulse {
		0% { opacity: 1 }
		50% { opacity: 0.5 }
		100% { opacity: 1 }
	}
`

const About = () => {
	const [aboutItems, setAboutItems] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
		  .get(getApiUrl("/backend/wp-json/pages/v2/about/"))
		  .then((response) => {
			setAboutItems(response.data.fields.benefits)
			setIsLoading(false)
			console.log('about ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, []);
	//TODO SEO
    return (
        <>
            <PagePromo>
                <Container>
                    <Breadcrumbs>
                        <Link href="/">Главная</Link>
                        <p>О проекте</p>
                    </Breadcrumbs>
                    <PageTitle style={{textAlign: 'center'}}>О проекте <span style={{color: '#8553F9'}}>GoCONF</span></PageTitle>
                    <AboutSubtitle>Самые интересные бизнес-мероприятия различных форматов<br/> от&nbsp;форумов до&nbsp;бизнес-семинаров по&nbsp;всей России</AboutSubtitle>
                </Container>
            </PagePromo>

            <AboutWrapper>
                <Container>
                    <AboutBlock>
						{isLoading ? (
							<>
								{[...Array(3)].map((_, i) => (
									<SkeletonItem key={i}></SkeletonItem>
								))}
							</>
						) : 
						aboutItems && aboutItems.map((item, index) => (
							<AboutItem key={index}>
								<div
          							dangerouslySetInnerHTML={{ __html: item.svg }}
        						/>
								<div>{item.name}</div>
								<p>{item.desc}</p>
							</AboutItem>
						))}
                    </AboutBlock>
                </Container>
            </AboutWrapper>

            <Form />
        </>
    );
}

export default About;