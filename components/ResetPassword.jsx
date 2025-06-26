'use client';

import axios from 'axios';
import { getApiUrl } from '@/functions/functions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SuccessReg from "@/public/images/svg/success_reg.svg";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/styles/ui';
import { css } from '@emotion/css';

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

export const ResetPassword = () => {

	// Восстановление паролья // https://dev.goconf.ru/?action=password-reset&token=DNXzLxWavVOSpacjV33RAb5es2ZwjkDk
	const searchParams = useSearchParams();
	const [resetToken, setResetToken] = useState(null)
	useEffect(() => {
		const action = searchParams.get('action');
		const token = searchParams.get('token');

		if (action === 'password-reset' && token) {
			handleResetVerify(token);
			setResetToken(token)
		}
	}, [searchParams]);

	const [showResetWindow, setShowResetWindow] = useState(false);
	const [showResetWindowFailed, setShowResetWindowFailed] = useState(false);
	

	const handleResetVerify = async(token) => {
		console.log('tut token', token)
		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/users/v2/password-reset/verify/"),
				{
					token: token,
				}
			);
			console.log("reset verify ", response);

			if (response.status === 200) {
				setShowResetWindow(true)
			}
		} catch (error) {
			console.error(error);
			setShowResetWindow(true)
			setShowResetWindowFailed(true)			
		}
	};

	const [newPassword, setNewPassword] = useState('')
	const handleResetUpdate = async(e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
			getApiUrl("/backend/wp-json/users/v2/password-reset/update/"),
				{
					token: resetToken,
					password: newPassword
				}
			);
			console.log("reset update ", response);

			if (response.status === 200) {
				setShowResetWindow(false)
			}
		} catch (error) {
			console.error(error);
		}
	}

	return(
		<>
		<AnimatePresence>
		{showResetWindow && 
            <ModalBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
					<ConfirmWindow
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					>
					<ModalClose onClick={()=>setShowResetWindow(false)} />
					<ConfirmWindowTitle>{showResetWindowFailed ? 'Ссылка устарела' : 'Восстановление пароля'}</ConfirmWindowTitle>
					<ConfirmWindowText>{showResetWindowFailed ? 'Сделайте новый запрос на восстановление пароля' : 'Введите новый пароль'}</ConfirmWindowText>
					{!showResetWindowFailed && 
					<form 
						onSubmit={handleResetUpdate} 
					>
                      	<input type="password" placeholder="Пароль" 
						value={newPassword} 
						onChange={(e) => setNewPassword(e.target.value)}
						className={css`
							
								padding: 16px;
								border: 1px solid #D7DADD;
								border-radius: 28px;
								font-size: 14px;
								transition: .3s ease-in-out;
								margin-bottom: 20px;

								&::placeholder {
								color: rgba(71, 71, 77, .64);
								font-size: 14px;
								}
							
						`}
						// style={errorsReset.emailReset && {borderColor: '#FC1234'}} 
						/>
						<Button $button type="submit">
							<p>
								<span>Сменить пароль</span>
								<span>Сменить пароль</span>
							</p>
						</Button>
					</form>
					}
				</ConfirmWindow>
				
			</ModalBackdrop>
		}
		</AnimatePresence>
		</>
	)
}