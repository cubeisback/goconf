"use client"

import { CacheProvider } from '@emotion/react'
import { Global, ThemeProvider } from "@emotion/react"
import theme from "@/styles/theme"
import { Header } from "@/components/header/Header"
import { globalStyles } from "@/styles/globals"
import useFiltersStore from "@/store/useFiltersStore"
import useHomeStore from "@/store/useHomeStore"
import { useEffect, useState } from "react"
import { cache } from "@/styles/emotion-cache"

export default function ThemeWrapper({ children }) {
	const [isLogin, setIsLogin] = useState(false);

	//ширина экрана
    const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
	
		return () => window.removeEventListener("resize", handleResize);
	  }, []);

	const fetchFiltersData = useFiltersStore((state) => state.fetchFiltersData)
	const fetchHomeData = useHomeStore((state) => state.fetchHomeData)

	useEffect(() => {
		fetchFiltersData()
		fetchHomeData()
	}, [fetchFiltersData])

	return (
		<CacheProvider value={cache}>
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			<Header isLogin={isLogin} windowWidth={windowWidth} />
			{children}
		</ThemeProvider>
		</CacheProvider>
	)
}
