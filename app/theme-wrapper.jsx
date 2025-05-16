'use client'

import { ThemeProvider } from '@emotion/react'
import theme from '@/styles/theme'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/Footer/Footer'
import WindowSizeProvider from '@/components/Providers/WindowSizeProvider'

export default function ThemeWrapper({ children }) {
  return (
    <WindowSizeProvider>
      <ThemeProvider theme={theme}>
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </WindowSizeProvider>
  )
}
