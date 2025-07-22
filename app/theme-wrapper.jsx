"use client"

import { Global, ThemeProvider } from "@emotion/react"
import theme from "@/styles/theme"
import { Header } from "@/components/header/Header"
import { globalStyles } from "@/styles/globals"
import useFiltersStore from "@/store/useFiltersStore"
import useHomeStore from "@/store/useHomeStore"
import { useEffect } from "react"
import { Footer } from '@/components/Footer/Footer'
// import WindowSizeProvider from '@/components/Providers/WindowSizeProvider'
import { useAuthStore } from "@/store/useAuthStore"
import { ConfirmModal } from "@/components/ConfirmModal"

export default function ThemeWrapper({ children }) {

	const fetchFiltersData = useFiltersStore((state) => state.fetchFiltersData);
	const fetchHomeData = useHomeStore((state) => state.fetchHomeData);

	useEffect(() => {
		fetchFiltersData()
		fetchHomeData()
	}, [fetchFiltersData]);
	

	const token = useAuthStore((state) => state.token);
  	const user = useAuthStore((state) => state.user);
  	const fetchUser = useAuthStore((state) => state.fetchUser);

	useEffect(() => {
		if (token && !user) {
			fetchUser();
		}
	}, [token]);


	return (
		// <WindowSizeProvider> //TODO REMOVE
			<ThemeProvider theme={theme}>
				<Global styles={globalStyles} />
					<Header/>
					{children}
					{/* <ConfirmModal /> */}
					<Footer />
			</ThemeProvider>
		// </WindowSizeProvider>
	)
}
