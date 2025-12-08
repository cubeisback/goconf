'use client'

import { Article, Breadcrumbs, Container, PagePromo, PageTitle, SkeletonText } from "@/styles/ui";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

const About = () => {
	const [pageInfo, setPageInfo] = useState(null);
	const [title, setTitle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
		  .get(getApiUrl("/backend/wp-json/pages/v2/page/?slug=privacy"))
		  .then((response) => {
			setPageInfo(response.data.content)
			setTitle(response.data.title)
			setIsLoading(false)
			// console.log('privacy ', response.data);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}, []);

    return (
        <>
			<PagePromo>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<p>{title && title}</p>
					</Breadcrumbs>
					{isLoading ? 
						<SkeletonText $height="64" /> : 
						title && <PageTitle>{title}</PageTitle>
					}
				</Container>
			</PagePromo>
			<Container>
				{isLoading ? 
					<Article>
						<SkeletonText />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText $width='90' />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText $width='80' />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText $width='90' />
						<SkeletonText />
						<SkeletonText />
						<SkeletonText $width='80' />
						<SkeletonText />
						<SkeletonText />
					</Article>
				:
				pageInfo && <Article dangerouslySetInnerHTML={{ __html:  pageInfo }}></Article> 
				}
			</Container>
        </>
    );
}

export default About;