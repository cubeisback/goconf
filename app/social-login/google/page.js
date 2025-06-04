'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function GoogleLoginInner() {
  const params = useSearchParams();
  const code = params.get('code');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (code) {
      fetch(`https://dev.goconf.ru/wp-json/users/v2/login-social/?action=google_oauth&code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log('Ответ от WP:', data);
          setResult(data);
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

export default function GoogleSocialLogin() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <GoogleLoginInner />
    </Suspense>
  );
}
