import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const res = await fetch('https://dev.goconf.ru/wp-json/users/v2/profile/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            if (res.status === 401) {
              get().logout();
            }
            return;
          }

          const data = await res.json();
          set({ user: data });
        } catch (err) {
          console.error('Ошибка при получении профиля:', err);
        }
      },

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'authToken',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(); // <== вот это нужно, иначе `hasHydrated` всегда false
      },
    }
  )
);
