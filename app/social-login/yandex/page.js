'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';

export function YandexSocialLogin() {
	const params = useSearchParams();
	const code = params.get('code');
	const router = useRouter();
	const login = useAuthStore.getState().login;
	
	// &uri=http://localhost:3000/social-login/yandex

	useEffect(() => {
		if (code) {
		// fetch(`https://dev.goconf.ru/wp-json/users/v2/login-social/?action=yandex_oauth&code=${code}`)
		axios
			.get(getApiUrl(`/backend/wp-json/users/v2/login-social/?action=yandex_oauth&code=${code}`))
			// .then(res => res.json())
			.then(data => {
				console.log('Ответ от WP:', data);
				if (data.data.token) {
					login(data.data.token);
					router.push('/');
				}
			});
		}
	}, [code]);
	
	return (
		<div style={{position: 'fixed', width: '100vw', height: '100vh', background: '#fff', zIndex: 99}}>
		
		</div>
	);
}

export default function YandexSocialLoginPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<YandexSocialLogin />
		</Suspense>
	);
}