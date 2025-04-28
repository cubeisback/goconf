

import { create } from 'zustand'
import axios from 'axios'

const useFiltersStore = create((set, get) => ({
  filtersData: null,
  hasLoadedFilters: false,
  loading: false,
  error: null,

  fetchFiltersData: async () => {
    if (get().hasLoadedFilters) return

    set({ loading: true, error: null })
    try {
      const response = await axios.get("https://dev.goconf.ru/wp-json/events/v2/get-filter/")
      set({ filtersData: response.data, hasLoadedFilters: true })
    } catch (error) {
      console.error('Ошибка при получении filters:', error)
      set({ error })
    } finally {
      set({ loading: false })
    }
  },

}))

export default useFiltersStore;