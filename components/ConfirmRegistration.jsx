'use client';

import axios from 'axios';
import { getApiUrl } from '@/functions/functions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SuccessReg from "@/public/images/svg/success_reg.svg";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/styles/ui';
import { Modal } from './ui/Modal';

const ConfirmWindow = styled(motion.div)`
	border-radius: 28px;
	background-color: #fff;
	box-shadow: 0px 111px 31px 0px rgba(0, 0, 0, 0.00), 0px 71px 28px 0px rgba(0, 0, 0, 0.01), 0px 40px 24px 0px rgba(0, 0, 0, 0.05), 0px 18px 18px 0px rgba(0, 0, 0, 0.09), 0px 4px 10px 0px rgba(0, 0, 0, 0.10);
	position: relative;
	padding: 40px 64px;
	text-align: center;
	max-width: 480px;
`;
const ConfirmWindowTitle = styled.div`
	margin: 8px 0 16px;
	font-size: 24px;
	font-weight: bold;
	line-height: 1.34;
	color: #191921;
`;

const ConfirmWindowText = styled.div`
	font-size: 14px;
	line-height: 1.16;
	margin-bottom: 32px;
`;

const ModalBackdrop = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const ModalClose = styled.div`
	position: absolute;
	top: 16px;
	right: 16px;
	width: 32px;
	height: 32px;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 9L23 23M23 9L9 23" stroke="%238553F9" stroke-width="2" stroke-linecap="round"/></svg>');
	cursor: pointer;
	transition: .3s ease-in-out;

	&:hover {
	  transform: rotate(180deg);
	}
`;

export const ConfirmRegistration = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	// Подтверждение регистрации http://localhost:3000/?confirm=registration&token=3eea29110d7871dd108a8bfd86e25a10&user=34
	const searchParams = useSearchParams();
	useEffect(() => {
		const confirm = searchParams.get('confirm');
		const token = searchParams.get('token');
		const user = searchParams.get('user');

		if (confirm === 'registration' && token && user) {
			confirmUser(token, user);
		}
	}, [searchParams]);

	const [showSuccessReg, setShowSuccessReg] = useState(false)
	const confirmUser = async(token, user) => {
		// console.log('Token:', token);
		// console.log('User ID:', user);

		try {
			const response = await axios.get(
				getApiUrl(`/backend/wp-json/users/v2/confirm/?token=${token}&user=${user}`),
			);

			if (response.status === 200) {
				// console.log('regconf', response)
				setShowSuccessReg(true)
			}
		} catch (error) {
			console.error(error);
		}
	};

	return(
		<>
		<AnimatePresence>
		{showSuccessReg && 
            <ModalBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
				{/* <ConfirmWindow
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				>
					<ModalClose onClick={()=>setShowSuccessReg(false)} />
					<SuccessReg />
					<ConfirmWindowTitle>Вы успешно зарегистрировались</ConfirmWindowTitle>
					<ConfirmWindowText>На&nbsp;указанный e-mail отправлена ссылка для подтверждения регистрации</ConfirmWindowText>
					<Button onClick={()=>setShowSuccessReg(false)} full="true">
						<p>
							<span>Вернуться на&nbsp;сайт</span>
							<span>Вернуться на&nbsp;сайт</span>
						</p>
					</Button>
				</ConfirmWindow> */}
					<ConfirmWindow
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				>
					<ModalClose onClick={()=>setShowSuccessReg(false)} />
					<SuccessReg />
					<ConfirmWindowTitle>Вы успешно активировали учётную запись</ConfirmWindowTitle>
					<ConfirmWindowText>Для входа воспользуйтесь формой на сайте, указав адрес электронной почты и пароль.</ConfirmWindowText>
					<Button onClick={() => {setShowSuccessReg(false); setIsModalOpen(true);}} full="true">
						<p>
							<span>Войти</span>
							<span>Войти</span>
						</p>
					</Button>
				</ConfirmWindow>
				
			</ModalBackdrop>
		}
		</AnimatePresence>

		<Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
		</>
	)
}