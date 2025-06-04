// app/social-login/google/page.tsx или .js
'use client';

import { getApiUrl } from '@/functions/functions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';

function GoogleLoginInner() {
  const params = useSearchParams();
  const code = params.get('code');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (code) {
      console.log('codeeeee', code);
	//   axios.get(getApiUrl(`/backend/wp-json/users/v2/login-social/?action=google_oauth&code=${code}`))
      fetch(`https://dev.goconf.ru/wp-json/users/v2/login-social/?action=google_oauth&code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log('Ответ от WP:', data);
          setResult(data);
        });

// axios.get('https://dev.goconf.ru/wp-json/users/v2/login-social/', {
//   params: {
//     action: 'google_oauth',
//     code: code
//   }
// })
// .then(response => {
//   console.log('Ответ от WP:', response.data);
//   setResult(response.data);
// })
// .catch(error => {
//   console.error('Ошибка при запросе:', error);
// });

    }
  }, [code]);

  return (
    <div>
      <h1>Обработка входа через Google</h1>
      {!code && <p>Нет кода авторизации</p>}
      {code && !result && <p>Авторизация...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default function GoogleSocialLogin() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <GoogleLoginInner />
    </Suspense>
  );
}
