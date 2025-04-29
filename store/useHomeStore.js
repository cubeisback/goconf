import { create } from 'zustand'
import axios from 'axios'
import { getApiUrl } from '@/functions/functions'

const useHomeStore = create((set, get) => ({
  homeData: null,
  hasLoadedHome: false,
  loading: false,
  error: null,

  fetchHomeData: async () => {
    if (get().hasLoadedHome) return

    set({ loading: true, error: null })
    try {
      const response = await axios.get(getApiUrl("/backend/wp-json/pages/v2/home/"))
      set({ homeData: response.data, hasLoadedHome: true })
	  console.log('home', response)
    } catch (error) {
      console.error('Ошибка при получении home:', error)
      set({ error })
    } finally {
      set({ loading: false })
    }
  },

}))

export default useHomeStore;
