import { getApiUrl } from '@/functions/functions';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function decodeWpToken(token) {
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded?.data) {
      const inner = JSON.parse(decoded.data);
      return inner; // { user_id, exp }
    }
    return null;
  } catch (e) {
    console.warn('Ошибка при декодировании WP токена:', e);
    return null;
  }
}


export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      hasHydrated: false,

      login: (token) => {
        set({ token, isAuthenticated: true });
        get().fetchUser();
      },

      logout: () => {
        set({ token: null, isAuthenticated: false, user: null });
      },

      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;

        const decoded = decodeWpToken(token);
        if (!decoded || !decoded.exp) return true;

        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        if (get().isTokenExpired()) {
          console.warn('Токен истёк, выполняем logout');
          get().logout();
          return;
        }

        try {
          const res = await axios.get(getApiUrl('/backend/wp-json/users/v2/profile/'), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status !== 200) {
            get().logout();
            return;
          }

          set({ user: res.data });
          console.log('user', res.data);
        } catch (err) {
          console.error('Ошибка при получении профиля:', err);
          if (err.response?.status === 401) {
            get().logout();
          }
        }
      },

      setHasHydrated: () => {
        const store = get();
        const token = store.token;

        if (token && store.isTokenExpired()) {
          console.warn('Токен истёк после восстановления из localStorage');
          store.logout();
        }

        set({ hasHydrated: true });
      },
    }),
    {
      name: 'authToken',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.();
      },
    }
  )
);
