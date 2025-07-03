'use client'

import { Article, Breadcrumbs, Container, pagePromo, PagePromo, pageTitle, PageTitle } from "@/styles/ui";
import { Form } from '@/components/Form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getApiUrl } from '@/functions/functions';
import axios from 'axios';
import styled from "@emotion/styled";

const About = () => {
	const [pageInfo, setPageInfo] = useState(null);
	const [title, setTitle] = useState(null);
	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
		  .get(getApiUrl("/backend/wp-json/pages/v2/page/?slug=agreement"))
		  .then((response) => {
			setPageInfo(response.data.content)
			setTitle(response.data.title)
			// setIsLoading(false)
			// console.log('agreement ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, []);
	

	const dfsdfsdfsd2 = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);

		const token = authToken?.state?.token;
		try {
			const response = await axios.get(
			getApiUrl("/backend/wp-json/account/v2/events/get_edit/?id=351"),
			// {
			// 	data: {
			// 		name: 'TEST',
			// 		date_start: '11.11.2111',
			// 		date_end: '11.11.2111',
			// 	}
			// },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log("editor ", response);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(()=>{
		// dfsdfsdfsd()
	}, [])

    return (
        <>
			<div className={pagePromo}>
						<Container>
							<Breadcrumbs>
								<Link href="/">Главная</Link>
								<p>{title && title}</p>
							</Breadcrumbs>
							{title && <h1 className={pageTitle}>{title}</h1>}
						</Container>
			</div>
			<Container>
				<div onClick={()=>dfsdfsdfsd2()}>dfsdfsdfsd2</div>
				{ pageInfo && <Article dangerouslySetInnerHTML={{ __html:  pageInfo }}></Article> }
			</Container>
        </>
    );
}

export default About;