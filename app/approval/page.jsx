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
		  .get(getApiUrl("/backend/wp-json/pages/v2/page/?slug=approval"))
		  .then((response) => {
			setPageInfo(response.data.content)
			setTitle(response.data.title)
			// setIsLoading(false)
			console.log('Approval ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, []);

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
				{ pageInfo && <Article dangerouslySetInnerHTML={{ __html:  pageInfo }}></Article> }
			</Container>
        </>
    );
}

export default About;