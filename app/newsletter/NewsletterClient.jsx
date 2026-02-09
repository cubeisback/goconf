'use client'

import { Article, Breadcrumbs, Container, PagePromo, PageTitle, SkeletonText } from "@/styles/ui";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getApiUrl } from '@/functions/functions';
import axios from 'axios';

const NewsletterClient = ({ initialData }) => {
	const [pageInfo, setPageInfo] = useState(initialData?.content || null);
	const [title, setTitle] = useState(initialData?.title || null);
	const [isLoading, setIsLoading] = useState(!initialData);

	// Дозагружаем данные на клиенте только если их не передали с сервера
	useEffect(() => {
		if (!initialData) {
			axios
				.get(getApiUrl("/backend/wp-json/pages/v2/page/?slug=newsletter"))
				.then((response) => {
					setPageInfo(response.data.content);
					setTitle(response.data.title);
					setIsLoading(false);
					// console.log('newsletter ', response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [initialData]);

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

export default NewsletterClient;