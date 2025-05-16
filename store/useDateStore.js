import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const isClient = typeof window !== 'undefined';

export const useDateStore = create(
  persist(
    (set) => ({
      mainDates: { dateStart: null, dateEnd: null },
      setDateStart: (dateStart) =>
        set((state) => ({ mainDates: { ...state.mainDates, dateStart } })),
      setDateEnd: (dateEnd) =>
        set((state) => ({ mainDates: { ...state.mainDates, dateEnd } })),
      resetMainDates: () =>
        set({ mainDates: { dateStart: null, dateEnd: null } }),
    }),
    {
      name: 'date-store',
      storage: isClient
        ? createJSONStorage(() => sessionStorage)
        : undefined, // отключаем persist на сервере
    }
  )
);
