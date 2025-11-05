"use client"

import { css } from "@emotion/css";
import { Button, Container, lkContainer, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import { useEffect, useState } from "react";
import EditIcon from "@/public/images/svg/edit.svg";
import RemoveIcon from "@/public/images/svg/remove.svg";
import LkMenu from "@/components/ui/LkMenu";
import Link from "next/link";
import { getApiUrl } from "@/functions/functions";
import axios from "axios";
import AvatarIcon from "@/public/images/svg/avatar.svg";
import { useAuthReady } from "@/hooks/useAuthReady";
import { useConfirmModal } from "@/store/confirmModalStore";
import Loader from "@/public/images/svg/preloader.svg";

const UserOrg = () => {
	const { ready, token } = useAuthReady();
	const [organizations, setOrganizations] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		if (!ready) return;
	
		handleGetOrganizations(token)
	}, [ready, token]);
	
	// https://dev.goconf.ru/wp-json/account/v2/companies/
	
	const handleGetOrganizations = async() => {
		try {
			const response = await axios.get(
			getApiUrl("/backend/wp-json/account/v2/companies/"),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			console.log('organizations', response.data.items)
			if (response.status === 200) {
				setOrganizations(response.data.items)
			}
		} catch (error) {
			console.error("organizations error", error);
			setOrganizations(null)
		} finally {
			setLoading(false); // 🔹 всегда выключаем загрузку
		}
	};

	const handleDeleteOrganization = async(id) => {
		console.log(token, id)
		try {
			const response = await axios.get(
			getApiUrl(`/backend/wp-json/account/v2/company/remove/?id=${id}`),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			);
			// if (response.status === 200) {
			// 	console.log('removed')
			// }
		} catch (error) {
			console.error("organizations delete error", error);
		}
	};

	const { openModal } = useConfirmModal();
	const handleSubmitDeleteModal = (id) => {
		openModal({
		title: 'Удаление',
		description: `Вы действительно хотите удалить организатора?`,
		onConfirm: async () => {
			try {
				await handleDeleteOrganization(id);
				setOrganizations(prev => prev.filter(o => o.id !== id)); // мгновенно в UI
				// подстрахуемся актуальным списком
				await handleGetOrganizations();
			} catch (e) {
				console.error(e);
				await handleGetOrganizations(); // откатимся к серверному состоянию при ошибке
			}
		},
		confirmText: 'Удалить',
		});
	};

    return (
        <div className={lkContainer}>
            <Container>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    <LkMenu />
                
       
        <UserMain
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: .3 }}>
            <UserMainTitles>
                <UserMainTitlesTitle>Организаторы</UserMainTitlesTitle>
				<Link href="/lk/org/add">
					<Button>
						<p>
							<span>+ Добавить организатора</span>
							<span>+ Добавить организатора</span>
						</p>
					</Button>
				</Link>
            </UserMainTitles>

            <div className={css`
                display: flex;
                flex-direction: column;
                gap: 32px;
				height: 100%;
            `}>
				{loading ? (
								<div className={css`
									width: 100%;
									height: 100%;
									justify-content: center;
									display: flex;

									svg {
										width: 24px;
									}
								`}><Loader /></div> // 🔹 прелоадер
							) : organizations?.length > 0 ? (
								organizations.map((item, index) => (
									<div
				key={index}
				 className={css`
                    border-radius: 28px;
                    background-color: #fff;
                    box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                    padding: 24px 32px;
                `}>
                    <div className={css`
                        display: flex;
                        gap: 16px;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 24px;
                    `}>
						{item.status === 'rejected' ?
						<div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #FF5B3B; font-size: 14px; line-height: 1.16;`}>Отклонено</div>
						: item.status === 'publish' ? 
						<div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #69B90F; font-size: 14px; line-height: 1.16;`}>Опубликовано</div>
						: item.status === 'draft' ? 
						<div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #B5B7B9; font-size: 14px; line-height: 1.16;`}>Черновик</div> :
						<div className={css`padding: 3px 8px 5px; border-radius: 8px; color: #fff; background-color: #8553F9; font-size: 14px; line-height: 1.16;`}>На модерации</div>
						}
                        
                        <div className={css`
							display: flex;
							gap: 16px;

							svg {
									path {
										transition: .3s ease-in-out;
									}

									&:hover {
										path {
											stroke: #8553F9;
										}
									}
								}
						`}>
							<Link href={`/lk/org/edit/?id=${item.id}`}>
								<EditIcon />
							</Link>
                            
                            <RemoveIcon style={{cursor: 'pointer'}} onClick={()=>handleSubmitDeleteModal(item.id)} />
                        </div>
                    </div>
                    <div className={css`display: flex; gap: 24px;`}>
                        <div className={css`flex: 0 1 96px;`}>
							{/* TODO картинка отображается не сразу, иногда не отображается с каким-то именем (был banner.png) или после сохранения и релоада общего списка */}
							{item.logo ? 
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
							<img src={item.logo} alt={item.name} />
							</div>
							:
							<AvatarIcon/>
							}
							
                        </div>
                        <div className={css`flex:1;`}>
                            <Link href={`/organizer/${item?.slug}`} className={css`
								font-size:20px;font-weight:500;line-height:1.4;margin-bottom: 8px;
								transition: .3s ease-in-out;

								&:hover {
									color: #8553F9;
								}
							`}>{item.name}</Link>
                            <div className={css`color: #47474D;font-size: 14px;line-height: 1.16;margin-bottom: 16px;`} dangerouslySetInnerHTML={{ __html: item.text }} />
                            <div className={css`font-size: 14px;line-height: 1.16;`}>Мероприятия <span className={css`color: #8553F9;`}>({item.count})</span></div>
                        </div>
                    </div>
                </div>
								))
							) : (
								<div>Ничего не найдено</div>
							)}
				
                
            </div>
        </UserMain>
        

        </div>
            </Container>
        </div>
    )
}

export default UserOrg;