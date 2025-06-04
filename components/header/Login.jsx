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
	</>
  );
}
