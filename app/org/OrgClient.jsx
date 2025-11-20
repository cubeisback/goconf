"use client"

import { useEffect, useState } from 'react';
import { Form } from '@/components/Form';
import { Breadcrumbs, Button, Container, OrgPageBlock, OrgPageBlockItem, OrgPageBlockItemList, OrgPageBlockItemPrice, OrgPageBlockItemTitle, OrgPageInfo, OrgPageInfoImg, OrgPageInfoPrice, OrgPageInfoText, OrgPageInfoTitle, OrgPagePadding, OrgPageSubtitle, OrgPageTitle, OrgSubtitle, PagePromo, PageTitle } from "@/styles/ui";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';

const OrgClient = () => {
	const token = useAuthStore((state) => state.token);
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [orgsData, setOrgsData] = useState(null)
	useEffect(() => {
		axios
			.get(getApiUrl('/backend/wp-json/pages/v2/org/'))
			.then((response) => {
				setOrgsData(response.data);
				// console.log('orgs - ', response.data)
			})
			.catch(console.error);
	}, []);

	return (
		<>
			<PagePromo>
				<Container>
					<Breadcrumbs>
						<Link href="/">Главная</Link>
						<p>Организаторам</p>
					</Breadcrumbs>
					<PageTitle style={{textAlign: 'center'}}>{orgsData?.title && orgsData.title}</PageTitle>
					<OrgSubtitle dangerouslySetInnerHTML={{ __html: orgsData?.content }}></OrgSubtitle>
				</Container>
			</PagePromo>

			<OrgPagePadding>
				<Container>
					<OrgPageTitle>{orgsData?.fields?.tariffs?.title}</OrgPageTitle>
					<OrgPageSubtitle dangerouslySetInnerHTML={{ __html: orgsData?.fields?.tariffs?.text }}></OrgPageSubtitle>

					<OrgPageBlock>
						{orgsData?.fields?.tariffs?.items.map((item, index) => (
							<OrgPageBlockItem key={index}>
							<OrgPageBlockItemTitle>{item.name}</OrgPageBlockItemTitle>
							<OrgPageBlockItemPrice>{item.cost}</OrgPageBlockItemPrice>
							<OrgPageBlockItemList $index={index}>
								<p><span>Описание события, обложка, дата и место проведения</span></p>
								<p style={{color: index == 0 && '#D7DADD'}}><span>Ссылка на сайт</span></p>
								<p style={{color: index == 0 && '#D7DADD'}}><span>Аналитика (просмотры, переходы)</span></p>
								<p style={{color: index == 0 && '#D7DADD'}}><span>Фото и видео</span></p>
							</OrgPageBlockItemList>
							<Button style={{margin: '0 auto'}}
								onClick={()=>{
									token ?
										router.push('/cabinet/events')
									:
										setIsModalOpen(true)
								}}
							>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
						</OrgPageBlockItem>
						))}
					</OrgPageBlock>
					
					<OrgPageTitle>Интересные события</OrgPageTitle>
					<OrgPageSubtitle>Также, мы&nbsp;предлагаем дополнительные опции продвижения,<br/> которые помогут вывести ваше событие в&nbsp;топ и&nbsp;привлечь именно ту&nbsp;аудиторию, которая вам нужна.</OrgPageSubtitle>
					<OrgPageInfo>
						<div style={{flex: 1}}>
							<OrgPageInfoTitle dangerouslySetInnerHTML={{ __html: orgsData?.fields?.['interesting-events'].text_1 }}></OrgPageInfoTitle>
							<OrgPageInfoText>{orgsData?.fields?.['interesting-events'].text_2}</OrgPageInfoText>
							<OrgPageInfoPrice>{orgsData?.fields?.['interesting-events'].text_3}</OrgPageInfoPrice>
							<Button 
							onClick={()=>{
									token ?
										router.push('/cabinet/events')
									:
										setIsModalOpen(true)
								}}
							>
								<p>
									<span>Попробовать</span>
									<span>Попробовать</span>
								</p>
							</Button>
						</div>
						<OrgPageInfoImg>
							{orgsData?.fields?.['interesting-events']?.image && 
							<Image 
								src={orgsData?.fields?.['interesting-events']?.image} 
								alt="GoConf Организаторам"
								width={661}
								height={491}
							/>
							}
						</OrgPageInfoImg>
					</OrgPageInfo>
				</Container>
			</OrgPagePadding>

			<Form />

			<Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
		</>
	);
}

export default OrgClient;