'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';
import { getApiUrl } from '@/functions/functions';

export function GoogleSocialLogin() {
	const params = useSearchParams();
	const code = params.get('code');
	const router = useRouter();
	const login = useAuthStore.getState().login;

	const redirectUri = typeof window !== 'undefined'
		? `${window.location.origin}/social-login/google`
		: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

	useEffect(() => {
		if (code && redirectUri) {
		axios
			.get(getApiUrl(`/backend/wp-json/users/v2/login-social/?action=google_oauth&code=${code}&uri=${encodeURIComponent(redirectUri)}`))
			.then(data => {
				console.log('Ответ от WP:', data);
				if (data.data.token) {
					login(data.data.token);
					router.push('/');
				}
			});
		}
	}, [code, redirectUri]);
	
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