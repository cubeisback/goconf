'use client';

import { getApiUrl } from '@/functions/functions';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleSocialLogin() {
  const params = useSearchParams();
  const code = params.get('code');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (code) {
		console.log('codeeeee', code)
	  axios
        // .get(getApiUrl(`/backend/wp-json/users/v2/login-social/?action=google_oauth&code=${code}`))
      	fetch(`https://dev.goconf.ru/wp-json/users/v2/login-social/?action=google_oauth&code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log('Ответ от WP:', data);
          setResult(data);
          // можешь здесь сохранить токен, авторизовать пользователя и т.д.
        });
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
