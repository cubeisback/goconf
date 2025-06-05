'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function GoogleSocialLogin() {
	const params = useSearchParams();
	const code = params.get('code');
	const router = useRouter();
	const login = useAuthStore.getState().login;

	// &uri=http://localhost:3000/social-login/google

	useEffect(() => {
		console.log(process.env.NODE_ENV)
		if (code) {
		fetch(`https://dev.goconf.ru/wp-json/users/v2/login-social/?action=google_oauth&code=${code}${process.env.NODE_ENV === 'development' && '&uri=http://localhost:3000/social-login/google'}`)
			.then(res => res.json())
			.then(data => {
				console.log('Ответ от WP:', data);
				if (data.token) {
					login(data.token);
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


export default function GoogleSocialLoginPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<GoogleSocialLogin />
		</Suspense>
	);
}