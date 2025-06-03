'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Загрузка...</p>;

  return session ? (
    <div>
      <p>Привет, {session.user.name}</p>
      <button onClick={() => signOut()}>Выйти</button>
    </div>
  ) : (
    
	<>
	<button onClick={() => signIn('google')}>Войти через Google</button>
	<a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=879586637662-g3v612m81nt3lktccs13nvfg63v8qoqg.apps.googleusercontent.com&redirect_uri=https://dev.goconf.ru/backend/wp-login.php?action=google_oauth&
response_type=code&scope=openid%20email%20profile&access_type=online&prompt=consent">Войти через Google</a>
	</>
  );
}
