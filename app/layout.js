import './globals.css'
import EmotionRegistry from '@/components/Providers/EmotionRegistry'
import ThemeWrapper from '@/app/theme-wrapper'

export const metadata = {
  title: 'GoConf',
  description: 'Конференции и события',
  icons: {
    icon: '/favicon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <EmotionRegistry>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </EmotionRegistry>
      </body>
    </html>
  )
}
