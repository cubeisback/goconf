"use client"

import Link from "next/link";
import { css } from "@emotion/css";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Container, LkWrapper, UserMain, UserMainTitles, UserMainTitlesTitle } from "@/styles/ui";
import { useTheme } from "@emotion/react";
import LkMenu from "@/components/ui/LkMenu";
import axios from "axios";
import { getApiUrl } from "@/functions/functions";
import Loader from "@/public/images/svg/preloader.svg";
import DropdownInput from "@/components/ui/DropdownInput";

const UserOrders = () => {
    const theme = useTheme();
	const [loading, setLoading] = useState(true);


	const [orders, setOrders] = useState()
	const getHist = async() => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
			try {
				const response = await axios.get(
					getApiUrl("/backend/wp-json/account/v2/promotion/history/"),
					{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				// console.log('his', response.data)
				if (response.status === 200) {
					setOrders(response.data)
				}
			} catch (error) {
				console.error("Ошибка получения заказов", error);
			}
			finally {
				setLoading(false);
			}
	};

	useEffect(()=>{
		getHist()
	}, [])

	const [statuses, setStatuses] = useState({
		pending: 'Не оплачено',
		paid: 'Оплачено'
	});
	const [ordersError, setOrdersError] = useState();
	const getHistSort = async(currentStatus) => {
		const authTokenRaw = localStorage.getItem('authToken');
		const authToken = JSON.parse(authTokenRaw);
		const token = authToken?.state?.token;
		setLoading(true);
		console.log('currentStatus', currentStatus)
			try {
				const response = await axios.post(
					getApiUrl("/backend/wp-json/account/v2/promotion/history/"),
					{status: currentStatus},
					{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				);
				console.log('history', response)
				if (response.status === 200) {
					setOrders(response.data)
					setOrdersError()
				}
			} catch (error) {
				console.error("Update password error", error);
				setOrders()
				setOrdersError(error.response.data.message)
			}
			finally {
				setLoading(false);
			}
	};
    return (
		<LkWrapper>
            <Container>
                <div style={{display: 'flex', gap: 64}}>
                    <LkMenu />
                
        <UserMain>
            <motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }} 
				transition={{ duration: .3 }}
            >	
				<UserMainTitles>
					<UserMainTitlesTitle>Заказы</UserMainTitlesTitle>
				</UserMainTitles>
				<div style={{marginBottom: '32px', display: 'flex', gap: '16px'}}>
                <div className={css`
					flex: 0 1 300px;

					@media(max-width: 575px) {
						flex: 0 1 100%;
					}
				`}>
                    <p style={{marginBottom: '8px', color: '#47474D', fontSize: 14, lineHeight: 1.16}}>Статус</p>
                    <DropdownInput options={statuses} type={'status'} placeholder={'Статус'} isSimple incomeFunction={getHistSort} />
                </div>
            </div>
            </motion.div>

		
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: .3 }}
        className={css`
            display: flex;
            flex-direction: column;
            gap: 32px;
        `}>
			{ordersError && !loading && ordersError}
			{loading ? (
												<div className={css`
													width: 100%;
													height: 100%;
													justify-content: center;
													display: flex;
				
													svg {
														width: 24px;
													}
												`}><Loader /></div>
											) : 
											orders && orders.map((item)=>(
			
            <div key={item.id} className={css`
                padding: 24px 32px;
                border-radius: 28px;
                background-color: #fff;
                box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                display: flex;
                flex-direction: column;
                gap: 16px;
                font-size: 14px;
                line-height: 1.16;

                b {
                    font-weight: 500;
                }

				@media(max-width: 575px) {
					padding: 16px;
				}
            `}>
				
                <div className={css`
                    margin-bottom: 8px;
                    display: flex;
                    gap: 16px;
                    justify-content: space-between;
                `}>
                    <div className={css`
                        display: flex;
						align-items: center;
                        gap: 16px;

                        @media(max-width: 575px) {
                            flex-direction: column;
                            flex: 1;
							align-items: flex-start;
                        }
                    `}>
                        <div className={css`
                            padding: 3px 8px 5px;
                            color: #fff;
                            border-radius: 8px;
                            background-color: ${item.status === 'pending' ? '#FF5B3B' : '#69B90F'};
                            width: max-content;
                        `}>{item.status === 'pending' ? 'Не оплачен' : 'Оплачен'}</div>
                        <div>Дата: {item.date}</div>
                    </div>
                    <a href={item.invoice} target="_blank" className={css`color: ${theme.colors.purple};`}>
						{item.status === 'pending' && item.payment === 'Оплата картой или QR-кодом' && 'Ссылка на оплату'}
						{item.payment === 'Оплата по счету для юр.лиц' && 'Скачать счет'}
					</a>
                </div>
				<div style={{marginBottom: 8, fontSize: 20, fontWeight: 500, lineHeight: 1.4}}>{item.name}</div>
                
                <div><b>&#8470; заказа:</b> <span className={css`color: #6C6C71;`}> {item.id}</span></div>
                <div><b>Сумма оплаты:</b> <span className={css`color: ${theme.colors.purple};font-weight: 500;`}>{item.total} руб.</span></div>
				<div><b>Дата оплаты:</b> <span className={css`color: #6C6C71;`}>{item.date}</span></div>
                <div><b>Способ оплаты:</b> <span className={css`color: #6C6C71;`}>{item.payment}</span></div>

				<div style={{width: '100%', height: 1, background: '#D7DADD', margin: '8px 0'}}></div>

				<div>
					<div style={{marginBottom: 16}}><b>Опции для продвижения:</b></div> 
					<ul className={css`
						list-style-type: none;
						display: flex;
						flex-direction: column;
						gap: 16px;
						margin-bottom: 8px;

						li {
							position: relative;
							padding-left: 16px;

							&::before {
								content: '';
								width: 6px;
								height: 6px;
								background-color: #191921;
								border-radius: 100%;
								position: absolute;
								left: 0;
								top: 5px;
							}
						}
					`}>
					{item.options.map((option, i) => (
						<li key={i} dangerouslySetInnerHTML={{ __html: option }}></li>
					))}
					</ul>
					{item.expiration && <div style={{color: '#6C6C71', }}>Действует до: {item.expiration}</div>}
				</div>
            </div>
			))}
        </motion.div>

        </UserMain>

		</div>
            </Container>
        </LkWrapper>
    )
}

export default UserOrders;