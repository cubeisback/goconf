import axios from 'axios';
import { getApiUrl } from '@/functions/functions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SuccessReg from "@/public/images/svg/success_reg.svg";
import Link from 'next/link';

import { css } from '@emotion/css';

export const ConfirmRegistration = () => {

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
		console.log('Token:', token);
		console.log('User ID:', user);

		try {
			const response = await axios.get(
				getApiUrl(`/backend/wp-json/users/v2/confirm/?token=${token}&user=${user}`),
			);

			if (response.status === 200) {
				console.log('regconf', response)
				setShowSuccessReg(true)
			}
		} catch (error) {
			console.error(error);
		}
	};

	return(
		<>
		{showSuccessReg && 
				<div className={css`
					border-radius: 28px;
					background-color: #fff;
					box-shadow: 0px 111px 31px 0px rgba(0, 0, 0, 0.00), 0px 71px 28px 0px rgba(0, 0, 0, 0.01), 0px 40px 24px 0px rgba(0, 0, 0, 0.05), 0px 18px 18px 0px rgba(0, 0, 0, 0.09), 0px 4px 10px 0px rgba(0, 0, 0, 0.10);
					position: fixed;
					left: 50%;
					top: 50%;
				`}>
					<SuccessReg />
					<div>Вы успешно зарегистрировались</div>
					<p>На&nbsp;указанный e-mail отправлена ссылка для подтверждения регистрации</p>
					<Link href="/" onClick={()=>setShowSuccessReg(false)}>Вернуться на&nbsp;сайт</Link>
				</div>
		}
		</>
	)
}